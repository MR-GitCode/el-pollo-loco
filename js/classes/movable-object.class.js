class MovableObject extends DrawableObject{
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
    beforeY = 0;
    isFalling = false;

    constructor () {
        super();
        this.audioManager = audioManager;
    }

    /**
    * Applies gravity to the object over time.
    */
    applyGravity() {
        this.gravityInterval = setInterval(() =>{
            this.beforeY = this.y;
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.isFalling = this.checkFalling();
            }
            else {
                setTimeout (() =>{
                    this.isFalling = false;
                }, 300)
            }
        }, 1000 / 75)
    }

    /**
     * Checks whether the object is currently moving downward.
     * @returns 
     */
    checkFalling() {
        return this.y > this.beforeY;
    }

    /**
    * Checks if the object is above ground level.
    * @returns {boolean} True if object is above ground.
    */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return this.y < 350;
        } else {
            return this.y < 140
        }
    }

    /**
    * Checks collision with another object.
    * @param {MovableObject} model - The other object to check against.
    * @returns {boolean} True if colliding.
    */
    isColliding(model) {
        return (
            this.isRightCollision(model) &&
            this.isLeftCollision(model) &&
            this.isBottomCollision(model) &&
            this.isTopCollision(model)
        )
    }

    /**
     * Checks for collision along the top edge of the current object.
     * @param {MovableObject} model - The object to compare against.
     * @returns 
     */
    isTopCollision(model) {
        return this.y + this.offset.top < model.y + model.height - model.offset.bottom;
    }

    /**
     * Checks for collision along the bottom edge of the current object.
     * @param {MovableObject} model - The object to compare against.
     * @returns 
     */
    isBottomCollision(model) {
        return this.y + this.height - this.offset.bottom > model.y + model.offset.top;
    }

    /**
     * Checks for collision along the left edge of the current object.
     * @param {MovableObject} model - The object to compare against. 
     * @returns 
     */
    isLeftCollision(model) {
        return this.x + this.offset.left < model.x + model.width - model.offset.right;
    }

    /**
     *  Checks for collision along the right edge of the current object.
     * @param {MovableObject} model - The object to compare against. 
     * @returns 
     */
    isRightCollision(model) {
        return this.x + this.width - this.offset.right > model.x + model.offset.left;
    }

    /**
     * Reduces energy on hit and updates last hit time.
     * @param {number} attack 
     */
    hit(attackStrength) {
        const now = Date.now();
        if (now - this.lastHit < 700) return; 
        this.lastHit = now;
        this.energy -= attackStrength;        
        if (this.energy < 0) this.energy = 0;
    }

    /**
    * Checks if the object was recently hurt.
    * @returns {boolean} True if hurt in the last second.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.4;
    }

    /**
    * Checks if the object has no remaining energy.
    * @returns {boolean} True if dead.
    */
    isDead() { 
        return this.energy == 0;
    }

    /**
     * Plays an animation by cycling through a list of images.
     * The animation speed can changed by `frameSpeed` parameter.
     * 
     * @param {string[]} images - Array of image paths..
     * @param {number} [frameSpeed=1] - Speed multiplier for frame progression.
     */
    playAnimation(images, frameSpeed = 1) {
        this.animationFrameCounter = (this.animationFrameCounter || 0) + frameSpeed;
        if (this.animationFrameCounter >= 1) {
            this.currentImage++;
            this.animationFrameCounter = 0;
        }
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
    }

    /**
    * Moves object to the right.
    */
    moveRight() {
        this.otherDirection = false;
        this.x += this.speed;
    }

    /**
    * Moves object to the left.
    */
    moveLeft() {
        this.otherDirection = true; 
        this.x -= this.speed;
    }

    /**
    * Makes the object jump vertically.
    */
    jump() {
       this.speedY = 10; 
    }

    /**
    * Performs a jump while moving right.
    */
    jumpRight() {
        if (!this.isAboveGround()) { 
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.WALKING[0]);
            this.speedY = 12;         
            this.x += 10;            
            this.horizontalSpeed = 5;
            const moveRightWhileJumping = setInterval(() => {
                this.x += this.horizontalSpeed;
                this.stopMovingAfterJump (moveRightWhileJumping);
            }, 40);
        }
    }

    /**
    * Performs a jump while moving left.
    */
    jumpLeft() {
        if (!this.isAboveGround()) {
            this.audioManager.stopAudio(CHARACTER_ASSETS.SOUNDS.WALKING[0]);   
            this.speedY = 12;         
            this.x -= 10;            
            this.horizontalSpeed = 5;
            const moveLeftWhileJumping = setInterval(() => {
                this.x -= this.horizontalSpeed;
                this.stopMovingAfterJump (moveLeftWhileJumping);
            }, 40);
        }
    }

    /**
    * Stops horizontal movement after landing.
    * @param {number} moveWhileJumping - Interval reference.
    */
    stopMovingAfterJump (moveWhileJumping) {
        if (!this.isAboveGround()) {
            clearInterval(moveWhileJumping);
            this.horizontalSpeed = 0;
        }  
    }
}