class EndBoss extends MovableObject {  
    static bossEnergy = 300
    x = 2400
    y = 90;
    width = 1045 * 0.3;
    height = 1217 * 0.3;
    offset = {
        top: 70,
        left: 15,
        right: 25,
        bottom: 80
    };
    frameSpeed = {
        walk: 1,
        alert: 1,
        hurt: 1,
        death: 0.75,
        attack: 1
    };
    audioVolume = {
        walk: 0.3,
        alert: 0.5,
        hurt: 0.5,
        death: 0.5,
    }
    energy = 300;
    attackStrength = 6;
    speed = 25;
    attackCharacter = false;
    endscreen = new Endscreen();
   
    constructor () {
        super().loadImage(ENDBOSS_ASSETS.IMAGES.ALERT[0]);
        this.audioManager = audioManager;
        this.world = world;
        this.loadAssets();
        this.isBoss = true;
        this.animate();
    }

    /**
     * Loads all assets of the endboss.
     */
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
        return Math.abs(this.x - this.world.character.x) < 75;
    }

    /**
     * Plays hurt animation and temporarily increases speed.
     */
    performHurtAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.HURT, this.frameSpeed.hurt);
        this.speed += 0.5;
        this.playHurtingSound();
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);;
        return;
    }

    /**
     * Plays death animation and triggers win screen after a delay.
     */
    performDeathAnimation() {
        this.audioManager.stopAudio(ENDBOSS_ASSETS.SOUNDS.WALKING);
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.DEAD, this.frameSpeed.death);
        this.playDieSound();
        setTimeout(() => {
            this.audioManager.stopAll(); 
            this.audioManager.stopAudio(ENDBOSS_ASSETS.SOUNDS.DEATH[0])
            this.endscreen.winGame();
        }, 1200);
    }

    /**
     * Plays attack animation.
     */
    performAttackAnimation() {
        this.audioManager.stopAudio(ENDBOSS_ASSETS.SOUNDS.WALKING);
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.ATTACK, this.frameSpeed.attack);
    }

    /**
     * Plays alert animation and activates attack behavior after delay.
     */
    performAlertAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.ALERT, this.frameSpeed.alert);
        this.playAlertSound();
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);
    }

    /**
     * Plays walking animation and moves the boss toward the player.
     */
    performWalkAnimation() {
        this.playAnimation(ENDBOSS_ASSETS.IMAGES.WALKING, this.frameSpeed.walk); 
        const bossLeftFromChracter = this.world.character.x - this.x;    
        if (bossLeftFromChracter > 0) {
            this.moveRight();
            this.otherDirection = true;
        } else {
           this.moveLeft();
           this.otherDirection = false; 
        }
        this.playWalkingSound(); 
    }
  
    /**
     * Plays the death sound effect at a predefined volume.
     */
    playDieSound() {
        const audioTyp = 'isSpamSound';
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.DEATH, this.audioVolume.death, audioTyp);
    }

    /**
     * Plays the alert sound effect.
     */
    playAlertSound() {
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.ALERT, this.audioVolume.alert)
    }

    /**
     * Plays the walking sound effect while the object is moving.
     */
    playWalkingSound() {
        console.log('walk');
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.WALKING, this.audioVolume.walk);
        this.audioManager.stopAudio(ENDBOSS_ASSETS.SOUNDS.HURT[0]);
        
    }

    /**
     *  Plays the hurt sound effect when the object takes damage.
     */
    playHurtingSound() {
        this.audioManager.playAudio(ENDBOSS_ASSETS.SOUNDS.HURT, this.audioVolume.hurt)
    }
}