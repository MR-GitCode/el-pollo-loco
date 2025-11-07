let level1;

/**
 * Initializes and configures the first game level (level1).
 * Creates enemies, clouds, background layers, collectible bottles, and coins.
 */
function initLevel() {
    level1 = new Level (
            new BackgroundMusic(INGAME_ASSETS.SOUNDS.THEME),

        [
            new normalChicken(),
            new normalChicken(),
            new normalChicken(),
            new normalChicken(),
            new normalChicken(),
            new normalChicken(),
            new EndBoss(),
        ],

        [
            new Clouds(),
            new Clouds(),
            new Clouds(),
            new Clouds(),
        ],
        
        [
            new Background(INGAME_ASSETS.IMAGES.AIR, -720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[1], -720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[1], -720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[1], -720, 0),
            new Background(INGAME_ASSETS.IMAGES.AIR, 0, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 0, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 0, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 0, 0),

            new Background(INGAME_ASSETS.IMAGES.AIR, 720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[1], 720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[1], 720, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[1], 720, 0),
            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 2, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 720 * 2, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 720 * 2, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 720 * 2, 0),

            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 3, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[1], 720 * 3, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[1], 720 * 3, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[1], 720 * 3, 0),
            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 4, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 720 * 4, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 720 * 4, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 720 * 4, 0),
        ],

        [
            new SpawnBottle(),
            new SpawnBottle(),
            new SpawnBottle(),
            new SpawnBottle(),
            new SpawnBottle(),
        ],
        
        [
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
            new SpawnCoin(),
        ]
    )   
}
