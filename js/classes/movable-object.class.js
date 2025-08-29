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
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 100;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    drawFrame(ctx) {
        if(this instanceof Character || this instanceof normalChicken || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffsetFrame(ctx) {
        if(this instanceof Character || this instanceof normalChicken || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    isColliding(model) {
        return this.x + this.width - this.offset.right > model.x + model.offset.left &&
            this.y + this.height - this.offset.bottom > model.y + model.offset.top &&
            this.x + this.offset.left < model.x + model.width - model.offset.right &&
            this.y + this.offset.top < model.y + model.height - model.offset.bottom;
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