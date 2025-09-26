class SpawnBottle extends SpawnableObjects {
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
    constructor(x, y) {
        let imageScale = 0.3;
        const width = 400 * imageScale;
        const height = 400 * imageScale;
        super(x, y, width, height);
        this.loadImages(this.IMAGE_BOTTLE);
        this.spawnObject(this.IMAGE_BOTTLE);
    }
}