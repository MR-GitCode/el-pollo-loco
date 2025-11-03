class Level {
    enemies;
    clouds;
    backgrounds;
    bottles;
    coins;
    level_end_x = 2800;

    constructor(enemies, clouds, backgrounds, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.bottles = bottles;
        this.coins = coins;

        this.maxBottles = bottles.length;
        this.maxCoins = coins.length;
    }
}