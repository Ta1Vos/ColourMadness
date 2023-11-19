let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let game = new Phaser.Game(config);

//Array for the placement of the title
const upperRow = ['title-C', 'title-O', 'title-L', 'title-O', 'title-U', 'title-R'];
const lowerRow = ['title-M', 'title-A', 'title-D', 'title-N', 'title-E', 'title-S', 'title-S'];

let upperRowObjects;
let lowerRowObjects;
let playButton;

//Sends you to the game
function startGame() {
    //Directs player to the newest level
    localStorage.setItem('CcurrentMdata', localStorage.getItem('ClevelMdata'));
    window.location = `game.html`;
}

//Sends you to the level menu
function sendToLevelMenu() {
    window.location = `levelmenu.html`;
}

function preload() {
    this.load.image('title-C', 'assets/title/title-C.png');
    this.load.image('title-O', 'assets/title/title-O.png');
    this.load.image('title-L', 'assets/title/title-L.png');
    this.load.image('title-U', 'assets/title/title-U.png');
    this.load.image('title-R', 'assets/title/title-R.png');
    this.load.image('title-M', 'assets/title/title-M.png');
    this.load.image('title-A', 'assets/title/title-A.png');
    this.load.image('title-D', 'assets/title/title-D.png');
    this.load.image('title-N', 'assets/title/title-N.png');
    this.load.image('title-E', 'assets/title/title-E.png');
    this.load.image('title-S', 'assets/title/title-S.png');

    this.load.image('play-button', 'assets/title/play-button.png');
    this.load.image('levels-button', 'assets/title/levels-button.png');
}

function create() {
    upperRowObjects = this.physics.add.staticGroup();
    lowerRowObjects = this.physics.add.staticGroup();

    //Places everything in the upper row
    upperRow.forEach(function (element, i) {
        const pX = i * 100 + 200;
        const pY = 75;

        upperRowObjects.create(pX, pY, upperRow[i]).setScale(0.75);
    });

    //Places everything in the lower row
    lowerRow.forEach(function (element, i) {
        const pX = i * 100 + 160;
        const pY = 200;

        lowerRowObjects.create(pX, pY, lowerRow[i]).setScale(0.75);
    });

    //Add a play button and assign the functions.
    playButton = this.add.image(480, 375, 'play-button').setScale(1.5);

    playButton.setInteractive();
    playButton.on('pointerdown', startGame);

    playButton = this.add.image(500, 500, 'levels-button').setScale(1.25);

    playButton.setInteractive();
    playButton.on('pointerdown', sendToLevelMenu);
}