class MovableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = {};
    currentImage = 0;
    speed;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.25;

    applyGravity() {
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;  
            }
        }, 1000 / 75)
    }

    isAboveGround() {
        return this.y < 140
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
  
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.otherDirection = false;
        this.x += this.speed;
    }

    moveLeft() {
        this.otherDirection = true;
        this.x -= this.speed;
    }

    jump() {
       this.speedY = 10; 
    }
}