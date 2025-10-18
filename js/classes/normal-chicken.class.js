class normalChicken extends MovableObject{
    y = 330;
    height = 243 * 0.4;
    width = 248 * 0.4;
    offset = {
        top: 5,
        left: 0,
        right: 0,
        bottom: 10
    };
    energy = 100;
    enemyIntervals = [];
    attackStrength = 2;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.audioManager = audioManager;
        this.x = 400 + Math.random() * 1900;
        this.speed = 0.2 + Math.random() * 0.4;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate(); 
    }

    animate() {
        setInterval(() =>{
            if (this.energy == 0) {
                this.performDeathAnimation()
            } else this.playAnimation(this.IMAGES_WALKING);
        }, 250);
        
        const moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        this.enemyIntervals.push(moveInterval)
    }

    performDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(this.enemyIntervals);
    }
}