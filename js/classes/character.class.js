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

    constructor () {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * Handles animation and movement based on keyboard input.
     *
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);  
            } else {
                if ((this.world.keyboard.RIGHT && this.world.keyboard.SPACE) && this.x < this.world.level.level_end_x) {
                    this.jumpingRight ()
                }
                else if ((this.world.keyboard.LEFT && this.world.keyboard.SPACE) && this.x > 0) {
                    this.jumpingLeft ()
                }
                else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.movingRight()
                }
                else if (this.world.keyboard.LEFT && this.x > 0) {
                    this.movingLeft ()
                }
                else if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                    this.jumping ()
                }
                else if (this.isHurt()) {
                    this.hurt()
                }
                else if (this.isDead()) {
                    this.dead()
                }
                else {
                    this.idle()
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 140);
    }

    /**
    * Jumps and moves right.
    */
    jumpingRight () {
        this.jumpRight()
        this.playAnimation(this.IMAGES_JUMPING);
        this.isIdleLong = false;
    }

    /**
    * Jumps and moves left.
    */
    jumpingLeft () {
        this.jumpLeft()
        this.playAnimation(this.IMAGES_JUMPING);
        this.isIdleLong = false;
    }

    /**
    * Moves right and plays walking animation.
    */
    movingRight() {
        this.moveRight();
        this.playAnimation(this.IMAGES_WALKING);
        this.isIdleLong = false;
    }

    /**
    * Moves left and plays walking animation.
    */
    movingLeft () {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
        this.isIdleLong = false;
    }

    /**
    * Performs a vertical jump.
    */
    jumping () {
        this.jump();
        this.isIdleLong = false;
    }

    /**
    * Plays hurt animation when damaged.
    */
    hurt () {
        this.playAnimation(this.IMAGES_HURT)
    }

    /**
    * Plays death animation and triggers end screen.
    */
    dead() {
        setTimeout (() => {
           this.playAnimation(this.IMAGES_DEAD); 
        }, 2000)
        this.endscreen.lostGame();
    }

    /**
    * Plays idle or long idle animation based on inactivity duration.
    */
    idle() {
        if (!this.isIdleLong) {
            this.playAnimation(this.IMAGES_IDLE);
            setTimeout (() => {
                this.isIdleLong = true;
            }, 10000)
        } else {
            this.playAnimation(this.IMAGES_IDLE_LONG);       
        }
    }
}