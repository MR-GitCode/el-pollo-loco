class AudioManager {   
    audioCache = {}
    currentAudio = null;

    loadAudio(path) {
        const audio = new Audio(path);
        this.audioCache[path] = audio;
    }

    playAudio(path, volume, duration) {       
        if(this.audioCache[path]) {
            this.currentAudio = this.audioCache[path];
            this.currentAudio.volume = volume;

            this.currentAudio.duration
            this.currentAudio.play();
            //vegrlgeich durcation >= currenttime
            if (condition) {
                
            }
        }
    }

    stopAudio() {
        if(this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
    }
}