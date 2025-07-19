class Clouds extends MovableObject{
    y = 50;
    height = 300;
    width = 400;
    
    constructor () {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.moveCloud();
    }

    moveCloud() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }
}