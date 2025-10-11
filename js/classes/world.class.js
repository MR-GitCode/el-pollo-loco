class World {

    canvas;
    crx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    coinCount = 0;
    bottleCount = 0;
    statusBarBottle = new StatusBar(IMAGES_BOTTLE, 10, 0, this.bottleCount);
    statusBarHealth = new StatusBar(IMAGES_HEALTH, 10, 45, percentage);
    statusBarCoin = new StatusBar(IMAGES_COIN, 10, 90, this.coinCount);
    statusBarHealthBoss = new StatusBar(IMAGES_HEALTH_BOSS, 470, 8, 100);
    gameOver = false;
    bottleHitsEnemy = false;

    constructor (canvas, keyboard, gameStarted = false) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        if (gameStarted & !this.gameOver) {
            initLevel();
            this.level = level1;
            this.character = new Character();
            this.draw();
            this.setWorld();
            this.run();
            this.checkCollisions();
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this);
    }

    run() {
        this.checkCollisions();
        setInterval(() => {
            this.checkThrowObjects();
        }, 200)
    }

    /**
     * Throws a bottle if the throw key (E) is pressed
     * and bottles are available. Updates status bar.
     */
    checkThrowObjects() {
        if(this.keyboard.E & (this.bottleCount > 0)) {
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
        setInterval(() => {
            this.collisionEnemy()
        }, 800)
        setInterval(() => {
            this.collisionCoin();
            this.collisionBottle();
            this.collisionThrowableObjectWithEnemies();
        }, 100)
    }

    /**
     * Checked the collision of enemies with character.
     */
    collisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && enemy.energy > 0) {
                this.character.hit(enemy.attackStrength);
                this.statusBarHealth.setPercentage(this.character.energy)
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
                this.changeStatusBar(this.coinCount , this.level.maxCoins , "statusBarCoin")
                this.level.coins.splice(index, 1)
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

    collisionObjectWithBoss (enemy) {
        if (enemy.isBoss) {
                let percentage = (enemy.energy / EndBoss.bossEnergy) * 100;
                this.statusBarHealthBoss.setPercentage(percentage);
        } 
    }

    changeStatusBar (objectCount, maxObject, statusBarName) {
        let percentage = (objectCount / maxObject) * 100;
        this[statusBarName].setPercentage(percentage);
    }

    draw() {
        if (gameStarted & !this.gameOver) {           
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
            this.addToCanvas(this.statusBarHealthBoss);

            //draw() wird immer wieder aufgerufen
            let self = this;
            requestAnimationFrame( function () {
                self.draw(); 
            }); 
        }
    }

    addObjectsToCanvas(objects) {
        objects.forEach(obj => {
            this.addToCanvas(obj);
        })
    }

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