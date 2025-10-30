class Keyboard {
    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;    
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor () {
        this.btnLeft = document.getElementById('walk-left');
        this.btnRight = document.getElementById('walk-right');
        this.btnJump = document.getElementById('jump');
        this.btnThrow = document.getElementById('throw');
        this.btnStart = document.getElementById('bt-start-game');
        this.addControllingEventListeners(); 
    }

    /**
     * Initializes all control-related event listeners for keyboard and touch input.
     */
    addControllingEventListeners() {
        this.keyupEventListener();
        this.keydownEventListener();
        this.touchstartEventListener();
        this.touchendEventListener();
    }

    /**
     * Handles keyboard keyup events for movement and actions.
     */
    keyupEventListener() {
        window.addEventListener('keyup', (event) => {
            if (event.code == "KeyA" || event.code == "ArrowLeft") this.LEFT = false;
            if (event.code == "KeyD" || event.code == "ArrowRight") this.RIGHT = false;
            if (event.code == "KeyS" || event.code == "ArrowDown") this.DOWN = false;
            if (event.code == "KeyW" || event.code == "ArrowUp") this.UP = false;
            if (event.code == "Space") this.SPACE = false;
            if (event.code == "KeyE") this.THROW = false;
        });
    }

    /**
     * Handles keyboard keydown events to stop movement or actions.
     */
    keydownEventListener() {
        window.addEventListener('keydown', (event) => {
            if (event.code == "KeyA" || event.code == "ArrowLeft") this.LEFT = true;
            if (event.code == "KeyD" || event.code == "ArrowRight") this.RIGHT = true;
            if (event.code == "KeyS" || event.code == "ArrowDown") this.DOWN = true;
            if (event.code == "KeyW" || event.code == "ArrowUp") this.UP = true;
            if (event.code == "Space") this.SPACE = true;
            if (event.code == "KeyE") this.THROW = true;
        });
    }

    /**
     * Adds touchstart event listeners to control movement and actions on mobile devices.
     */
    touchendEventListener() {
        this.btnLeft.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        this.btnRight.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        this.btnJump.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.SPACE = false;
        });
        this.btnThrow.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.THROW = false;
        });
    }

    /**
     * Adds touchend event listeners to control movement and actions on mobile devices.
     */
    touchstartEventListener() {
        this.btnLeft.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        this.btnRight.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });
        this.btnJump.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.SPACE = true;
        });
        this.btnThrow.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.THROW = true;
        });
    }
}

