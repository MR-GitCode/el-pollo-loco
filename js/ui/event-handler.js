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
    addFullscreenListener();
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
 * Adds an event listener to handle changes in fullscreen mode.
 */
function addFullscreenListener() {
    document.addEventListener("fullscreenchange", () => {
        const maxScreen = document.getElementById('maximize-screen');
        const minScreen = document.getElementById('minimize-screen');
        if (document.fullscreenElement) {
            touchDisplayFullscreenHandler('fullscreenOn');
            maxScreen.style.display = 'none';
            minScreen.style.display = 'block';
        } else {
            touchDisplayFullscreenHandler('fullscreenOff');
            maxScreen.style.display = 'block';
            minScreen.style.display = 'none';
        }
    });
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
    changeScreenSize.addEventListener(inputEvent, async (e) => {
        if (e.cancelable) e.preventDefault();
        const screen = document.getElementById('screen');
        if (!document.fullscreenElement) {
            enterFullscreen(screen)
        } else {
            exitFullscreen()
        }
    });
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