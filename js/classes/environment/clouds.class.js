class Clouds extends MovableObject{
    height = 300;
    width = 400;
    
    constructor () {
        super();
        this.loadAssets();
        this.randomCloudImage();
        this.x = Math.random() * 3000;
        this.y = Math.random() * 100;
        this.speed = 0.1 + Math.random() * 0.4;
    }

    /**
     * Loads all assets of the clouds.
     */
    loadAssets() {
        this.loadImages(ENVIRONMENT_ASSETS.AIR.CLOUDS);
    }

    /**
     * Handles cloud animation and camera movement.
     *
     */
    animate() {
            this.moveLeft(this.speed);
            this.respawnClouds();
    }

    /**
     * Reset the cloud position when offscreen. 
     */
    respawnClouds() {
        if (this.x + this.width < 0) {
            this.x = 3000 + Math.random() * 500;
            this.y = Math.random() * 150;
        }
    }

    /**
     * Add a random cloud image.
     */
    randomCloudImage() {
        const randomIndex = Math.floor(Math.random() * ENVIRONMENT_ASSETS.AIR.CLOUDS.length);
        const path = ENVIRONMENT_ASSETS.AIR.CLOUDS[randomIndex];
        this.loadImage(path);
    }
}