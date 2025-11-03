class Character extends MovableObject{
    x = 120;
    y = 140;
    height = 1200 * 0.25;
    width = 610 * 0.25;
    world;
    speed = 30;
    isIdleLong = false;
    offset = {
        top: 120,
        left: 30,
        right: 45,
        bottom: 0
    };
    frameSpeed = {
        idle: 0.25,
        idleLong: 0.5,
        walk: 1,
        jump: 0.25,
        hurt: 0.5,
        death: 1
    };
    audioVolume = {
        breath: 0.05,
        snor: 0.03,
        walk: 0.3,
        jump: 0.8,
        hurt: 0.4,
    }
    coinAmount = 0;
    bottleAmount = 0;
    endscreen = new Endscreen();
    attackJumpStrength = 100;
    wasInAir = false;
    isWalkingSoundPlaying = false;
    isBreathing = false;
    isSnoring = false;

    constructor () {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.audioManager = audioManager;
        this.loadAssets();
        this.checkIfJumping();
        this.applyGravity();
        this.animate();
    }

    /**
     * Loads all assets of the character.
     */
    loadAssets() {
        this.loadImages(CHARACTER_ASSETS.IMAGES.DEAD);
        this.loadImages(CHARACTER_ASSETS.IMAGES.HURT);
        this.loadImages(CHARACTER_ASSETS.IMAGES.IDLE);
        this.loadImages(CHARACTER_ASSETS.IMAGES.IDLE_LONG);
        this.loadImages(CHARACTER_ASSETS.IMAGES.JUMPING);
        this.loadImages(CHARACTER_ASSETS.IMAGES.WALKING);
        this.audioManager.loadAudio(CHARACTER_ASSETS.SOUNDS.HURT);
        this.audioManager.loadAudio(CHARACTER_ASSETS.SOUNDS.LANDING);
        this.audioManager.loadAudio(CHARACTER_ASSETS.SOUNDS.WALKING);
        this.audioManager.loadAudio(CHARACTER_ASSETS.SOUNDS.SNORING);
        this.audioManager.loadAudio(CHARACTER_ASSETS.SOUNDS.BREATH);
    }

    /**
     * Handles character animation and camera movement.
     *
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) this.performJumpingAnimation();
            else if (this.canJumpRight()) this.performJumpRight();
            else if (this.canJumpLeft()) this.performJumpLeft();
            else if (this.canMoveRight()) this.performMoveRight();
            else if (this.canMoveLeft()) this.performMoveLeft();
            else if (this.canJump()) this.performJump();
            else if (this.isHurt()) this.performHurtAnimation();
            else if (this.isDead()) this.performDeathAnimation();
            else this.performIdle();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 10);
    }

    /**
     * Checks vertical state to trigger jump and landing sounds.
     */
    checkIfJumping() {
        setInterval(() => {
            if(this.isAboveGround()) {
                this.playJumpSound() 
            } else if (this.wasInAir) {
                this.playLandSound()
            }
        }, 1000 / 70);
    }

    /**
     * Checks if the character can jump straight up.
     * @returns {boolean} True if jump key pressed and character is on ground.
     */
    canJump() {
        return (this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround();
    }

    /**
     * Checks if the character can move left.
     * @returns {boolean} True if LEFT key pressed and within world bounds.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if the character can move right.
     * @returns {boolean} True if RIGHT key pressed.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Checks if the character can jump to the left.
     * @returns {boolean} True if LEFT + SPACE pressed.
     */
    canJumpLeft() {
        return (this.world.keyboard.LEFT && (this.world.keyboard.SPACE || this.world.keyboard.UP)) && this.x > 0;
    }

    /**
     * Checks if the character can jump to the right.
     * @returns {boolean} True if RIGHT + SPACE pressed.
     */
    canJumpRight() {
        return (this.world.keyboard.RIGHT && (this.world.keyboard.SPACE || this.world.keyboard.UP)) && this.x < this.world.level.level_end_x;
    }
    
    /**
     * Play the jump animation.
     */
    performJumpingAnimation() {
        this.playAnimation(CHARACTER_ASSETS.IMAGES.JUMPING, this.frameSpeed.jump);
    }

    /**
     * Jumps and moves right.
     */
    performJumpRight() {
        this.stopIdleSounds();
        this.jumpRight()
    }

    /**
     * Jumps and moves left.
     */
    performJumpLeft() {
        this.stopIdleSounds();
        this.jumpLeft()       
    }

    /**
     * Moves right and plays walking animation.
     */
    performMoveRight() {
        this.stopIdleSounds();
        this.moveRight();
        this.playAnimation(CHARACTER_ASSETS.IMAGES.WALKING, this.frameSpeed.walk);
        this.playWalkingSound();
    }

    /**
     * Moves left and plays walking animation.
     */
    performMoveLeft() {
        this.stopIdleSounds();
        this.moveLeft();
        this.playAnimation(CHARACTER_ASSETS.IMAGES.WALKING, this.frameSpeed.walk)
        this.playWalkingSound();
    }

    /**
     * Performs a vertical jump.
     */
    performJump() {
        this.stopIdleSounds();
        this.jump();
    }

    /**
     * Plays hurt animation when damaged.
     */
    performHurtAnimation() {
        this.playAnimation(CHARACTER_ASSETS.IMAGES.HURT, this.frameSpeed.hurt);
        this.playHurtingSound();
    }

    /**
     * Plays death animation and triggers end screen.
     */
    performDeathAnimation() {
        setTimeout (() => {
           this.playAnimation(CHARACTER_ASSETS.IMAGES.DEAD, this.frameSpeed.death);
        }, 1000)
        setTimeout (() => {
            this.endscreen.lostGame();
        }, 1500)
    }

    /**
     * Plays idle or long idle animation based on inactivity duration.
     */
    performIdle() {
        if (this.isWalkingSoundPlaying) {
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.WALKING[0]);
            this.isWalkingSoundPlaying = false;
        }
        if (!this.isIdleLong) {
            this.performNormalIdle();
        } else {
            this.performIdleLong();       
        }
    }

    /**
     * Plays the normal idle animation and breathing sound.
     */
    performNormalIdle() {
        this.playAnimation(CHARACTER_ASSETS.IMAGES.IDLE, this.frameSpeed.idle);
        this.playBreathSound();
        setTimeout(() => {
            this.isIdleLong = true;
        }, 10000);
    }

    /**
     * Plays the long idle animation and snoring sound.
     */
    performIdleLong() {
        this.playAnimation(CHARACTER_ASSETS.IMAGES.IDLE_LONG, this.frameSpeed.idleLong);
        this.playSnoringSound();
    }


    /**
     * Plays the breathing sound during normal idle.
     */
    playBreathSound() {
        if (!this.isBreathing) {
            this.isBreathing = true;
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.SNORING[0]);
            this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.BREATH, this.audioVolume.breath);
        }
    }

    /**
     * Plays the snoring sound during long idle.
     * Stops any ongoing breathing audio before looping the snore sound.
     */ 
    playSnoringSound() {
        if (!this.isSnoring) {
            this.isSnoring = true;
            const isShortAudio = false; 
            const audioLoop = true;
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.BREATH[0]);
            this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.SNORING, this.audioVolume.snor, isShortAudio, audioLoop);
        }
    }

    /**
     * Stops all idle-related sounds and resets idle states.
     * Used when the character resumes activity.
     */
    stopIdleSounds() {
        this.isIdleLong = false;
        this.isBreathing = false;
        this.isSnoring = false;
    }

    /**
     * Plays the hurt sound effect when the object takes damage.
     */
    playHurtingSound() {
        this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.HURT, this.audioVolume.hurt)
    }

    /**
     * Plays the walking sound effect while the object is moving.
     */
    playWalkingSound() {
        if (!this.isWalkingSoundPlaying) {
            this.isWalkingSoundPlaying = true;
            const isShortAudio = false;
            const audioLoop = true;
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.BREATH[0]);
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.SNORING[0]);
            this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.WALKING, this.audioVolume.walk, isShortAudio, audioLoop);
        }
    }

    /**
     * Plays the landing sound effect when the object hits the ground after falling.
     */
    playLandSound() {
        this.stopIdleSounds()
        this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.LANDING, this.audioVolume.jump)
        setTimeout(() => {
            this.wasInAir = false;
        }, 10)
    }

    playJumpSound() {
        this.wasInAir =  true
    }
}