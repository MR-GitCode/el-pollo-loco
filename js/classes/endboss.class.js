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
    attackStrength = 15;
    speed = 40;
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
        // this.x = 600;
        this.isBoss = true;
        this.animate();
    }

    animate() {
        setInterval(() =>{
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.speed += 2; 
                return; //alle andere animation überspringen 
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.endscreen.winGame();
            }
            else if (this.x - this.world.character.x < 100) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
            else if (this.world.character.x >= 2100 && !this.attackCharacter) {
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout (() => {
                    this.attackCharacter = true;
                }, 900)
            }
            else if (this.attackCharacter) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
                this.otherDirection = false;
            }
        }, 400);
    }
}