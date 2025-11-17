class ThrowableObject extends MovableObject {
    offset = {
        top: 20,
        left: 50,
        right: 75,
        bottom: 35
    };
    frameSpeed = {
        rotate: 0.3,
        splash: 0.5
    };
    frameSplash = 0;
    counterSplash = 0;
    throwSpeed = 4

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
        this.throwStart();
        this.objectHasHit = false;
        this.splashPlayed = false;
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
     * Initializes bottle throw parameters such as vertical speed
     * and resets splash state.
     */
    throwStart() {
        this.speedY = 10;
        this.splashPlayed = false;
    }

    /**
     * Starts all animation processes for the bottle.
     */
    animate() {        
        if (this.isSplashing) {
            this.handleSplashAnimation();
            return;
        }
        if (this.canSplash()) {
            this.startSplash();
            return;
        }
        this.applyGravity();
        this.rotate();
        this.moveDirection();
    }

    /**
     * Handles the splash animation.
     */
    handleSplashAnimation() {
        this.updateSplashFrame();
        if (this.isSplashFinished()) this.removeObject();
        else this.applySplashFrame();
        setTimeout(() => {
            this.world.bottleHitsEnemy = false;
        }, 500);
    }

    /**
     * Checks whether the bottle should trigger a splash animation.
     * 
     * @returns {boolean} True if the bottle has hit the ground or an enemy.
     */
    canSplash() {
        return this.y > 320 || this.world.bottleHitsEnemy;
    }

    /**
     * Starts the splash animation.
     * @returns 
     */
    startSplash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.playSplashSound();
        this.speedY = 0;
        this.throwSpeed = 0;
    }

    /**
     * Play the rotation animation and sound while the flight.
     */
    rotate() {
       this.playAnimation(BOTTLE_ASSETS.IMAGES.ROTATION, this.frameSpeed.rotate);
       this.playRotationSound();
    }

    /**
     * Moves the bottle horizontally depending on its facing direction.
     */
    moveDirection() {
        if (this.otherDirection) {
            this.x -= this.throwSpeed;
        } else {
            this.x += this.throwSpeed;
        }
    }

    /**
     * Updates the current splash frame index based on animation speed.
     */
    updateSplashFrame() {
        this.counterSplash += this.frameSpeed.splash;
        if (this.counterSplash >= 1) {
            this.frameSplash++;
            this.counterSplash = 0;
        }
    }

    /**
     * Checks if the splash animation has finished all its frames.
     * @returns 
     */
    isSplashFinished() {
        return this.frameSplash >= BOTTLE_ASSETS.IMAGES.SPLASH.length;
    }

    /**
     * Applies the current splash animation frame based on frame index.
     */
    applySplashFrame() {
        const path = BOTTLE_ASSETS.IMAGES.SPLASH[this.frameSplash];
        this.img = this.imageCache[path];
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