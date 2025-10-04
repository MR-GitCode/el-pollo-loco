let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
let gameStarted = false;

function showStartScreen() {
    canvas = document.getElementById('canvas');
    startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startScreenImage.onload = function() {
        drawStartScreen();
    };
    addEventListenerToButtons();
}

function drawStartScreen() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startScreenImage, 0, 0, canvas.width, canvas.height);
}

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

function init() {
    gameStarted = true;
    world = new World(canvas, keyboard, gameStarted);
}

/**
 * 
 */
function stopGame() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i); //clearInterval = Methode to stop intervals
}

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