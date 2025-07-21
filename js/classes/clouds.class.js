class Clouds extends MovableObject{
    y = 50;
    height = 300;
    width = 400;
    speed = 0.15;
    
    constructor () {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft(this.speed)
    }
}