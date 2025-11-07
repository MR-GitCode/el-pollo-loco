let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
let audioManager = new AudioManager();
let gameStarted = false;
let audioVolume = {
    theme: 0.2,
}

const IMAGE_STARTSCREEN = [
    'img/9_intro_outro_screens/start/startscreen_2.png'
]

const SOUND_THEME = [
    'audio/intro_outro/intro/tex-mex-delight-mexican-mariachi.mp3'
]

/**
 * Initializes and displays the start screen.
 */
function showStartScreen() {
    canvas = document.getElementById('canvas');
    body = document.getElementsByTagName('body')
    audioManager.loadAudio(SOUND_THEME);
    startScreenImage.src = IMAGE_STARTSCREEN;
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
        let screenWidth =  window.innerWidth;
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
    let touchControl = document.getElementById('mobile-buttons');
    const updateTouchDisplay = () => {
        let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
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
 * Played the theme music.
 */
function playSoundMenu() {
    const isShortAudio = false;
    const audioLoop = true;
    audioManager.playAudio(SOUND_THEME, audioVolume.theme, isShortAudio, audioLoop);
}