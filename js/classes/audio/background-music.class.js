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
        this.loadAudio(this.audioPaths);
    }

    /**
     * Plays the backgroundmusic of the world.
     */
    playMusic() {
        const isShortAudio = false;
        const audioLoop = true;
        this.playAudio(this.audioPaths, this.audioVolume.music, isShortAudio, audioLoop)
    }
}