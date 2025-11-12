/**
 * Toggle the sound on/off.
 */
function toggleSoundIcon() {
    const soundOn = document.getElementById('sound-on');
    const soundOff = document.getElementById('sound-off');
    audioManager.soundEnabled = !audioManager.soundEnabled;
    if (audioManager.soundEnabled) {
        soundOnHandler(soundOn, soundOff);
        refreshCurrentSound();
    } else {
        soundOffHandler(soundOn, soundOff);
    }
}

/**
 * Checks and restores the user's sound preference from localStorage.
 */
function checkSoundLocalStorage() {
    const soundOn = document.getElementById('sound-on');
    const soundOff = document.getElementById('sound-off');
    const soundLocalStorage = localStorage.getItem('soundEnabled');
    audioManager.soundEnabled = (soundLocalStorage === "true");
    if (audioManager.soundEnabled && gameStarted) {
        soundOnHandler(soundOn, soundOff);
    } else {
        soundOffHandler(soundOn, soundOff);
    } 
}

/**
 * Handels logic when soun is turned off
 * @param {HTMLElement} soundOn - The sound-on icon element.
 * @param {HTMLElement} soundOff - The sound-off icon element.
 */
function soundOffHandler(soundOn, soundOff) {
    soundOn.style.display = 'none';
    soundOff.style.display = 'block';
    audioManager.stopAll();
    localStorage.setItem('soundEnabled', audioManager.soundEnabled);
    localStorage.setItem('soundIcon', audioManager.soundEnabled);
}

/**
 * Handels logic when soun is turned off
 * @param {HTMLElement} soundOn - The sound-on icon element.
 * @param {HTMLElement} soundOff - The sound-off icon element.
 */
function soundOnHandler(soundOn, soundOff) {
    soundOn.style.display = 'block';
    soundOff.style.display = 'none';
    localStorage.setItem('soundEnabled', audioManager.soundEnabled);
    localStorage.setItem('soundIcon', audioManager.soundEnabled);
    if (!gameStarted) {
        playSoundMenu();
    } else {
        playBackgroundMusic()
    }
}

/**
 * Resets character audio states when sound is toggled back on.
 */
function refreshCurrentSound() {
    if (world?.character) {
        world.character.isWalkingSoundPlaying = false;
        world.character.isBreathing = false;
        world.character.isSnoring = false;
    }
}