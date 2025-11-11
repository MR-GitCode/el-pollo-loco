let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
let audioManager = new AudioManager();
let gameStarted = false;
let audioVolume = {
    menuTheme: 0.2,
    ingameTheme: 0.02,
}

/**
 * Initializes and displays the start screen.
 */
function showStartScreen() {
    canvas = document.getElementById('canvas');
    body = document.getElementsByTagName('body')
    audioManager.loadAudio(STARTSCREEN_ASSETS.SOUNDS.THEME);
    audioManager.loadAudio(INGAME_ASSETS.SOUNDS.THEME);
    localStorage.setItem('soundIcon', "false");
    // checkSoundLocalStorage();
    startScreenImage.src = STARTSCREEN_ASSETS.IMAGES.SCREEN;
    startScreenImage.onload = function() {
        drawStartScreen();
    };
    addEventListenerToButtons();
    checkDisplaySize();
    checkDisplayTouch();
    keyboard.addControllingEventListeners();
}

/**
 * Checks the display size and toggles the visibility of a "rotate device" message.
 */
function checkDisplaySize() {
    let containerRotateScreen = document.getElementById('rotate-screen');
    const updateDisplaySize = () => {
        let screenWidth =  screen.width;
        if (screenWidth < 600) {
            containerRotateScreen.classList.remove('hidden');            
        } else {
            containerRotateScreen.classList.add('hidden');
        }
    };
    updateDisplaySize();
    window.addEventListener('resize', updateDisplaySize);
}

/**
 * Detects if the current device supports touch input and toggles control buttons.
 */
function checkDisplayTouch() {
     const touchControl = document.getElementById('mobile-buttons');
    const updateTouchDisplay = () => {
        const hasTouch = window.matchMedia('(pointer: coarse)').matches;
        if (hasTouch) {
            touchControl.classList.remove('hidden');
        } else {
            touchControl.classList.add('hidden');
        }
    };
    updateTouchDisplay();
    window.addEventListener('resize', updateTouchDisplay);
};

/**
 * Draws the start screen image on the canvas.
 */
function drawStartScreen() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
}

/**
 * Starts the game by creating a new World instance.
 */
function init() {
    gameStarted = true;
    world = new World(canvas, keyboard, gameStarted);
}

/**
 * Stops all running intervals and effectively ends the game loop.
 */
function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i); //clearInterval = Methode to stop intervals
}

/**
 * Played the menu theme music.
 */
function playSoundMenu() {
    const isShortAudio = false;
    const audioLoop = true;
    audioManager.playAudio(STARTSCREEN_ASSETS.SOUNDS.THEME, audioVolume.menuTheme, isShortAudio, audioLoop);
}

/**
 * Played the the background music.
 */
function playBackgroundMusic() {  
    const isShortAudio = false;
    const audioLoop = true;
    audioManager.playAudio(INGAME_ASSETS.SOUNDS.THEME, audioVolume.ingameTheme, isShortAudio, audioLoop);
}