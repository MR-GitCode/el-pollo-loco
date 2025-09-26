class SpawnCoin extends SpawnableObjects {
   IMAGE_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
   ]

   constructor(x, y) {
      let imageScale = 0.5;
      const width = 300 * imageScale;
      const height = 300 * imageScale;
      super(x, y, width, height);
      this.loadImages(this.IMAGE_COIN);
      this.spawnObject(this.IMAGE_COIN);
    }
}