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
    frameSpeed = {
        walk: 0.1,
        death: 1
    };
    audioVolume = {
        walk: 1,
        death: 0.3,
    }
    energy = 100;
    attackStrength = 10;

    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.audioManager = audioManager;
        this.x = 400 + Math.random() * 1900;
        this.speed = 0.5 + Math.random() * 0.5;
        this.loadAssets(); 
    }

    /**
     * Loads all assets of the normal chicken.
     */
    loadAssets() {
        this.loadImages(NORMAL_CHICKEN_ASSETS.IMAGES.DEAD);
        this.loadImages(NORMAL_CHICKEN_ASSETS.IMAGES.WALKING);
        this.audioManager.loadAudios(NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL)
    }

    /**
     * Starts all animation processes for the normal chicken.
     */
    animate() {
        this.startWalkAnimation();
        this.startMovement();
    }

    /**
     * Handles the walking animation loop for the chicken.
     */
    startWalkAnimation() {
        if (this.energy === 0) {
            this.performDeathAnimation();
            return;
        }
        this.playAnimation(NORMAL_CHICKEN_ASSETS.IMAGES.WALKING, this.frameSpeed.walk);
    }  
    
    /**
     * Starts the horizontal movement loop for the chicken.
     */
    startMovement() {
        if (this.energy > 0) {
            this.moveLeft();
            this.otherDirection = false;
        }
    }

    /**
     * Plays death animation and triggers end screen.
     */
    performDeathAnimation() {
        this.playAnimation(NORMAL_CHICKEN_ASSETS.IMAGES.DEAD, this.frameSpeed.death);
        cancelAnimationFrame(this.walkChickenRAF);
        cancelAnimationFrame(this.moveChickenRAF);
    }

    /**
     * Plays a random sound effect when the chicken is killed by a jump attack.
     */
    playJumpKillSound() {
        let randomIndex = Math.floor(Math.random() * NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL.length);
        this.audioManager.playAudio(NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL[randomIndex], this.audioVolume.death)
    }
}