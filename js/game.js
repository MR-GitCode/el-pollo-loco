let canvas;
let world;
let keyboard = new Keyboard();
let startScreenImage = new Image();
let audioManager = new AudioManager();
let gameStarted = false;

/**
 * Initializes and displays the start screen.
 */
function showStartScreen() {
    canvas = document.getElementById('canvas');
    body = document.getElementsByTagName('body')
    startScreenImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startScreenImage.onload = function() {
        drawStartScreen();
    };
    addEventListenerToButtons();
    document.body.addEventListener('click', () => {
        audioManager.playAudio('audio/intro_outro/intro/tex-mex-delight-mexican-mariachi.mp3');
    }, { once: true });
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
 * Adds event listeners to start, control, home and screen size buttons.
 */
function addEventListenerToButtons() {
    const btStartGame = document.getElementById('bt-start-game');
    const btControls = document.getElementById('bt-controls');
    addStartGameListener(btStartGame);
    addControlsListener(btControls);
    addHomeListener(btStartGame, btControls);
    addScreenSizeListener();
}

/**
 * Adds an event listener to start the game when the Start button is clicked.
 * Hides menu buttons and initializes the game.
 * @param {HTMLElement} btStartGame - The Start Game button element.
 */
function addStartGameListener(btStartGame) {
    btStartGame.addEventListener('click', () => {
        const btGame = document.getElementById('buttons');
        btGame.classList.remove('buttons-endscreen');
        btGame.style.display = 'none';
        init();   
    })
}

/**
 * Adds an event listener to open the controls menu.
 * @param {HTMLElement} btControls - The Controls button element.
 */
function addControlsListener(btControls) {
    btControls.addEventListener('click', () => {
        console.log("open controls");
    })
}

/**
 * Adds a listener to return to the home/start screen.
 * Resets button visibility and screen layout.
 * @param {HTMLElement} btStartGame - The Start Game button.
 * @param {HTMLElement} btControls - The Controls button.
 */
function addHomeListener(btStartGame, btControls) {
    const btHome = document.getElementById('bt-home');
    btHome.addEventListener('click' , () => {
        const btGame = document.getElementById('buttons');
        btGame.classList.remove('buttons-endscreen');
        btGame.style.display = 'flex';
        btStartGame.innerHTML = 'Start';
        btControls.style.display = 'flex';
        btHome.style.display = 'none';
        showStartScreen();
    })
}

/**
 * Adds a listener to toggle fullscreen mode for the canvas.
 */
function addScreenSizeListener() {
    const changeScreenSize = document.getElementById('min-max-screens');
    const maxScreen = document.getElementById('maximize-screen');
    const minScreen = document.getElementById('minimize-screen');
    changeScreenWithClick(changeScreenSize, maxScreen, minScreen);
    changeScreenWithEscape(maxScreen, minScreen);
}

/**
 * Adds a click listener to toggle fullscreen mode.
 * Updates the display of the maximize/minimize buttons.
 * 
 * @param {HTMLElement} changeScreenSize - The button element that toggles fullscreen.
 * @param {HTMLElement} maxScreen - The button element to maximize the screen.
 * @param {HTMLElement} minScreen - The button element to minimize the screen.
 */
function changeScreenWithClick(changeScreenSize, maxScreen, minScreen) {
    changeScreenSize.addEventListener('click', () => {
        const screen = document.getElementById('screen')
        if (!document.fullscreenElement) {
            enterFullscreen(screen);
            maxScreen.style.display = 'none';
            minScreen.style.display = 'block';
        } else {
            exitFullscreen();
            maxScreen.style.display = 'block';
            minScreen.style.display = 'none';
        }
    });
}

function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Adds an event listener to handle fullscreen changes triggered by ESC or other methods.
 * Adjusts the display of maximize/minimize buttons according to the fullscreen state.
 * 
 * @param {HTMLElement} maxScreen - The button element to maximize the screen.
 * @param {HTMLElement} minScreen - The button element to minimize the screen.
 */
function changeScreenWithEscape(maxScreen, minScreen) {
    function updateButtons() {
        if (document.fullscreenElement) {
            maxScreen.style.display = 'none';
            minScreen.style.display = 'block';
            setButtonsDependentScreenSize('maxScreen');
            
        } else {
            maxScreen.style.display = 'block';
            minScreen.style.display = 'none';
            setButtonsDependentScreenSize('minScreen');
        }
    };
    //Fullscreen-Change
    document.addEventListener('fullscreenchange', updateButtons);
    //Wen Fenstergröße dynamisch geändert wird
    window.addEventListener('resize', updateButtons);
}

function setButtonsDependentScreenSize(screenSize) {
    const canvas = document.getElementById('canvas');
    const screenSizeButton = document.getElementById('min-max-screens');
    const menuButtons = document.getElementById('buttons');

    const canvasWidth = canvas.scrollWidth;
    const isFullscreen = !!document.fullscreenElement;
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    // dynamisch Fenster --> Problem mit fullscreen -->andere Lösung?
    // if (isFullscreen && (canvasWidth !== window.innerWidth)) {
    //     console.log(canvasWidth, window.innerWidth );
        
    //     canvas.style.height = '100%'
    // } else {
    //     canvas.style.height = ''
    // }
    const canvasHeight = canvas.scrollHeight;    
    
    stylePositionButtons(screenSize, canvasHeight, screenSizeButton, menuButtons);
    styleButtonsScreenMax(canvasWidth, screenSizeButton);
}

function stylePositionButtons(screenSize, canvasHeight, screenSizeButton, menuButtons) {
    if (screenSize == 'maxScreen') {
        calcPositionBtnMaxScreen(canvasHeight, screenSizeButton, menuButtons);
    }
    if (screenSize == 'minScreen') {
        calcPositionBtnMinScreen(menuButtons, screenSizeButton);
    }
}

function calcPositionBtnMinScreen(menuButtons, screenSizeButton) {
    menuButtons.style.top = '10%';
    screenSizeButton.style.bottom = '10px';
}

function calcPositionBtnMaxScreen(canvasHeight, screenSizeButton, menuButtons) {
    let heightOutsideCanvas = (screen.height - canvasHeight) / 2;
    let factorScreenSizeBtn = canvasHeight * 0.01;
    let factorMenuBtn = canvasHeight * 0.1;
    screenSizeButton.style.bottom = `${heightOutsideCanvas + factorScreenSizeBtn}px`;
    menuButtons.style.top = `${heightOutsideCanvas + factorMenuBtn}px`;
}

function styleButtonsScreenMax(canvasWidth, screenSizeButton) {
    const buttons = document.querySelectorAll('#buttons .button');
    if (canvasWidth >= 1000) {
        styleBtnMax(screenSizeButton, buttons);
    } else {
        styleBtnMin(screenSizeButton, buttons);
    }
}

function styleBtnMin(screenSizeButton, buttons) {
    screenSizeButton.classList.remove('fullscreen-min-max-screens');
    buttons.forEach((btn) => {
        btn.classList.remove('fullscreen-button');
    });
}

function styleBtnMax(screenSizeButton, buttons) {
    screenSizeButton.classList.add('fullscreen-min-max-screens');
    buttons.forEach((btn) => {
        btn.classList.add('fullscreen-button');
    });
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