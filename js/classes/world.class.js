class World {
    character = new Character();
    level = level1;
    canvas;
    crx;
    keyboard;
    camera_x = 0;
    statusBarBottle = new StatusBar(IMAGES_BOTTLE, 10, 0, bottleCount);
    statusBarHealth = new StatusBar(IMAGES_HEALTH, 10, 45, percentage);
    statusBarCoin = new StatusBar(IMAGES_COIN, 10, 90, coinCount);
    throwableObjects = [];
    // spawnableObjects = [new SpawnableObjects()];


    constructor (canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 500)

    }

    checkThrowObjects() {
        if(this.keyboard.E) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy)
            }  
        });
    }

    draw() {
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

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame( function () {
           self.draw(); 
        });
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
        model.drawFrame(this.ctx);
        model.drawOffsetFrame(this.ctx)
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