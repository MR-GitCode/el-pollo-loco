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
   
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor () {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2400;
        this.isBoss = true;
        this.animate();
    }

    /**
     * Controls boss animation states and transitions.
     */
    animate() {
        setInterval(() =>{
            if (this.isHurt()) return this.performHurtAnimation(); //alle andere Animationen überspringen 
            if (this.isDead()) this.performDeadAnimation();
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
        this.playAnimation(this.IMAGES_HURT);
        this.speed += 0.5;
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);;
        return;
    }

    /**
     * Plays death animation and triggers win screen after a delay.
     */
    performDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.endscreen.winGame();
        }, 800);
    }

    /**
     * Plays attack animation.
     */
    performAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
    }

    /**
     * Plays alert animation and activates attack behavior after delay.
     */
    performAlertAnimation() {
        this.playAnimation(this.IMAGES_ALERT);
        setTimeout(() => {
            this.attackCharacter = true;
        }, 700);
    }

    /**
     * Plays walking animation and moves the boss toward the player.
     */
    performWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        this.otherDirection = false;
    }
}