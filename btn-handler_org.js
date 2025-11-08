const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const inputEvent = isTouch ? 'touchstart' : 'click';

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
    addVolumeControlListener();
    addCloseControlMenuListener();
}

/**
 * Adds an event listener to start the game when the Start button is clicked.
 * Hides menu buttons and initializes the game.
 * @param {HTMLElement} btStartGame - The Start Game button element.
 */
function addStartGameListener(btStartGame) {
    btStartGame.addEventListener(inputEvent, (e) => {
            e.preventDefault();
            const btGame = document.getElementById('buttons');
            btGame.classList.remove('buttons-endscreen');
            btGame.style.display = 'none';
            audioManager.stopAll();
            init();  
    });
}

/**
 * Adds an event listener to open the controls menu.
 * @param {HTMLElement} btControls - The Controls button element.
 */
function addControlsListener(btControls) {
    const controlsMenu = document.getElementById('controls-window');
    btControls.addEventListener(inputEvent, (e) => {
        e.preventDefault();
        controlsMenu.classList.remove('hidden');
    });
}

/**
 * Adds a listener to return to the home/start screen.
 * Resets button visibility and screen layout.
 * @param {HTMLElement} btStartGame - The Start Game button.
 * @param {HTMLElement} btControls - The Controls button.
 */
function addHomeListener(btStartGame, btControls) {
    const btHome = document.getElementById('bt-home');
    btHome.addEventListener(inputEvent, (e) => {
        e.preventDefault();
        audioManager.stopAll();
        resetButtons(btStartGame, btControls, btHome);
        startScreenImage.src = STARTSCREEN_ASSETS.IMAGES.SCREEN;
        drawStartScreen();
    });  
}

/**
 * Reset visibility of the start screen buttons.
 * @param {HTMLElement} btStartGame - The Start Game button.
 * @param {HTMLElement} btControls - The Controls button.
 * @param {HTMLElement} btHome - The Home button
 */
function resetButtons(btStartGame, btControls, btHome) {
    const btGame = document.getElementById('buttons');
    btGame.classList.remove('buttons-endscreen');
    btGame.style.display = 'flex';
    btStartGame.innerHTML = 'Start';
    btControls.style.display = 'flex';
    btHome.style.display = 'none';
}

/**
 * Add a listener to close button of the controle menu
 */
function addCloseControlMenuListener() {
    const closeBtn = document.getElementById('bt-close-control-menu');
    const controlsMenu = document.getElementById('controls-window');
    closeBtn.addEventListener(inputEvent, (e) => {
        e.preventDefault();
        controlsMenu.classList.add('hidden');
    });  
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
 * Add a listener to the sound on/off button.
 */
function addVolumeControlListener() {
    const volumeControl = document.getElementById('sound-volume');
    volumeControl.addEventListener(inputEvent, (e) => {
        e.preventDefault();
        toggleSoundIcon();      
    })
}

/**
 * Toggle the sound on/off.
 */
function toggleSoundIcon() {
    const soundOn = document.getElementById('sound-on');
    const soundOff = document.getElementById('sound-off');
    audioManager.soundEnabled = !audioManager.soundEnabled;
    if (audioManager.soundEnabled) {
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
    if (!gameStarted) {
        playSoundMenu();
    } else {
        playBackgroundMusic()
    }
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
    changeScreenSize.addEventListener(inputEvent, (e) => {
        e.preventDefault();
        const screen = document.getElementById('screen')
        if (!document.fullscreenElement) {
            fullscreenOnHandler(screen, maxScreen, minScreen);
        } else {
            fullscreenOffHandler(maxScreen, minScreen);
        }
    });
}

/**
 * Exits fullscreen mode and updates icon visibility.
 * 
 * @param {HTMLElement} maxScreen - The maximize icon to be shown.
 * @param {HTMLElement} minScreen - The minimize icon to be hidden.
 */
function fullscreenOffHandler(maxScreen, minScreen) {
    exitFullscreen();
    touchDisplayFullscreenHandler('fullscreenOff');
    maxScreen.style.display = 'block';
    minScreen.style.display = 'none';
}

/**
 * Enters fullscreen mode and updates icon visibility.
 * 
 * @param {HTMLElement} screen - The element to display in fullscreen.
 * @param {HTMLElement} maxScreen - The maximize icon to be hidden.
 * @param {HTMLElement} minScreen - The minimize icon to be shown.
 */
function fullscreenOnHandler(screen, maxScreen, minScreen) {
    enterFullscreen(screen);
    touchDisplayFullscreenHandler('fullscreenOn');
    maxScreen.style.display = 'none';
    minScreen.style.display = 'block';
}

/**
 * Handles the fullscreensize of the canvas of the touch display.
 */
function touchDisplayFullscreenHandler(mode) {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        if (mode === 'fullscreenOn') {
            touchPosBtnFullscreenOn();
        }
        if (mode === 'fullscreenOff') {
            touchPosBtnFullscreenOff();
        }
    }   
}

/**
 * Adjusts the position of the touch control button when fullscreen off.
 */
function touchPosBtnFullscreenOff() {
    const screenSizeButton = document.getElementById('control-panel');
    screenSizeButton.style.right = '10px';
}

/**
 * Adjusts the position of the touch control button when fullscreen on.
 */
function touchPosBtnFullscreenOn() {
    const canvas = document.getElementById('canvas');
    const currentHeight = screen.height;
    const aspectRatio = 3 / 2;
    const newWidth = currentHeight * aspectRatio;
    canvas.style.width = `${newWidth}px`;
    calcPosBtnTouchMaxScreen(newWidth);
}

/**
 * Calculates and sets the new position of the touch control button
 * @param {number} canvasWidth - The current width of the canvas in pixels. 
 */
function calcPosBtnTouchMaxScreen(canvasWidth) { 
    const screenSizeButton = document.getElementById('control-panel');
    let widthOutsideCanvas = (screen.width - canvasWidth) / 2;
    let factorScreenSizeBtn = canvasWidth * 0.01;
    screenSizeButton.style.right = `${widthOutsideCanvas + factorScreenSizeBtn}px`;
}

/**
 * Requests fullscreen mode for a given element.
 * Supports multiple browser implementations.
 * 
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode if active.
 * Supports multiple browser implementations.
 */
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
    document.addEventListener('fullscreenchange', updateButtons); //Fullscreen-Change
    window.addEventListener('resize', updateButtons);//Wenn Fenstergröße dynamisch geändert wird
}

/**
 * Adjusts button layout and styles based on screen size mode and canvas dimensions.
 * 
 * @param {string} screenSize - Either 'maxScreen' or 'minScreen'.
 */
function setButtonsDependentScreenSize(screenSize) {
    const canvas = document.getElementById('canvas');
    const screenSizeButton = document.getElementById('control-panel');
    const menuButtons = document.getElementById('buttons');
    const canvasWidth = canvas.scrollWidth;
    const canvasHeight = canvas.scrollHeight;    
    stylePositionButtons(screenSize, canvasHeight, screenSizeButton, menuButtons);
    styleButtonsScreenMax(canvasWidth, screenSizeButton);
}

/**
 * Applies positioning styles depending on the screen mode.
 * @param {string} screenSize String with information about the active screen size.
 * @param {number} canvasHeight Height of the canvas.
 * @param {HTMLElement} screenSizeButton The button of the screen size icon.
 * @param {HTMLElement} menuButtons The container of the menu buttons.
 */
function stylePositionButtons(screenSize, canvasHeight, screenSizeButton, menuButtons) {
    if (screenSize == 'maxScreen') {
        calcPositionBtnMaxScreen(canvasHeight, screenSizeButton, menuButtons);
    }
    if (screenSize == 'minScreen') {
        calcPositionBtnMinScreen(menuButtons, screenSizeButton);
    }
}

/**
 * Positions buttons when in minimized mode.
 * @param {HTMLElement} menuButtons The container of the menu buttons. 
 * @param {HTMLElement} screenSizeButton The button of the screen size icon.
 */
function calcPositionBtnMinScreen(menuButtons, screenSizeButton) {
    menuButtons.style.top = '10%';
    screenSizeButton.style.bottom = '10px';
}

/**
 * Dynamically positions buttons when in fullscreen mode.
 * @param {number} canvasHeight Height of the canvas. 
 * @param {HTMLElement} screenSizeButton The button of the screen size icon. 
 * @param {HTMLElement} menuButtons The container of the menu buttons. 
 */
function calcPositionBtnMaxScreen(canvasHeight, screenSizeButton, menuButtons) {
    let heightOutsideCanvas = (screen.height - canvasHeight) / 2;
    let factorScreenSizeBtn = canvasHeight * 0.01;
    let factorMenuBtn = canvasHeight * 0.1;
    screenSizeButton.style.bottom = `${heightOutsideCanvas + factorScreenSizeBtn}px`;
    menuButtons.style.top = `${heightOutsideCanvas + factorMenuBtn}px`;
    if (parseFloat(menuButtons.style.top) <= 90){
        menuButtons.style.top = '10%'
    };
    if (parseFloat(screenSizeButton.style.bottom) <= 10){
        screenSizeButton.style.bottom = '10px'
    }    
}

/**
 * Applies or removes fullscreen button styles depending on canvas width.
 * @param {number} canvasHeight Height of the canvas.  
 */
function styleButtonsScreenMax(canvasWidth) {
    const buttons = document.querySelectorAll('#buttons .button');
    const soundVolumeButton = document.getElementById('sound-volume')
    const screenSizeButton = document.getElementById('min-max-screens')
    if (canvasWidth >= 1000) {
        styleBtnMax(screenSizeButton, soundVolumeButton, buttons);
    } else {
        styleBtnMin(screenSizeButton, soundVolumeButton, buttons);
    }
}

/**
 * Removes fullscreen-classes of all buttons.
 * @param {HTMLElement} screenSizeButton The button of the screen size icon.
 * @param {HTMLElement} soundVolumeButton The button of the volume icon.
 * @param {HTMLElement*} buttons The buttons of the menu icons.
 */
function styleBtnMin(screenSizeButton, soundVolumeButton, buttons) {
    screenSizeButton.classList.remove('fullscreen-min-max-screens');
    soundVolumeButton.classList.remove('fullscreen-sound-volume');
    buttons.forEach((btn) => {
        btn.classList.remove('fullscreen-button');
    });
}

/**
 * Add fullscreen-classes to buttons.
 * @param {HTMLElement} screenSizeButton The button of the screen size icon.
 * @param {HTMLElement} soundVolumeButton The button of the volume icon.
 * @param {HTMLElement*} buttons The buttons of the menu icons.
 */
function styleBtnMax(screenSizeButton, soundVolumeButton, buttons) {
    screenSizeButton.classList.add('fullscreen-min-max-screens');
    soundVolumeButton.classList.add('fullscreen-sound-volume');
    buttons.forEach((btn) => {
        btn.classList.add('fullscreen-button');
    });
}

/**
 * Toggles the nav menu under the hamburger menu.
 */
function openNavMenu() {
  const menuIcon = document.getElementById("hamburger-menu");
  if (menuIcon.style.display === "block") {
    menuIcon.style.display = "none";
  } else {
    menuIcon.style.display = "block";
  }
}