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

let upperRowObjects;
let lowerRowObjects;
let levels;
let returnButton;

//Sends to the game and loads the right level
function handleclick(buttonNumber) {
    localStorage.setItem('CcurrentMdata', buttonNumber);
    const currentUrl = location.host;
    window.location.href = `http://${currentUrl}/ColourMadness/game.html`;
}

//Loads the home page
function backToHome() {
    const currentUrl = location.host;
    window.location.href = `http://${currentUrl}/ColourMadness/index.html`;
    return false;
}

function preload() {
    this.load.image('play-button', 'assets/title/play-button.png');
    this.load.image('return-button', 'assets/title/return-button.png');
}

function create() {
    let x = 0;
    let y = 0;
    levels = this.physics.add.staticGroup();

    //Loads all available level buttons in
    for (let i = 0; i < Number(localStorage.getItem('ClevelMdata')) + 1; i++) {
        //If the x axis is full, it starts another row.
        if (x > 6) {
            x = 0;
            y++;
        }
        x++;

        //Calculate the grid for every button
        const pX = 130 * x - 20;
        const pY = 130 * y + 100;

        const playButton = this.physics.add.sprite(pX, pY, 'play-button').setScale(0.5);

        //Add text above the sprite
        const style = { font: "25px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: playButton.width, align: "center", backgroundColor: "#d3d3d3", boundsAlignH: "left" };
        playButton.text = this.add.text(pX - 35, pY - 70, `level ${i}`, style);

        //Click function for the sprite
        playButton.setInteractive();
        playButton.on('pointerdown', function() {
            handleclick(i);
        });
        levels.add(playButton);
    }

    levels = levels.getChildren();

    //Create the return button and assign a function to it.
    returnButton = this.add.image(500, 500, 'return-button').setScale(1.2);
    returnButton.setInteractive();
    returnButton.on('pointerdown', backToHome);
}