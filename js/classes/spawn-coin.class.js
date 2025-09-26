class SpawnCoin extends SpawnableObjects {
   IMAGE_COIN = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png',
   ]

   constructor() {
      let imageScale = 0.5;
      const x = 200 + 1900 * Math.random();
      const y = 325;
      const width = 300 * imageScale;
      const height = 300 * imageScale;
      super(x, y, width, height);
      this.loadImages(this.IMAGE_COIN);
      this.animate();
      this.spawnObject(this.IMAGE_COIN);
   }

   animate() {
      setInterval(() => {
         let i = this.currentImage % this.IMAGE_COIN.length;
         let path = this.IMAGE_COIN[i];
         this.img = this.imageCache[path];
         this.currentImage++;
      },  500);
   }
}