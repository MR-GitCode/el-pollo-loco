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
    coinAmount = 0;
    bottleAmount = 0;
    endscreen = new Endscreen();
    attackJumpStrength = 100;
    wasInAir = false;
    isWalkingSoundPlaying = false;

    constructor () {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.audioManager = audioManager;
        this.loadAssets();
        this.playingAudio();
        this.applyGravity();
        this.animate();
    }

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
    }

    /**
     * Handles character animation and camera movement.
     *
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) this.playAnimation(CHARACTER_ASSETS.IMAGES.JUMPING);

            else {
                this.updateCharacterActions();
            }
            this.world.camera_x = -this.x + 100;
        }, 140);
    }

    playingAudio() {
        setInterval(() => {
            if(this.isAboveGround()) {
                this.playJumpSound() 
            } else if (this.wasInAir) {
                this.playLandSound()
            }
        }, 1000 / 70);
    }

    /**
     * Determines and executes the appropriate character action
     * based on movement and state conditions.
     */
    updateCharacterActions() {
        if (this.canJumpRight()) this.performJumpRight();
        else if (this.canJumpLeft()) this.performJumpLeft();
        else if (this.canMoveRight()) this.performMoveRight();
        else if (this.canMoveLeft()) this.performMoveLeft();
        else if (this.canJump()) this.performJump();
        else if (this.isHurt()) this.performHurtAnimation();
        else if (this.isDead()) this.performDeathAnimation();
        else this.performIdle();
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
        return (this.world.keyboard.LEFT && this.world.keyboard.SPACE) && this.x > 0;
    }

    /**
     * Checks if the character can jump to the right.
     * @returns {boolean} True if RIGHT + SPACE pressed.
     */
    canJumpRight() {
        return (this.world.keyboard.RIGHT && this.world.keyboard.SPACE) && this.x < this.world.level.level_end_x;
    }

    /**
    * Jumps and moves right.
    */
    performJumpRight() {
        this.jumpRight()
        this.playAnimation(CHARACTER_ASSETS.IMAGES.JUMPING);
        this.isIdleLong = false;
        // console.log(this.wasInAir, 'jump right');
        
        // this.wasInAir =  true
        // console.log(this.wasInAir, 'jump right end');
    }

    /**
    * Jumps and moves left.
    */
    performJumpLeft() {
        this.jumpLeft()
        this.playAnimation(CHARACTER_ASSETS.IMAGES.JUMPING);
        this.isIdleLong = false;        
        // this.wasInAir =  true
    }

    /**
    * Moves right and plays walking animation.
    */
    performMoveRight() {
        this.moveRight();
        this.playAnimation(CHARACTER_ASSETS.IMAGES.WALKING);
        this.playWalkingSound();
        this.isIdleLong = false;
    }

    /**
    * Moves left and plays walking animation.
    */
    performMoveLeft() {
        this.moveLeft();
        this.playAnimation(CHARACTER_ASSETS.IMAGES.WALKING)
        this.playWalkingSound();
        this.isIdleLong = false;
    }

    /**
    * Performs a vertical jump.
    */
    performJump() {
        this.jump();
        this.isIdleLong = false;
    }

    /**
    * Plays hurt animation when damaged.
    */
    performHurtAnimation() {
        this.playAnimation(CHARACTER_ASSETS.IMAGES.HURT);
        this.playHurtingSound();
    }

    /**
    * Plays death animation and triggers end screen.
    */
    performDeathAnimation() {
        setTimeout (() => {
           this.playAnimation(CHARACTER_ASSETS.IMAGES.DEAD);
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
            this.playAnimation(CHARACTER_ASSETS.IMAGES.IDLE);
            setTimeout (() => {
                this.isIdleLong = true;
            }, 10000)
        } else {
            this.playAnimation(CHARACTER_ASSETS.IMAGES.IDLE_LONG);       
        }
    }

    /**
     * Plays the hurt sound effect when the object takes damage.
     */
    playHurtingSound() {
        let audioVolume = 0.5;
        this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.HURT, audioVolume)
    }

    /**
     * Plays the walking sound effect while the object is moving.
     */
    playWalkingSound() {
        if (!this.isWalkingSoundPlaying) {
            this.isWalkingSoundPlaying = true; 
            let audioVolume = 0.3;
            let loop = true;
            this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.WALKING, audioVolume, loop);
        }
    }

    /**
     * Plays the landing sound effect when the object hits the ground after falling.
     */
    playLandSound() {
        let audioVolume = 0.8;
        this.audioManager.playAudio(CHARACTER_ASSETS.SOUNDS.LANDING, audioVolume)
        setTimeout(() => {
            this.wasInAir = false;
        }, 10)
    }

    playJumpSound() {
        this.wasInAir =  true
    }
}