//Phaser settings
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
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload() {
    //Paths
    this.load.image('tile_horizontal', 'assets/collision/tile_horizontal.png');
    this.load.image('tile_vertical', 'assets/collision/tile_vertical.png');
    this.load.image('tile_1x1', 'assets/collision/tile_1x1.png');
    this.load.image('tile_corner_right', 'assets/collision/tile_corner_right.png');
    this.load.image('tile_corner_left', 'assets/collision/tile_corner_left.png');
    //Stops
    this.load.image('tile_left_stop', 'assets/collision/tile_left_stop.png');
    this.load.image('tile_right_stop', 'assets/collision/tile_right_stop.png');
    this.load.image('tile_up_stop', 'assets/collision/tile_up_stop.png');
    this.load.image('tile_down_stop', 'assets/collision/tile_down_stop.png');
    //Templates
    this.load.image('door_horizontal', 'assets/collision/doors/horizontal_any.png');
    this.load.image('door_vertical', 'assets/collision/doors/vertical_any.png');
    this.load.image('interaction_any', 'assets/sprites/interaction_any.png');
    this.load.image('switch_any', 'assets/sprites/switch_any.png');
    //Interactions
    this.load.image('player', 'assets/sprites/sprites_any.png');
};

function create() {
    //Loading paths
    // Non-stopping tiles
    tileHorizontal = this.physics.add.staticGroup();
    tileVertical = this.physics.add.staticGroup();
    // Hallway ends
    tileLeftStop = this.physics.add.staticGroup();
    tileRightStop = this.physics.add.staticGroup();
    tileUpStop = this.physics.add.staticGroup();
    tileDownStop = this.physics.add.staticGroup();
    // Direction defined is the only direction that is blocked
    tile1x1Up = this.physics.add.staticGroup();
    tile1x1Down = this.physics.add.staticGroup();
    tile1x1Right = this.physics.add.staticGroup();
    tile1x1Left = this.physics.add.staticGroup();
    tile1x1 = this.physics.add.staticGroup();
    // Corners
    cornerUpRight = this.physics.add.staticGroup();
    cornerDownRight = this.physics.add.staticGroup();
    cornerUpLeft = this.physics.add.staticGroup();
    cornerDownLeft = this.physics.add.staticGroup();
    //Special tiles
    enemyTiles = this.add.group();
    //Special parts
    // Finish
    finish = levelFinish = this.add.group();

    // Interactables
    buttons = this.add.group();
    doors = this.add.group();
    switches = this.add.group();

    //Map loader
    for (let i = 0; i < currentMap.tiles.length; i++) {
        const row = currentMap.tiles[i];
        for (let x = 0; x < row.length; x++) {
            const number = row[x];
            if (number != 0) {
                // p = position
                const pX = calculateScale(x);
                const pY = calculateScale(i);

                //This grabs the requested position, grabs an asset from the tile array and places them in the right location.
                switch (number) {
                    case 1:
                        tileHorizontal.create(pX, pY, pathArray[number]);
                        break;
                    case 2:
                        tileVertical.create(pX, pY, pathArray[number]);
                        break;
                    case 3:
                        tileLeftStop.create(pX, pY, pathArray[number]);
                        break;
                    case 4:
                        tileRightStop.create(pX, pY, pathArray[number]);
                        break;
                    case 5:
                        tile1x1Up.create(pX, pY, pathArray[number]);
                        break;
                    case 6:
                        tile1x1Down.create(pX, pY, pathArray[number]);
                        break;
                    case 7:
                        tile1x1Right.create(pX, pY, pathArray[number]);
                        break;
                    case 8:
                        tile1x1Left.create(pX, pY, pathArray[number]);
                        break;
                    case 9:
                        tile1x1.create(pX, pY, pathArray[number]);
                        break;
                    case 10:
                        cornerUpRight.create(pX, pY, pathArray[number]);
                        break;
                    case 11:
                        cornerDownRight.create(pX, pY, pathArray[number]);
                        break;
                    case 12:
                        cornerUpLeft.create(pX, pY, pathArray[number]);
                        break;
                    case 13:
                        cornerDownLeft.create(pX, pY, pathArray[number]);
                        break;
                    case 14:
                        tileUpStop.create(pX, pY, pathArray[number]);
                        break;
                    case 15:
                        tileDownStop.create(pX, pY, pathArray[number]);
                        break;
                }
            }
        }
    }

    // For loops rotate the corners that have to point into another direction
    for (let i = 0; i < cornerDownRight.children.entries.length; i++) {
        cornerDownRight.children.entries[i].angle = 90;
    }

    for (let i = 0; i < cornerDownLeft.children.entries.length; i++) {
        cornerDownLeft.children.entries[i].angle = 270;
    }

    //Checks if the special array is available
    if (currentMap.special) {
        //Places enemyTiles which reset the player

        if (currentMap.special.enemyTiles) {
            const tile = currentMap.special.enemyTiles;
            for (let i = 0; i < tile.x.length; i++) {
                //Looping through the Y axis and checking if the area is within the radius
                for (let y = 0; y < tile.lengthY[i]; y++) {
                    const row = currentMap.tiles[tile.y[i] + y];
                    //Safeguard, if the length of the enemytile area is larger than the map, it won't execute it.
                    if (tile.y[i] + y >= currentMap.tiles.length) {
                        break;
                    } else {
                        //Looping through the X axis and checking if the area is within the radius
                        for (let x = 0; x < tile.lengthX[i]; x++) {
                            if (tile.x[i] + x >= row.length) {
                                break;
                            } else if (row[tile.x[i] + x] != 0) {
                                //Adding an enemyTile
                                const pX = calculateScale(tile.x[i] + x);
                                const pY = calculateScale(tile.y[i] + y);

                                const sprite = this.physics.add.sprite(pX, pY, enemyArray[1]).setScale(1.3);
                                sprite.setTint(0xFf0000);
                                enemyTiles.add(sprite);
                            }
                        }
                    }
                }
            }
        }
        //Adds a function target when used in collision methods
        this.tweens.add({
            targets: enemyTiles,
            key: 'enemyTile'
        });
        //This converts the objects into arrays.
        enemyTiles = enemyTiles.getChildren();
    }

    //Button loader
    // This loops through the container of all buttons and gives them the right appearance
    if (currentMap.buttons) {
        for (let i = 0; i < currentMap.buttons.length; i++) {
            const currentButton = currentMap.buttons[i];
            const buttonType = currentButton.type;
            const pX = calculateScale(currentButton.x);
            const pY = calculateScale(currentButton.y);

            const sprite = this.physics.add.sprite(pX, pY, buttonArray[buttonType]).setScale(levelScale);

            //Assiging the map load properties to the button
            sprite.gameObject = currentButton;
            //Switching functions/colors of the button
            switch (buttonType) {
                case 1:
                    //Regular buttons
                    console.log(sprite)
                    testing = sprite;
                    sprite.setTint(0xC00000);
                    break;
                case 2:
                    //Timed buttons
                    // Load in the text
                    const style = { font: "25px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: sprite.width, align: "center", backgroundColor: "#ffa500", boundsAlignH: "left" };
                    sprite.gameObject.text = this.add.text(pX, pY - 12, sprite.gameObject.timer / 1000, style);
                    sprite.gameObject.text.visible = false;
                    //Centers the text on the x-axis
                    sprite.gameObject.text.x = sprite.gameObject.text.x - 6.25 * sprite.gameObject.text.text.length;

                    sprite.setTint(0xffa500);
                    break;
                default:
                    sprite.destroy();
                    break;
            }
            buttons.add(sprite);
        }

        //Turning the groups into objects with a key so they can be used inside functions.
        this.tweens.add({
            targets: buttons,
            key: 'button'
        });
        //This converts the objects into arrays.
        buttons = buttons.getChildren();
    }

    //Load all the switches
    if (currentMap.switches) {
        for (let i = 0; i < currentMap.switches.length; i++) {
            const currentSwitch = currentMap.switches[i];
            const switchType = currentSwitch.type;
            const pX = calculateScale(currentSwitch.x);
            const pY = calculateScale(currentSwitch.y);

            const sprite = this.physics.add.sprite(pX, pY, switchArray[1]).setScale(levelScale - 0.05);

            sprite.key = i;
            sprite.gameObject = currentSwitch;
            switch (switchType) {
                case 1:
                    //Yellow
                    sprite.setTint(0xffff00);
                    break;
                case 2:
                    //Red
                    sprite.setTint(0xFf0000);
                    break;
                case 3:
                    //Cyan
                    sprite.setTint(0x00ffff);
                    break;
                default:
                    sprite.destroy();
                    break;
            }
            switches.add(sprite);
        }

        this.tweens.add({
            targets: switches,
            key: 'buttonSwitch'
        });
        switches = switches.getChildren();
    }

    //Door loader
    if (currentMap.doors) {
        for (let i = 0; i < currentMap.doors.length; i++) {
            const currentDoor = currentMap.doors[i];
            const doorType = currentDoor.type;
            const pX = calculateScale(currentDoor.x);
            const pY = calculateScale(currentDoor.y);

            const sprite = this.physics.add.sprite(pX, pY, doorArray[doorType]).setScale(levelScale);

            sprite.key = i;
            sprite.gameObject = currentDoor;

            //If a color is defined then the door will be painted in this color
            if (currentDoor.color) {
                sprite.setTint(currentDoor.color)
            }

            doors.add(sprite);
        }

        this.tweens.add({
            targets: doors,
            key: 'door'
        });
        doors = doors.getChildren();
    }

    //Finish loader
    if (currentMap.finish) {
        const finish = currentMap.finish;
        const pX = calculateScale(finish.x);
        const pY = calculateScale(finish.y);

        const sprite = this.physics.add.sprite(pX, pY, buttonArray[1]).setScale(levelScale);
        sprite.setTint(0xbfff00);
        sprite.setScale(0.5);
        levelFinish.add(sprite);
    }

    //Transfer object-layout into an array
    levelFinish = levelFinish.getChildren();

    //Load the player in
    if (currentMap.player) {
        const pX = calculateScale(currentMap.player.x);
        const pY = calculateScale(currentMap.player.y);
        player = this.physics.add.sprite(pX, pY, 'player').setScale(levelScale);
        player.setTint(0x00bfff);
    }

    // Movement blockers (Specifying the way the player can move to), this is for every tile that has to stop the player
    // All directions
    this.physics.add.overlap(player, tile1x1, function () {
        allDirections(false, false, false, false);
    });

    // 3-direction tiles (T splits)
    this.physics.add.overlap(player, tile1x1Up, function () {
        allDirections(true, false, false, false);
    });
    this.physics.add.overlap(player, tile1x1Down, function () {
        allDirections(false, true, false, false);
    });
    this.physics.add.overlap(player, tile1x1Right, function () {
        allDirections(false, false, true, false);
    });
    this.physics.add.overlap(player, tile1x1Left, function () {
        allDirections(false, false, false, true);
    });

    // 2-direction tiles (corners)
    this.physics.add.overlap(player, cornerUpRight, function () {
        allDirections(false, true, false, true);
    });
    this.physics.add.overlap(player, cornerDownRight, function () {
        allDirections(true, false, false, true);
    });
    this.physics.add.overlap(player, cornerUpLeft, function () {
        allDirections(false, true, true, false);
    });
    this.physics.add.overlap(player, cornerDownLeft, function () {
        allDirections(true, false, true, false);
    });

    // One-way tiles
    this.physics.add.overlap(player, tileLeftStop, function () {
        allDirections(true, true, false, true);
    });
    this.physics.add.overlap(player, tileRightStop, function () {
        allDirections(true, true, true, false);
    });
    this.physics.add.overlap(player, tileUpStop, function () {
        allDirections(true, false, true, true);
    });
    this.physics.add.overlap(player, tileDownStop, function () {
        allDirections(false, true, true, true);
    });

    //Collisions inbetween the player and sprites
    // Enemy Tiles
    this.physics.add.overlap(player, enemyTiles, enemyTileCollision, null, this);
    // Buttons
    this.physics.add.overlap(player, buttons, triggerButton, null, this);
    // Buttons
    this.physics.add.overlap(player, switches, triggerSwitch, null, this);
    // Doors (block the player and reverse them)
    this.physics.add.overlap(player, doors, doorBlocking, null, this);
    // Level finish
    this.physics.add.overlap(player, levelFinish, endLevel, null, this);

    //Set the camera up with the set up level-settings
    if (currentMap.camera.follow == true) {
        this.cameras.main.startFollow(player, false, 0.05, 0.05);
        this.cameras.main.setZoom(currentMap.camera.zoom);
    }

    //Sets up keyboard
    cursors = this.input.keyboard.createCursorKeys();

    updateTimerCount();
}

function update() {
    //Checks for keyboard input from the player
    movementDetection();

    animationFrames();}