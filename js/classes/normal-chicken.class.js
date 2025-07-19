class normalChicken extends MovableObject{
    y = 335;
    height = 243 * 0.4;
    width = 248 * 0.4;   
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 220 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.moveChicken();
        this.animate();
    }

    moveChicken() {
        setInterval(() => {
            this.x -= 0.4;
        }, 1000 / 60);
    }

    animate() {
        setInterval(() =>{
            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        },  250);
    }
}