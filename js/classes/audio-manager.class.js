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

   playAudio(path, volume) {
    console.log(this.soundEnabled);
        if (this.soundEnabled) {
            
            
            // Wenn Audio gerade läuft und einen Listener hat -> Listener entfernen
            if (this.currentAudio && this.currentAudioTimeListener) {
                this.currentAudio.removeEventListener('timeupdate', this.currentAudioTimeListener);
                this.currentAudioTimeListener = null;
            }
            if (this.audioCache[path]) {
                this.currentAudio = this.audioCache[path];
                if (typeof volume !== 'number' || isNaN(volume)) {
                    volume = 1;
                }
                this.currentAudio.volume = volume;
                this.currentAudio.play();
            } 
        }


        // else {
        //     console.error('Audio nicht geladen:', path);
        // }
    }

    stopAudio() {
        if(this.currentAudio) {
            if (this.currentAudioTimeListener) {
                this.currentAudio.removeEventListener('timeupdate', this.currentAudioTimeListener);
                this.currentAudioTimeListener = null;
            }
            this.currentAudio.pause();
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