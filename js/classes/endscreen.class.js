class Endscreen extends DrawableObject {   
    IMAGES_GAMEOVER = [
        'img/9_intro_outro_screens/game_over/game_over1.png',
        'img/9_intro_outro_screens/game_over/game_over2.png',
        'img/9_intro_outro_screens/game_over/oh_no_you_lost.png',
        'img/9_intro_outro_screens/game_over/you_lost.png',
    ]

    IMAGES_WINNING = [
        'img/You won, you lost/You_win_C.png',
        'img/You won, you lost/You_won_C.png',
    ]

    constructor () {
        super();
        this.loadImages(this.IMAGES_GAMEOVER);
        this.loadImages(this.IMAGES_WINNING);
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Displays a random "game over" image and shows end screen buttons.
     */
    lostGame() {
        let randomIndex = Math.floor(Math.random() * 4);        
        let img = this.IMAGES_GAMEOVER[randomIndex];
        this.drawImage(img);
        this.showButtons();
    }

    /**
     * Displays a random "win" image and shows end screen buttons.
     */
    winGame() {
        let randomIndex = Math.floor(Math.random() * 2);        
        let img = this.IMAGES_WINNING[randomIndex];
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