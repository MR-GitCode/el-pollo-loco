class BackgroundMusic extends AudioManager {
    audioVolume = {
        music: 0.05,
    }

    constructor(audioPaths) {
        super();
        this.audioPaths = audioPaths;
        this.loadAssets()
    }

    /**
     * Loads the music of the world.
     */
    loadAssets() {
        this.loadAudio(INGAME_ASSETS.SOUNDS.THEME);
    }

    /**
     * Plays the backgroundmusic of the world.
     */
    playMusic(audioPaths) {
        const isShortAudio = false;
        const audioLoop = true;
        this.playAudio(audioPaths, this.audioVolume.music, isShortAudio, audioLoop)
    }
}