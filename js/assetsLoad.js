//THIS JAVASCRIPT LOADS IN ALL THE REQUIRED VARIABLES FOR THE GAME! THIS IS NECESSARY!
//Player variables
let player;
let playerMoving = "down";
let playerIsDead = false;
let blockStop = false;
let reverseTimeout = false;
let blockDirections = {
    left: false,
    right: false,
    up: false,
    down: false
};
let cursors;

//Tiles
let tileHorizontal;
let tileVertical;

let tileLeftStop;
let tileRightStop;
let tileUpStop;
let tileDownStop;

let tile1x1Up;
let tile1x1Down;
let tile1x1Right;
let tile1x1Left;
let tile1x1;

let cornerUpRight;
let cornerDownRight;
let cornerUpLeft;
let cornerDownLeft;

let enemyTiles;
let enemyTilesActive = false;

//Interactables
let buttons;
let doors = [];
let switches;
let switchState = `none`;

//Finish settings
let levelFinish;
const levelScale = 1;

/* 
List of types of tiles:
0 = nothing
1 = horizontal
2 = vertical
3 = left stop
4 = right stop
5 = T split down left right
6 = T split left right up
7 = T split up down left
8 = T split up down right
9 = Every direction
10 = Corner up right
11 = Corner down right
12 = Corner up left
13 = Corner down left
14 = Upper stop
15 = Down stop
*/

//Asset array for the tiles
const pathArray = ["", "tile_horizontal", "tile_vertical", "tile_left_stop", "tile_right_stop",
    "tile_1x1", "tile_1x1", "tile_1x1", "tile_1x1", "tile_1x1", "tile_corner_right", "tile_corner_right", "tile_corner_left", "tile_corner_left", "tile_up_stop", "tile_down_stop"];

//Asset array for the buttons
const buttonArray = ["", "interaction_any", "interaction_any"];

//Asset array for the doors
const doorArray = ["", "door_horizontal", "door_vertical"];

//Asset array for the switches
const switchArray = ["", "switch_any"];

const enemyArray = ["", "interaction_any"];