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
    backgrounds = [
        new Background('img/5_background/layers/air.png', 0, 0),
        new Background('img/5_background/layers/3_third_layer/1.png', 0, 0),
        new Background('img/5_background/layers/2_second_layer/1.png', 0, 0),
        new Background('img/5_background/layers/1_first_layer/1.png', 0, 0),
        new Background('img/5_background/layers/air.png', 720, 0),
        new Background('img/5_background/layers/3_third_layer/2.png', 720, 0),
        new Background('img/5_background/layers/2_second_layer/2.png', 720, 0),
        new Background('img/5_background/layers/1_first_layer/2.png', 720, 0),
    ]
    canvas;
    crx;

    constructor (canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToCanvas(this.backgrounds);
        this.addObjectsToCanvas(this.clouds);
        this.addObjectsToCanvas(this.enemies);
        this.addToCanvas(this.character);
         
        
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
        this.ctx.drawImage(model.img, model.x, model.y, model.width, model.height);
    }
}