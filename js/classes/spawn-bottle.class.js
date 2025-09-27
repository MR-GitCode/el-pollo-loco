class SpawnBottle extends SpawnableObjects {
    offset = {
        top: 20,
        left: 50,
        right: 75,
        bottom: 35
    };
    
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];
    
    constructor() {
        let imageScale = 0.3;
        const x = 200 + 1900 * Math.random();
        const y = 325;
        const width = 400 * imageScale;
        const height = 400 * imageScale;
        super(x, y, width, height);
        this.loadImages(this.IMAGE_BOTTLE);
        this.spawnObject(this.IMAGE_BOTTLE);
        this.randomMirrorImage()
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
}