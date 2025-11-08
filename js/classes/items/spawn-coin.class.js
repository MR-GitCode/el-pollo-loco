class SpawnCoin extends SpawnableObjects {
   offset = {
      top: 50,
      left: 50,
      right: 100,
      bottom: 100
   };
   audioVolume = {
        collect: 0.4,
   }
 
   constructor() {
      let imageScale = 0.5;
      const x = 200 + 1900 * Math.random();
      const y = 325 * Math.random();
      const width = 300 * imageScale;
      const height = 300 * imageScale;
      super(x, y, width, height);
      this.audioManager = audioManager;
      this.loadAssets();
      this.animate();
      this.spawnObject(COIN_ASSETS.IMAGES.COIN);
   }

   /**
    * Loads all assets of the coin item.
    */
   loadAssets() {
      this.loadImages(COIN_ASSETS.IMAGES.COIN);
      this.audioManager.loadAudio(COIN_ASSETS.SOUNDS.COLLECT);
   }

    /**
     * Handles coin animation.
     */
   animate() {
      setInterval(() => {
         let i = this.currentImage % COIN_ASSETS.IMAGES.COIN.length;
         let path = COIN_ASSETS.IMAGES.COIN[i];
         this.img = this.imageCache[path];
         this.currentImage++;
      },  500);
   }

   /**
    * Play the coin sound.
    */
   playCoinCollectSound() { 
      const audioTyp = 'isShortSound';
      this.audioManager.playAudio(COIN_ASSETS.SOUNDS.COLLECT, this.audioVolume.collect, audioTyp)
   }   
}