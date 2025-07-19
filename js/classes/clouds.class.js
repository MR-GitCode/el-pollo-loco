class Clouds extends MovableObject{
    y = 50;
    height = 300;
    width = 400;
    
    constructor () {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
    }
}