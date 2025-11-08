/**
 * Requests fullscreen mode for a given element.
 * Supports multiple browser implementations.
 * 
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */
async function enterFullscreen(element) {
    if (element.requestFullscreen) {
        return element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {  
        return element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        return element.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if active.
 * Supports multiple browser implementations.
 */
async function exitFullscreen() {
  if(document.exitFullscreen) {
    return document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    return document.webkitExitFullscreen();
  }
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
 * Adjusts the position of the touch control button when fullscreen off.
 */
function touchPosBtnFullscreenOff() {
    const screenSizeButton = document.getElementById('control-panel');
    screenSizeButton.style.right = '10px';
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
        menuButtons.style.top = '10%';
    };
    if (parseFloat(screenSizeButton.style.bottom) <= 10){
        screenSizeButton.style.bottom = '10px';
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