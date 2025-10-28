class AudioManager {   
    audioCache = {}
    currentAudio = null;
    soundEnabled = false;

    loadAudio(path) {
        const audio = new Audio(path);
        audio.preload = 'auto';      // Browser soll die Datei komplett laden
        audio.load();
        audio.key = path;
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
        // console.log('Sound play', path, this.currentAudio);
        if (this.soundEnabled) {
            if (this.audioCache[path]) {
                this.currentAudio = this.audioCache[path];
                this.currentAudio.loop = audioLoop;
                this.currentAudio.volume = volume;
                this.currentAudio.play();
                // console.log('audio is now playing', this.currentAudio);
                
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

// class AudioManager {   
//     audioCache = {}
//     currentAudio = null;
//     soundEnabled = false;

//     // Audio laden und im Cache speichern
//     loadAudio(path) {
//         const audio = new Audio(path);
//         audio.preload = 'auto';
//         audio.load();
//         this.audioCache[path] = audio;
//     }

//     // Mehrere Audios laden
//     loadAudios(array) {
//         array.forEach(path => this.loadAudio(path));
//     }

//     // Audio abspielen, instanziiert es bei jedem Aufruf neu
//     playAudio(path, volume = 1, audioLoop = false) {
//         if (!this.soundEnabled) return;

//         const cachedAudio = this.audioCache[path];
//         if (!cachedAudio) {
//             console.error('Audio nicht geladen:', path);
//             return;
//         }

//         // Stoppe aktuelles Audio, falls es das gleiche ist
//         if (this.currentAudio) {
//             this.currentAudio.pause();
//         }

//         // Neues Audio-Objekt erstellen, um frisch zu starten
//         const audio = new Audio(cachedAudio.src);
//         audio.preload = 'auto';
//         audio.loop = audioLoop;
//         audio.volume = volume;

//         this.currentAudio = audio;
//         audio.play().catch(err => {
//             console.warn('Audio konnte nicht abgespielt werden:', err);
//         });
//     }

//     // Stoppt ein bestimmtes Audio
//     stopAudio(audioPath) {
//         const audio = this.audioCache[audioPath];
//         if(audio && this.currentAudio && this.currentAudio.src === audio.src) {
//             this.currentAudio.pause();
//             this.currentAudio.currentTime = 0;
//             this.currentAudio = null;
//         }
//     }

//     // Stoppt alle Audios
//     stopAll() {
//         Object.values(this.audioCache).forEach(audio => {
//             if(this.currentAudio && this.currentAudio.src === audio.src) {
//                 this.currentAudio.pause();
//                 this.currentAudio.currentTime = 0;
//             }
//         });
//         this.currentAudio = null;
//     }
// }
