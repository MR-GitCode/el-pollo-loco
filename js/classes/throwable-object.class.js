class ThrowableObject extends MovableObject {
  
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png'); 
        this.x = x;
        this.y = y;
        this.width = 400 * 0.3;
        this.height = 400 * 0.3;
        this.audioManager = audioManager;
        this.world = world;
        this.otherDirection = world.character.otherDirection;
        this.loadAssets();
        this.throw();
        this.objectHasHit = false;
    }

    /**
     * Loads all assets of the throwable objects.
     */
    loadAssets() {
        this.loadImages(BOTTLE_ASSETS.IMAGES.ROTATION);
        this.loadImages(BOTTLE_ASSETS.IMAGES.SPLASH)
        this.audioManager.loadAudio(BOTTLE_ASSETS.SOUNDS.ROTATE);
        this.audioManager.loadAudios(BOTTLE_ASSETS.SOUNDS.SLIME);
    }

    /**
     * Initiates the throwing motion of the object.
     */
    throw() {        
        this.speedY = 10;
        this.applyGravity();
        const thorwInterval = setInterval( () => {          
            if (this.y > 300 || this.world.bottleHitsEnemy) {
                this.splash();
                clearInterval(this.gravityInterval)
                clearInterval(thorwInterval)
            } else {
                this.rotate();
                if (this.otherDirection) {
                    this.x -= 20;
                } else {
                    this.x += 20;
                }
            }
        }, 80)
        this.world.bottleHitsEnemy = false;
    }

    /**
     * Play the rotation animation and sound while the flight.
     */
    rotate() {
       this.playAnimation(BOTTLE_ASSETS.IMAGES.ROTATION);
       this.playRotationSound();
    }

    /**
     * Plays the splash animation of the object.
     * @returns 
     */
    splash() {
        if (this.splashPlayed) return; // verhindert mehrfaches Abspielen
        this.splashPlayed = true;
        let i = 0;
        this.playSplashSound();
        const splashInterval = setInterval(() => {
            let path = BOTTLE_ASSETS.IMAGES.SPLASH[i];
            this.img = this.imageCache[path];
            i++;
            if (i >= BOTTLE_ASSETS.IMAGES.SPLASH.length) {
                clearInterval(splashInterval);
                this.removeObject();
            }
        }, 100);
    }

    /**
     * Removes the throwable object from the world after the splash animation finishes.
     */
    removeObject(){
        this.world.throwableObjects = [];       
    };

    /**
     * Plays the sound effect for the bottle’s rotation.
     */
    playRotationSound() {
        let audioVolume = 0.8;
        this.audioManager.playAudio(BOTTLE_ASSETS.SOUNDS.ROTATE, audioVolume);
    }

    /**
     * Stops the rotation sound and plays the slime splash sound.
     */
    playSplashSound() {
        this.audioManager.stopAudio(BOTTLE_ASSETS.SOUNDS.ROTATE[0]);
        let audioVolume = 0.8;
        this.audioManager.playAudio(BOTTLE_ASSETS.SOUNDS.SLIME[0], audioVolume);
    }
}