let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
let gameStarted = false;

/**
 * Initializes and displays the start screen.
 */
function showStartScreen() {
    canvas = document.getElementById('canvas');
    startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startScreenImage.onload = function() {
        drawStartScreen();
    };
    addEventListenerToButtons();
}

/**
 * Draws the start screen image on the canvas.
 */
function drawStartScreen() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
}

/**
 * Adds event listeners to start, control, and screen size buttons.
 */
function addEventListenerToButtons() {
    const btStartGame = document.getElementById('bt-start-game');
    const btControls = document.getElementById('bt-controls');
    const changeScreenSize = document.getElementById('min-max-screens');
    btStartGame.addEventListener('click', () => {
        const btGame = document.getElementById('buttons');
        btGame.style.display = 'none';
        init();   
    })
    btControls.addEventListener('click', () => {
        console.log("open controls");
    })
    changeScreenSize.addEventListener('click', () => {
        console.log('change screen size');
        canvas.requestFullscreen();
        document.getElementById('screen').requestFullscreen();
    })
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
 * Handles keyboard keydown events for movement and actions.
 */
window.addEventListener('keydown', (event) => {   
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = true;    
    }
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = true;        
    }
    if (event.code == "KeyS" || event.code == "ArrowDown") {
        keyboard.DOWN = true;        
    }
    if (event.code == "KeyW"|| event.code == "ArrowUp") {
        keyboard.UP = true;        
     }
    if (event.code == "Space") {
        keyboard.SPACE = true;        
    }
    if (event.code == "KeyE") {
        keyboard.E = true;        
    }
})

/**
 * Handles keyboard keyup events to stop movement or actions.
 */
window.addEventListener('keyup', (event) => {
    if (event.code == "KeyA" || event.code == "ArrowLeft") {
        keyboard.LEFT = false;        
    }
    if (event.code == "KeyD" || event.code == "ArrowRight") {
        keyboard.RIGHT = false;        
    }
    if (event.code == "KeyS" || event.code == "ArrowDown") {
        keyboard.DOWN = false;        
    }
    if (event.code == "KeyW"|| event.code == "ArrowUp") {
        keyboard.UP = false;        
     }
    if (event.code == "Space") {
        keyboard.SPACE = false;        
    }
    if (event.code == "KeyE") {
        keyboard.E = false;        
    }
}) 