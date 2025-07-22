class World {
    character = new Character();
    enemies = [
        new normalChicken(),
        new normalChicken(),
        new normalChicken(),
    ];
    clouds = [
        new Clouds(),
    ];
    backgrounds = [];
    canvas;
    crx;
    keyboard;
    camera_x = 0;
    map_length = 2;
    max_display_width = 720;

    constructor (canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadBackgroundImages();
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }
    
    loadBackgroundImages(){
        for (let i = -1; i < this.map_length; i++) {
            let offset = this.max_display_width * 2 * i;
            this.backgrounds.push(
                new Background('img/5_background/layers/air.png', offset, 0),
                new Background('img/5_background/layers/3_third_layer/2.png', offset, 0),
                new Background('img/5_background/layers/2_second_layer/2.png', offset, 0),
                new Background('img/5_background/layers/1_first_layer/2.png', offset, 0),
                new Background('img/5_background/layers/air.png', offset + 720, 0),
                new Background('img/5_background/layers/3_third_layer/1.png', offset + 720, 0),
                new Background('img/5_background/layers/2_second_layer/1.png', offset + 720, 0),
                new Background('img/5_background/layers/1_first_layer/1.png', offset + 720, 0),
            );
    }}

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToCanvas(this.backgrounds);
        this.addObjectsToCanvas(this.clouds);
        this.addObjectsToCanvas(this.enemies);
        this.addToCanvas(this.character);

        this.ctx.translate(-this.camera_x, 0);
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
        this.ctx.drawImage(model.img, model.x, model.y, model.width, model.height);
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