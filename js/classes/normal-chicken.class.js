class normalChicken extends MovableObject{
    y = 335;
    height = 243 * 0.4;
    width = 248 * 0.4;
    offset = {
        top: 5,
        left: 0,
        right: 0,
        bottom: 10
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 220 + Math.random() * 500;
        this.speed = 0.2 + Math.random() * 0.4;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() =>{
            this.playAnimation(this.IMAGES_WALKING);
        },  250);
        
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}