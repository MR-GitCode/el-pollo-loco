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

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    SOUND_WALKING = [
        'audio/character/movements/walk/running-on-sand.mp3'
    ]

    SOUND_LANDING = [
        'audio/character/movements/jump/jumplanding2.mp3'
    ]

    SOUND_HURT = [
        'audio/character/noises/hurt/male-grunt.mp3'
    ]

    SOUND_DEATH = [
        'audio/character/noises/hurt/human-voice-saying-oh-no.mp3'
    ]

    constructor () {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.audioManager.loadAudio(this.SOUND_WALKING);
        this.audioManager.loadAudio(this.SOUND_LANDING);
        this.audioManager.loadAudio(this.SOUND_HURT);
        this.audioManager.loadAudio(this.SOUND_DEATH);
        this.playingAudio();
        this.applyGravity();
        this.animate();
    }

    /**
     * Handles character animation and camera movement.
     *
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);

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
        }, 1000 / 60);
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
        this.playAnimation(this.IMAGES_JUMPING);
        this.isIdleLong = false;
    }

    /**
    * Jumps and moves left.
    */
    performJumpLeft() {
        this.jumpLeft()
        this.playAnimation(this.IMAGES_JUMPING);
        this.isIdleLong = false;
    }

    /**
    * Moves right and plays walking animation.
    */
    performMoveRight() {
        this.moveRight();
        this.playAnimation(this.IMAGES_WALKING);
        this.playWalkingSound();
        this.isIdleLong = false;
    }

    /**
    * Moves left and plays walking animation.
    */
    performMoveLeft() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING)
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
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtingSound();
    }

    /**
    * Plays death animation and triggers end screen.
    */
    performDeathAnimation() {
        setTimeout (() => {
           this.playAnimation(this.IMAGES_DEAD);
        }, 1000)
        setTimeout (() => {
            this.endscreen.lostGame();
            this.playDieSound();
        }, 1500)
    }

    /**
    * Plays idle or long idle animation based on inactivity duration.
    */
    performIdle() {
        if (this.isWalkingSoundPlaying) {
            this.audioManager.stopAudio();
            this.isWalkingSoundPlaying = false;
        }
        if (!this.isIdleLong) {
            this.playAnimation(this.IMAGES_IDLE);
            setTimeout (() => {
                this.isIdleLong = true;
            }, 10000)
        } else {
            this.playAnimation(this.IMAGES_IDLE_LONG);       
        }
    }

    /**
     * Plays the hurt sound effect when the object takes damage.
     */
    playHurtingSound() {
        let audioVolume = 0.5;
        let stoppAtSeconds = 1000;
        this.audioManager.playAudio(this.SOUND_HURT, audioVolume, stoppAtSeconds)
    }

    /**
     * Plays the death sound effect when the object dies.
     */
    playDieSound() {
        let audioVolume = 0.5;
        this.audioManager.playAudio(this.SOUND_DEATH, audioVolume)
    }

    /**
     * Plays the walking sound effect while the object is moving.
     */
    playWalkingSound() {
        if (this.isWalkingSoundPlaying) {
            let audioVolume = 0.3;
            this.audioManager.playAudio(this.SOUND_WALKING, audioVolume);
        }
    }

    /**
     * Plays the landing sound effect when the object hits the ground after falling.
     */
    playLandSound() {
        let audioVolume = 0.8;
        let stoppAtSeconds = 1;
        this.audioManager.playAudio(this.SOUND_LANDING, audioVolume, stoppAtSeconds);
        setTimeout(() => {
            this.wasInAir = false;
        }, 10)
    }

    playJumpSound() {
        this.wasInAir =  true
    }
}