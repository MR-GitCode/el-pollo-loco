let percentage = 100;

class StatusBar extends DrawableObject {

    constructor(images, x, y, amount) {
        super();
        this.IMAGES = images
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 595*0.4;
        this.height = 158*0.4;
        this.setPercentage(amount);
    }

    /**
     * Updates the current percentage and selects the appropriate image
     * @param {number} percentage - The new percentage value (0–100). 
     */
    setPercentage(percentage) {
       
        
        this.percentage = percentage;
    // console.log(this.percentage);
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        // console.log(this.img);
    }

    /**
     * Determines the correct image index based on the current percentage.
     * @returns {number} The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else return 0;  
    }
}