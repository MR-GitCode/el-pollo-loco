class AudioManager {   
    audioCache = {}
    currentAudio = null;
    currentAudioTimeListener = null;

    loadAudio(path) {
        const audio = new Audio(path);
        audio.preload = 'auto';      // Browser soll die Datei komplett laden
        audio.load(); 
        this.audioCache[path] = audio;
    }

   playAudio(path, volume, stopAtSeconds) {

        // Wenn gerade ein Audio läuft und einen Listener hat -> Listener entfernen
        if (this.currentAudio && this.currentAudioTimeListener) {
            this.currentAudio.removeEventListener('timeupdate', this.currentAudioTimeListener);
            this.currentAudioListener = null;
        }

        // Prüfen, ob Audio vorher geladen wurde
        if (this.audioCache[path]) {
            this.currentAudio = this.audioCache[path];

            // Fehler vermeiden: Wenn volume nicht gesetzt ist oder kein Zahl ist
            if (typeof volume !== 'number' || isNaN(volume)) {
                volume = 1; // Standardlautstärke
            }

            this.currentAudio.volume = volume;

            // Nur, wenn stopAtSeconds angegeben ist
            if (typeof stopAtSeconds === 'number') {

                // Eine einfache anonyme Funktion für den Zeitvergleich
                this.currentAudioTimeListener = () => {
                    if (this.currentAudio.currentTime >= stopAtSeconds) {
                        console.log('Audio gestoppt bei:', stopAtSeconds);
                        this.stopAudio();
                    }
                };

                // Hier wird der Listener hinzugefügt
                this.currentAudio.addEventListener('timeupdate', this.currentAudioTimeListener);
            }

            // Jetzt wird das Audio abgespielt
            this.currentAudio.play();
        } else {
            console.error('Audio nicht geladen:', path);
        }
    }

    stopAudio() {
        if(this.currentAudio) {
            if (this.currentAudioListener) {
                this.currentAudio.removeEventListener('timeupdate', this.currentAudioListener);
                this.currentAudioListener = null;
            }

            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
    }
}