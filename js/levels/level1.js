let level1;
let a = 2;
let b = 3;
let c = 4;
let d = 5;
let e = 6;

/**
 * Initializes and configures the first game level (level1).
 * Creates enemies, clouds, background layers, collectible bottles, and coins.
 */
function initLevel() {
    level1 = new Level (
            new BackgroundMusic(INGAME_ASSETS.SOUNDS.THEME),

        [
            // new normalChicken(),
            // new normalChicken(),
            // new normalChicken(),
            // new normalChicken(),
            // new normalChicken(),
            // new normalChicken(),
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
            new Background(INGAME_ASSETS.IMAGES.AIR, 0-a, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 0-a, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 0-a, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 0-a, 0),

            new Background(INGAME_ASSETS.IMAGES.AIR, 720-b, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[1], 720-b, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[1], 720-b, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[1], 720-b, 0),
            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 2-c, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 720 * 2-c, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 720 * 2-c, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 720 * 2-c, 0),

            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 3-d, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[1], 720 * 3-d, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[1], 720 * 3-d, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[1], 720 * 3-d, 0),
            new Background(INGAME_ASSETS.IMAGES.AIR, 720 * 4-e, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.THIRD_LAYER[0], 720 * 4-e, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.SECOND_LAYER[0], 720 * 4-e, 0),
            new Background(INGAME_ASSETS.IMAGES.GROUND_DESERT.FIRST_LAYER[0], 720 * 4-e, 0),
        ],

        [
            new SpawnBottle(),
            new SpawnBottle(),
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
        ]
    )   
}
