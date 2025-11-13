class ThrowableObject extends MovableObject {
    frameSpeed = {
        rotate: 0.3,
        splash: 0.5
    };
    frameSplash = 0;
    counterSplash = 0;

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
        this.world.bottleHitsEnemy = false;
        this.splashPlayed = false;
        const moveBottle = () => {
            if (this.canSplash()) {
                return this.performSplash();
            }
            this.rotate();
            this.moveDirection();
            this.throwRAF = requestAnimationFrame(moveBottle);
        };
        this.throwRAF = requestAnimationFrame(moveBottle);
    }

    /**
     * Checks whether the bottle should trigger a splash animation.
     * 
     * @returns {boolean} True if the bottle has hit the ground or an enemy.
     */
    canSplash() {
        return this.y > 300 || this.world.bottleHitsEnemy;
    }

    /**
     * Executes the splash sequence when the bottle hits the ground or an enemy.
     * @returns 
     */
    performSplash() {
        this.stopSplashPosition();
        this.splash();
        cancelAnimationFrame(this.throwRAF);
        return;
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
            this.x -= 2;
        } else {
            this.x += 2;
        }
    }

    /**
     * Stops all motion when the splash occurs.
     */
    stopSplashPosition() {
        this.speedY = 0;
        this.horizontalSpeed = 0;
        cancelAnimationFrame(this.gravityInterval);
    }

    /**
     * Plays the splash animation and sound after the bottle impacts.
     */
    splash() {
        if (this.splashPlayed) return;
        this.splashPlayed = true;
        this.playSplashSound();
        const animateSplash = () => {
            this.updateSplashFrame();
            if (this.isSplashFinshed()) {
                this.removeObject();
                return;
            }
            this.applySplashFrame();
            requestAnimationFrame(animateSplash);
        };
        requestAnimationFrame(animateSplash);
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
    isSplashFinshed() {
        return this.frameSplash >= BOTTLE_ASSETS.IMAGES.SPLASH.length;
    }

    /**
     * Applies the current splash animation frame based on frame index.
     */
    appleySplashFrame() {
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