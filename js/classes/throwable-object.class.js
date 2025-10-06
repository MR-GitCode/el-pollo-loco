class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 400 * 0.3;
        this.height = 400 * 0.3;
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.world = world;
        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.applyGravity();
        setInterval( () => {
            if (this.y > 300) {
                this.splash();  
            } else {
                this.rotate();
                this.x += 10;
            }
        }, 80)
    }

    rotate() {
       this.playAnimation(this.IMAGES_BOTTLE_ROTATION) 
    }

    splash() {
        if (this.splashPlayed) return; // verhindert mehrfaches Abspielen
        this.splashPlayed = true;
        let i = 0;
        const splashInterval = setInterval(() => {
            let path = this.IMAGES_BOTTLE_SPLASH[i];
            this.img = this.imageCache[path];
            i++;
            if (i >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(splashInterval);
                this.removeObject();
            }
        }, 100);
    }

    removeObject(){
        this.world.throwableObjects = [];       
    };
}