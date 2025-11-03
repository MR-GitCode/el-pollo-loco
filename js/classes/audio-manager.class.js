class AudioManager {   
    audioCache = {}
    currentAudio = null;
    soundEnabled = false;

    /**
     * Loads a single audio file and stores it in the cache.
     * 
     * @param {string} path - The file path of the audio resource.
     */
    loadAudio(path) {
        const audio = new Audio(path);
        audio.preload = 'auto';      // Browser soll die Datei komplett laden
        audio.load();
        audio.key = path;
        this.audioCache[path] = audio;
    }

    /**
     * Loads multiple audio files at once and stores them in the cache.
     * 
     * @param {string[]} array - Array of audio file paths.
     */
    loadAudios(array) {
        array.forEach((path) => {
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = path;
            this.audioCache[path] = audio
        })
    }

    /**
     * Plays a specific audio file if sound is enabled.
     * 
     * @param {string} path - Path of the audio file to play.
     * @param {number} [volume=1] - Playback volume (0.0–1.0).
     * @param {boolean} [isShortAudio=false] - Whether the audio is a short sound effect.
     * @param {boolean} [audioLoop=false] - Whether the audio should loop.
     */
    playAudio(path, volume = 1, isShortAudio = false, audioLoop = false) {
        if (this.soundEnabled && this.audioCache[path]) {
            if (isShortAudio){
                this.shortAudioHandler(path, volume);
            } else {
                this.longAudioHandler(path, audioLoop, volume);
            }
        }
    }

    /**
     * Handles long audio playback.
     * 
     * @param {string} path - The audio file path.
     * @param {boolean} audioLoop - Whether to loop the audio.
     * @param {number} volume - Volume of the playback.
     */
    longAudioHandler(path, audioLoop, volume) {
        this.currentAudio = this.audioCache[path];
        this.currentAudio.loop = audioLoop;
        this.currentAudio.volume = volume;
        this.currentAudio.play();
    }

    /**
     * Handles short sound effects.
     * 
     * @param {string} path - The audio file path.
     * @param {number} volume - Playback volume.
     */
    shortAudioHandler(path, volume) {
        const shortAudio = this.audioCache[path].cloneNode(true);
        shortAudio.volume = volume;
        shortAudio.play();
    }

    
    /**
     * Stops a specific audio file and resets its playback position.
     * 
     * @param {string} audioPath - Path of the audio file to stop.
     */
    stopAudio(audioPath) {
        if(this.currentAudio) {
            this.audioCache[audioPath].pause();
            this.currentAudio.currentTime = 0;
        }
    }

    /**
     * Stops all currently playing audio.
     */
    stopAll() {
        Object.values(this.audioCache).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}