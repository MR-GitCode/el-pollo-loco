class Endscreen extends DrawableObject {   
    constructor () {
        super();
        this.loadAssets();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    loadAssets() {
        this.loadImages(ENDSCREEN_ASSETS.IMAGES.GAMEOVER);
        this.loadImages(ENDSCREEN_ASSETS.IMAGES.WINNING);
    }

    /**
     * Displays a random "game over" image and shows end screen buttons.
     */
    lostGame() {
        let randomIndex = Math.floor(Math.random() * ENDSCREEN_ASSETS.IMAGES.GAMEOVER.length);        
        let img = ENDSCREEN_ASSETS.IMAGES.GAMEOVER[randomIndex];
        this.drawImage(img);
        this.showButtons();
    }

    /**
     * Displays a random "win" image and shows end screen buttons.
     */
    winGame() {
        let randomIndex = Math.floor(Math.random() * ENDSCREEN_ASSETS.IMAGES.WINNING.length);        
        let img = ENDSCREEN_ASSETS.IMAGES.WINNING[randomIndex];
        this.drawImage(img);
        this.showButtons();
    }

    /**
     * Updates button visibility and layout for the end screen.
     */
    showButtons() {
        const btGame = document.getElementById('buttons');
        const btStartGame= document.getElementById('bt-start-game');
        const btHome = document.getElementById('bt-home');
        const btControl = document.getElementById('bt-controls');
        btGame.classList.add('buttons-endscreen');
        btStartGame.innerHTML = 'Replay';     
        btHome.style.display = 'flex'
        btControl.style.display = 'none';
    }

    /**
     * Draws the given end screen image and stops the game loop.
     * @param {string} imagePath - The image path to display.
     */
    drawImage(imagePath) {
        const ctx = this.ctx;
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            stopGame();
            world.gameOver = true;
            ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }
}