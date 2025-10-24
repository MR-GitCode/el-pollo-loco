class AudioManager {   
    audioCache = {}
    currentAudio = null;
    currentAudioTimeListener = null;
    soundEnabled = false;

    loadAudio(path) {
        const audio = new Audio(path);
        audio.preload = 'auto';      // Browser soll die Datei komplett laden
        audio.load(); 
        this.audioCache[path] = audio;
    }

    loadAudios(array) {
        array.forEach((path) => {
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = path;
            this.audioCache[path] = audio
        })
    }

    playAudio(path, volume = 1, audioLoop = false) {
        console.log('Sound play', path);
        if (this.soundEnabled) {
            if (this.audioCache[path]) {
                this.currentAudio = this.audioCache[path];
                this.currentAudio.loop = audioLoop;
                this.currentAudio.volume = volume;
                this.currentAudio.play();
            }  else {
                console.error('Audio nicht geladen:', path);
            }
        }
    }

    stopAudio(audioPath) {
        // console.log('stopp audio', audioPath);
        
        if(this.currentAudio) {
            this.audioCache[audioPath].pause();
            this.currentAudio.currentTime = 0;
        }
    }

    stopAll() {
        Object.values(this.audioCache).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
}