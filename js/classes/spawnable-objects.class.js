class SpawnableObjects extends DrawableObject {
    otherDirection = false;
    
    constructor(x, y, width, height) {
        super();
        this.x = x
        this.y = y,
        this.width = width;
        this.height = height;
    }

    spawnObject(images) {
        let i = this.currentImage % images.length;
        let path = images[i];   
        this.img = this.imageCache[path];       
        this.currentImage++;
    }
}