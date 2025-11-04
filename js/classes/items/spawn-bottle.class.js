class SpawnBottle extends SpawnableObjects {
    offset = {
        top: 20,
        left: 50,
        right: 75,
        bottom: 35
    };
    audioVolume = {
        rotate: 0.8,
        collect: 0.3,
        splash: 0.8
    }
    
    static attackStrength = 100;
        
    constructor() {
        let imageScale = 0.3;
        const x = 200 + 1900 * Math.random();
        const y = 325;
        const width = 400 * imageScale;
        const height = 400 * imageScale;
        super(x, y, width, height);
        this.audioManager = audioManager;
        this.loadAssets();
        this.spawnObject(BOTTLE_ASSETS.IMAGES.BOTTLE);
        this.randomMirrorImage();
    }

    /**
     * Loads all assets of the bottle item.
     */
    loadAssets() {
        this.loadImages(BOTTLE_ASSETS.IMAGES.BOTTLE);
        this.audioManager.loadAudio(BOTTLE_ASSETS.SOUNDS.BREAKING);
        this.audioManager.loadAudio(BOTTLE_ASSETS.SOUNDS.COLLECT);
    }

    /**
     * Reflects the image.
     */
    randomMirrorImage() {
        const randomIndex = Math.round(Math.random());
        if (randomIndex == 1) {
            this.otherDirection = true;
        } else this.otherDirection = false;
    }

    /**
     * Play the collect sound of the bottle.
     */
    playBottleCollectSound() {
        const audioTyp = 'isShortSound';
        this.audioManager.playAudio(BOTTLE_ASSETS.SOUNDS.COLLECT, this.audioVolume.collect, audioTyp);         
    }
}