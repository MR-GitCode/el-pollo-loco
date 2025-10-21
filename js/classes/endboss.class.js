class EndBoss extends MovableObject {  
    static bossEnergy = 300
    y = 90;
    width = 1045 * 0.3;
    height = 1217 * 0.3;
    offset = {
        top: 70,
        left: 15,
        right: 25,
        bottom: 80
    };
    energy = 300;
    attackStrength = 6;
    speed = 25;
    attackCharacter = false;
    endscreen = new Endscreen();
   


    constructor () {
        super().loadImage(ENDBOSS_ASSETS.IMAGES.ALERT[0]);
        this.audioManager = audioManager;
        this.loadAssets();
        this.x = 2400;
        this.isBoss = true;
        this.animate();
    }

    loadAssets() {
        this.loadImages(ENDBOSS_ASSETS.IMAGES.WALKING);
        this.loadImages(ENDBOSS_ASSETS.IMAGES.ALERT);
        this.loadImages(ENDBOSS_ASSETS.IMAGES.ATTACK);
        this.loadImages(ENDBOSS_ASSETS.IMAGES.HURT);
        this.loadImages(ENDBOSS_ASSETS.IMAGES.DEAD);
        this.audioManager.loadAudio(ENDBOSS_ASSETS.SOUNDS.WALKING);
        this.audioManager.loadAudio(ENDBOSS_ASSETS.SOUNDS.HURT);
        this.audioManager.loadAudio(ENDBOSS_ASSETS.SOUNDS.DEATH);
        this.audioManager.loadAudio(ENDBOSS_ASSETS.SOUNDS.ALERT);
    }

    /**
     * Controls boss animation states and transitions.
     */
    animate() {
        setInterval(() =>{
            if (this.isHurt()) return this.performHurtAnimation(); //alle andere Animationen überspringen 
            if (this.isDead()) this.performDeathAnimation();
            else if (this.canAttack()) this.performAttackAnimation();
            else if (this.canAlert()) this.performAlertAnimation();
            else if (this.attackCharacter) this.performWalkAnimation();
        }, 200);
    }

    /**
     * Checks if the boss should enter alert mode.
     * @returns {boolean} True if player is near the alert zone and attack not active.
     */
    canAlert() {
        return this.world.character.x >= 2100 && !this.attackCharacter;
    }

    /**
     * Checks if the boss is close enough to attack the player.
     * @returns {boolean} True if player is within attack range.
     */
    canAttack() {
        return this.x - this.world.character.x < 90;
    }

    /**
     * Plays hurt animation and temporarily increases speed.
     */
    performHurtAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.HURT);
        this.speed += 0.5;
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);;
        return;
    }

    /**
     * Plays death animation and triggers win screen after a delay.
     */
    performDeathAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.DEAD);
        this.playDieSound();
        setTimeout(() => {
            this.endscreen.winGame();
        }, 800);
    }

    /**
     * Plays attack animation.
     */
    performAttackAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.ATTACK);
    }

    /**
     * Plays alert animation and activates attack behavior after delay.
     */
    performAlertAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.ALERT);
        this.playAlertSound();
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);
    }

    /**
     * Plays walking animation and moves the boss toward the player.
     */
    performWalkAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.WALKING);
        this.moveLeft();
        this.playWalkingSound();
        this.otherDirection = false;
    }
  
    /**
     * Plays the death sound effect at a predefined volume.
     */
    playDieSound() {
        let audioVolume = 0.5;
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.DEATH, audioVolume)
    }

    /**
     * Plays the alert sound effect.
     */
    playAlertSound() {
        let audioVolume = 0.5;
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.ALERT, audioVolume)
    }

    /**
     * Plays the walking sound effect while the object is moving.
     */
    playWalkingSound() {
        if (this.isWalkingSoundPlaying) {
            let audioVolume = 0.3;
            this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.WALKING, audioVolume);
        }
    }

    /**
     *  Plays the hurt sound effect when the object takes damage.
     */
    playHurtingSound() {
        let audioVolume = 0.5;
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.HURT, audioVolume, stoppAtSeconds)
    }
}