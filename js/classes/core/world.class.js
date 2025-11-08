class World {
    canvas;
    crx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    coinCount = 0;
    bottleCount = 0;
    statusBarBottle = new StatusBar(STATUSBARS.IMAGES.CHARACTER_BOTTLE, 10, 0, this.bottleCount);
    statusBarHealth = new StatusBar(STATUSBARS.IMAGES.CHARACTER_HEALTH, 10, 45, percentage);
    statusBarCoin = new StatusBar(STATUSBARS.IMAGES.CHARACTER_COIN, 10, 90, this.coinCount);
    statusBarHealthBoss = new StatusBar(STATUSBARS.IMAGES.BOSS_HEALTH, 470, 8, 100);
    gameOver = false;
    bottleHitsEnemy = false;

    constructor (canvas, keyboard, gameStarted = false) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager =  audioManager;
        if (gameStarted & !this.gameOver) {
            initLevel();
            this.level = level1;
            // this.level.music.soundEnabled = true;
            // this.level.music.playMusic(); 
            this.character = new Character();
            this.gameLoop();
            this.setWorld();
        }
    }

    /**
     * Links the character and each enemy to this world context for interactions.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    /**
     * Starts the main game logic loops.
     * Continuously checks for collisions and periodically handles throwable object actions.
     */
    gameLoop() {
        this.draw();
        this.checkCollisions();
        this.checkThrowObjects();
        let self = this;
        requestAnimationFrame( function () {
            self.gameLoop(); 
        }); 
    }

    /**
     * Throws a bottle if the throw key (E) is pressed
     * and bottles are available. Updates status bar.
     */
    checkThrowObjects() {
        if(this.keyboard.THROW && (this.bottleCount > 0) && this.throwableObjects.length < 1) {
            let bottle = new ThrowableObject(this.character.x, this.character.y, this.bottleHitsEnemy);
            this.throwableObjects.push(bottle);
            this.bottleCount --
            this.changeStatusBar(this.bottleCount , this.level.maxBottles , "statusBarBottle")
        }
    }

    /**
     * Checked the collision of objects with character.
     */
    checkCollisions() {
        this.collisionEnemy()
        this.collisionCoin();
        this.collisionBottle();
        this.collisionThrowableObjectWithEnemies();
    }

    /**
     * Checked the collision of enemies with character.
     */
    collisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.character.isBottomCollision(enemy) && this.character.isFalling) {
                    if (enemy.isBoss == true) return;                     
                    enemy.energy -= this.character.attackJumpStrength;
                    enemy.performDeathAnimation();
                    enemy.playJumpKillSound();                    
                } else { 
                    this.character.hit(enemy.attackStrength);
                    this.statusBarHealth.setPercentage(this.character.energy)
                }
            }
        });
    }

    /**
     * Checked the collision of coin with character.
     */
    collisionCoin() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.coinCount++;
                this.changeStatusBar(this.coinCount , this.level.maxCoins , "statusBarCoin");
                this.level.coins.splice(index, 1);
                coin.playCoinCollectSound();
            }  
        });
    }

    /**
     * Checked the collision of bottles with character.
     */
    collisionBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)) {
                this.bottleCount++;
                this.changeStatusBar(this.bottleCount , this.level.maxBottles , "statusBarBottle")
                this.level.bottles.splice(index, 1);
                bottle.playBottleCollectSound();                
            }  
        });  
    }

    /**
    * Checked the collision of throwable Object with the enemie.
    */
    collisionThrowableObjectWithEnemies() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.objectHasHit) return;
            this.level.enemies.forEach((enemy) => {
                if(enemy.isColliding(throwableObject)) {
                    throwableObject.objectHasHit = true;
                    this.bottleHitsEnemy = true;
                    enemy.hit(SpawnBottle.attackStrength);
                    this.collisionObjectWithBoss (enemy)
                }
            });
        });
    };

    /**
     * Updates the boss health bar based on the current boss energy.
     * @param {MovableObject} enemy The enemy object to check; applies only if it's a boss.
     */
    collisionObjectWithBoss (enemy) {
        if (enemy.isBoss) {
                let percentage = (enemy.energy / EndBoss.bossEnergy) * 100;
                this.statusBarHealthBoss.setPercentage(percentage);
        } 
    }

    /**
     * Updates a specified status bar (e.g., bottles, coins, health) based on current progress.
     * @param {number} objectCount - Current number of collected or remaining objects.
     * @param {number} maxObject - Maximum possible count for this object type.
     * @param {string} statusBarName - The property name of the status bar to update.
     */
    changeStatusBar (objectCount, maxObject, statusBarName) {
        let percentage = (objectCount / maxObject) * 100;
        this[statusBarName].setPercentage(percentage);
    }

    /**
     * Continuously renders the game scene including backgrounds, objects, characters, and UI.
     */
    draw() {
        if (gameStarted && !this.gameOver) {           
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToCanvas(this.level.backgrounds);
            this.addObjectsToCanvas(this.level.clouds);
            this.addObjectsToCanvas(this.level.bottles);
            this.addObjectsToCanvas(this.level.coins);
            this.addObjectsToCanvas(this.level.enemies);
            this.addObjectsToCanvas(this.throwableObjects);
            this.addToCanvas(this.character);
            this.ctx.translate(-this.camera_x, 0);
            this.addToCanvas(this.statusBarBottle);
            this.addToCanvas(this.statusBarHealth);
            this.addToCanvas(this.statusBarCoin);
            this.drawEndbossHealthBar();
        }
    }

    /**
     * Draws the boss health bar when the boss is close enough to the character.
     */
    drawEndbossHealthBar() {
        const boss = this.level.enemies.find(e => e instanceof EndBoss);
        if (this.bossIsNearCharacter(boss)){
            this.addToCanvas(this.statusBarHealthBoss);
        }
    }

    /**
     * Checks whether the boss is within visible range of the player character.
     * @param {EndBoss} boss - The boss instance to check distance for.
     * @returns {boolean} True if the boss is near or actively attacking.
     */
    bossIsNearCharacter(boss) {
        return Math.abs(boss.x - this.character.x) < 500 || boss.attackCharacter;
    }

    /**
     * Draws an array of drawable objects on the canvas.
     * @param {DrawableObject[]} objects - A list of drawable game objects.
     */
    addObjectsToCanvas(objects) {
        objects.forEach(obj => {
            this.addToCanvas(obj);
        })
    }

    /**
     * Draws a single object on the canvas, handling mirroring if needed.
     * @param {DrawableObject} model - The object to be drawn.
     */
    addToCanvas(model) {
        if (model.otherDirection) {
            this.mirrorImage(model)
        }
        model.draw(this.ctx);
        // model.drawFrame(this.ctx);
        // model.drawOffsetFrame(this.ctx)
        if (model.otherDirection) {
            this.mirrorImageBack(model)
        }
    }

    /**
     * Reflects the image.
     * @param {*} model 
     */
    mirrorImage(model) {
        this.ctx.save();
        this.ctx.translate(model.width, 0);
        this.ctx.scale(-1 ,1);
        model.x = model.x * -1; 
    }

    /**
     * Reflects the image back. 
     * @param {*} model 
     */
    mirrorImageBack(model) {
        this.ctx.restore();
        model.x = model.x * -1; 
    }
}