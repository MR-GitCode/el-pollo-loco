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
        walk: 1,
        death: 1
    };
    audioVolume = {
        walk: 1,
        death: 0.4
    }
    energy = 100;
    enemyIntervals = [];
    attackStrength = 2;

    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.audioManager = audioManager;
        this.x = 400 + Math.random() * 1900;
        this.speed = 0.2 + Math.random() * 0.4;
        this.loadAssets();
        this.animate(); 
    }

    loadAssets() {
        this.loadImages(NORMAL_CHICKEN_ASSETS.IMAGES.DEAD);
        this.loadImages(NORMAL_CHICKEN_ASSETS.IMAGES.WALKING);
        this.audioManager.loadAudios(NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL)
    }

    animate() {
        setInterval(() =>{
            if (this.energy == 0) {
                this.performDeathAnimation()
            } else this.playAnimation(NORMAL_CHICKEN_ASSETS.IMAGES.WALKING, this.frameSpeed.walk);
        }, 250);
        
        const moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
        this.enemyIntervals.push(moveInterval)
    }

    performDeathAnimation() {
        this.playAnimation(NORMAL_CHICKEN_ASSETS.IMAGES.DEAD, this.frameSpeed.death);
        clearInterval(this.enemyIntervals);
    }

    playJumpKillSound() {
        let randomIndex = Math.floor(Math.random() * NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL.length);
        this.audioManager.playAudio(NORMAL_CHICKEN_ASSETS.SOUNDS.JUMP_KILL[randomIndex], this.audioVolume.death)
    }
}