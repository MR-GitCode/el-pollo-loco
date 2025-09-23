class MovableObject extends DrawableObjeect{
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
    lastHit = 0;

    applyGravity() {
        setInterval(() =>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;  
            }
        }, 1000 / 75)
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return this.y < 300;
        } else {
            return this.y < 140
        }
    }

    isColliding(model) {
        return (
            this.x + this.width - this.offset.right > model.x + model.offset.left &&
            this.x + this.offset.left < model.x + model.width - model.offset.right &&
            this.y + this.height - this.offset.bottom > model.y + model.offset.top &&
            this.y + this.offset.top < model.y + model.height - model.offset.bottom
        )
    }

    hit() {
        this.energy -= 0.25;
        console.log('Collision width Character, energy', this.energy);
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
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