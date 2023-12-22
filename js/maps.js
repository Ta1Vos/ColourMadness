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
Add "g" to a number to turn it into a glitched tile.
*/

// Button & Door template: [type, location X in array, location Y in array, triggered(true/false)]

const emptyMap = {
    level: -1,
    tiles: [
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
        ['00', '00', '00', '00', '00', '00', '00', '00'],
    ],
    camera: {
        follow: false,
        zoom: 1
    },
    player: {
        x: 0,
        y: 0
    },
    finish: {
        x: 0,
        y: 0
    },
    buttons: [
        //Input buttons!
        {
            key: 0,
            type: 1,
            timer: 0,
            triggered: false,
            x: 5,
            y: 0
        }
    ],
    doors: [
        //Input doors!
        {
            key: 0,
            type: 2,
            move: 'right',
            x: 0,
            y: 3
        }
    ],
    switches: [
        //Input switches!
        {
            key: 1,
            type: 1,
            timer: 0,
            triggered: false,
            x: 3,
            y: 1
        }
    ]
};

const maps = [
    {
        level: 0,
        tiles: [
            ['03', '01', '01', '01', '01', '04']
        ],
        camera: {
            follow: true,
            zoom: 1
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 5,
            y: 0
        }
    },
    {
        level: 1,
        tiles: [
            ['03', '01', '01', '05', '01', '05', '01', '04'],
            ['00', '14', '00', '02', '00', '15', '00', '00'],
            ['00', '02', '00', '02', '00', '00', '00', '00'],
            ['00', '02', '00', '02', '00', '00', '00', '00'],
            ['00', '10', '01', '12', '00', '00', '00', '00'],
        ],
        camera: {
            follow: false,
            zoom: 1
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 5,
            y: 1
        }
    },
    {
        level: 2,
        tiles: [
            ['14', '00', '00', '00', '00', '14', '00', '00'],
            ['08', '01', '01', '13', '00', '02', '00', '00'],
            ['02', '00', '00', '10', '01', '07', '00', '00'],
            ['02', '00', '00', '00', '00', '02', '00', '00'],
            ['10', '01', '04', '00', '00', 'g15', '00', '00'],
        ],
        camera: {
            follow: false,
            zoom: 1
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 2,
            y: 4
        },
        buttons: [
            {
                key: 0,
                type: 1,
                timer: 0,
                triggered: false,
                x: 5,
                y: 0
            }
        ],
        doors: [
            {
                key: 0,
                type: 2,
                move: 'right',
                x: 0,
                y: 3
            }
        ]
    },
    {
        level: 3,
        tiles: [
            ['03', '05', '01', '01', '13', '11', '01', '13'],
            ['00', '02', '00', '03', '12', '02', '14', '02'],
            ['00', '02', '00', '11', '13', '02', '02', '02'],
            ['03', '09', '01', '12', '15', '10', '12', '02'],
            ['00', '10', '01', '01', '01', '01', '01', '12'],
        ],
        camera: {
            follow: false,
            zoom: 1
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 6,
            y: 1
        },
        buttons: [
            {
                key: 0,
                type: 1,
                timer: 0,
                triggered: false,
                x: 3,
                y: 1
            },
            {
                key: 1,
                type: 2,
                timer: 7500,
                triggered: false,
                x: 4,
                y: 3
            }
        ],
        doors: [
            {
                key: 1,
                type: 2,
                move: 'right',
                x: 5,
                y: 2
            },
            {
                key: 0,
                type: 1,
                move: 'up',
                x: 2,
                y: 3
            }
        ]
    },
    {
        level: 4,
        tiles: [
            ['11', '01', '01', '04', '11', '01', '04', '14'],
            ['02', '00', '00', '00', '02', '00', '14', '02'],
            ['10', '01', '01', '01', '07', '00', '02', '02'],
            ['00', '00', '00', '00', '02', '11', '07', '02'],
            ['14', '11', '13', '00', '02', '02', '15', '10', '01', '13'],
            ['10', '12', '02', '00', '02', '08', '01', '01', '04', '02'],
            ['00', '00', '02', '00', '02', '10', '13', '11', '01', '12'],
            ['00', '00', '10', '01', '06', '01', '06', '12'],
        ],
        camera: {
            follow: true,
            zoom: 3
        },
        player: {
            x: 4,
            y: 2
        },
        finish: {
            x: 6,
            y: 0
        },
        buttons: [
            {
                key: 1,
                type: 1,
                timer: 0,
                triggered: false,
                x: 3,
                y: 0
            },
            {
                key: 0,
                type: 1,
                timer: 0,
                triggered: false,
                x: 7,
                y: 0
            },
            {
                key: 2,
                type: 2,
                timer: 4000,
                triggered: false,
                x: 0,
                y: 4
            }
        ],
        doors: [
            {
                key: 0,
                type: 2,
                move: 'right',
                x: 0,
                y: 1
            },
            {
                key: 2,
                type: 2,
                move: 'left',
                x: 4,
                y: 1
            },
            {
                key: 1,
                type: 1,
                move: 'up',
                x: 3,
                y: 7
            }
        ]
    },
    {
        level: 5,
        tiles: [
            ['03', '01', '05', '05', '01', '05', '13'],
            ['00', '00', '02', '02', '00', '02', '02'],
            ['00', '00', '02', '10', '01', '12', '02'],
            ['03', '01', '09', '01', '01', '01', '07'],
            ['00', '00', '02', '00', '00', '00', '02'],
            ['00', '00', '15', '00', '03', '01', '12'],
        ],
        camera: {
            follow: true,
            zoom: 0.85
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 0,
            y: 3
        },
        doors: [
            {
                key: 'yellow',
                type: 1,
                color: 0xffff00,
                move: 'down',
                switchTrigger: false,
                x: 4,
                y: 3
            },
            {
                key: 'cyan',
                type: 1,
                color: 0x00ffff,
                move: 'up',
                switchTrigger: false,
                x: 4,
                y: 0
            },
            {
                key: 'cyan',
                type: 2,
                color: 0x00ffff,
                move: 'left',
                switchTrigger: false,
                x: 5,
                y: 1
            },
            {
                key: 'red',
                type: 2,
                color: 0xFf0000,
                move: 'right',
                switchTrigger: false,
                x: 3,
                y: 1
            },
            {
                key: 'red',
                type: 1,
                color: 0xFf0000,
                move: 'down',
                switchTrigger: false,
                x: 1,
                y: 3
            },
        ],
        switches: [
            {
                key: 'yellow',
                type: 1,
                x: 2,
                y: 5
            },
            {
                key: 'cyan',
                type: 3,
                x: 4,
                y: 5

            },
            {
                key: 'red',
                type: 2,
                x: 4,
                y: 2

            }
        ]
    },
    {
        level: 6,
        tiles: [
            ['11', '01', '01', '13', '00', '00', '00', '00', '00', '00'],
            ['10', '04', '11', '06', '01', '01', '01', '01', '01', '05', '01', '13'],
            ['14', '00', '08', '01', '01', '05', '01', '01', '13', '02', '00', '02'],
            ['02', '00', '02', '00', '00', '02', '00', '11', '06', '12', '00', '15'],
            ['02', '00', '02', '00', '00', '02', '00', '10', '01', '04'],
            ['02', '03', '12', '14', '00', '02', '00', '14'],
            ['10', '01', '01', '06', '01', '06', '01', '06', '01', '01', '04'],
        ],
        camera: {
            follow: true,
            zoom: 1.5
        },
        player: {
            x: 10,
            y: 6
        },
        finish: {
            x: 0,
            y: 2
        },
        buttons: [
            {
                key: 0,
                type: 2,
                timer: 1500,
                triggered: false,
                x: 11,
                y: 3
            },
            {
                key: 0,
                type: 2,
                timer: 2000,
                triggered: false,
                x: 1,
                y: 1
            },
            {
                key: 1,
                type: 1,
                timer: 0,
                triggered: false,
                x: 1,
                y: 5
            },
            {
                key: 2,
                type: 1,
                timer: 0,
                triggered: false,
                x: 9,
                y: 4
            }
        ],
        doors: [
            {
                key: 'yellow',
                type: 1,
                color: 0xffff00,
                move: 'down',
                switchTrigger: false,
                x: 6,
                y: 2
            },
            {
                key: 'yellow',
                type: 2,
                color: 0xffff00,
                move: 'right',
                switchTrigger: false,
                x: 2,
                y: 4
            },
            {
                key: 'cyan',
                type: 1,
                color: 0x00ffff,
                move: 'down',
                switchTrigger: false,
                x: 4,
                y: 2
            },
            {
                key: 'cyan',
                type: 1,
                color: 0x00ffff,
                move: 'down',
                switchTrigger: false,
                x: 8,
                y: 4
            },
            {
                key: 0,
                type: 1,
                move: 'up',
                x: 5,
                y: 1
            },
            {
                key: 1,
                type: 2,
                move: 'right',
                x: 0,
                y: 4
            },
            {
                key: 2,
                type: 2,
                move: 'left',
                x: 0,
                y: 3
            }
        ],
        switches: [
            {
                key: 'yellow',
                type: 1,
                x: 7,
                y: 5
            },
            {
                key: 'cyan',
                type: 3,
                x: 3,
                y: 5

            }
        ]
    },
    {
        level: 7,
        tiles: [
            ['03', '05', '01', '01', '01', '04'],
            ['00', '02', '11', '13'],
            ['00', '02', '15', '02'],
            ['03', '06', '13', '08', '04'],
            ['00', '00', '10', '12'],
        ],
        camera: {
            follow: false,
            zoom: 1
        },
        player: {
            x: 0,
            y: 0
        },
        finish: {
            x: 5,
            y: 0
        },
        buttons: [
            {
                key: 0,
                type: 1,
                timer: 0,
                triggered: false,
                x: 2,
                y: 2
            }
        ],
        doors: [
            {
                key: 0,
                type: 1,
                move: 'up',
                x: 4,
                y: 0
            },

        ],
        special: {
            enemyTiles: {
                x: [1],
                lengthX: [3],
                y: [0],
                lengthY: [5]
            },
            enemyTimer: {
                limit: 300,
                count: 0
            }
        }
    },
    {
        level: 8,
        tiles: [
            ['11', '01', '05', '05', '13', '14'],
            ['02', '11', '12', '02', '15', '02'],
            ['02', '02', '11', '12', '01', '00', '04', '01', '01', '04', '01', '04', '01', '04'],
            ['02', '02', '02', '11', '01', '12'],
            ['15', '15', '10', '12']
        ],
        camera: {
            follow: true,
            zoom: 1.75
        },
        player: {
            x: 13,
            y: 2
        },
        finish: {
            x: 5,
            y: 0
        },
        buttons: [
            {
                key: 0,
                type: 1,
                timer: 0,
                triggered: false,
                x: 1,
                y: 4
            }
        ],
        doors: [
            {
                key: 0,
                type: 1,
                move: 'down',
                x: 4,
                y: 3
            },
            {
                key: 'cyan',
                type: 2,
                color: 0x00ffff,
                move: 'right',
                switchTrigger: false,
                x: 1,
                y: 3
            }
        ],
        switches: [
            {
                key: 'yellow',
                type: 1,
                x: 4,
                y: 1

            },
            {
                key: 'cyan',
                type: 3,
                x: 0,
                y: 4

            }
        ],
        special: {
            enemyTiles: {
                x: [12, 10, 7, 4, 0],
                lengthX: [1, 1, 2, 1, 1],
                y: [2, 2, 2, 2, 3],
                lengthY: [1, 1, 1, 1, 1]
            },
            enemyTimer: {
                limit: 155,
                count: 0
            }
        }
    }
];

//Gets the amount of available levels
function genMap() {
    for (key in maps) {
        console.log(key)
        if (key == cML) {
            return maps[cML];
        }
    }
}

//If the localStorage does not contain critical variables, they are added.
if (!localStorage.getItem('ClevelMdata')) {
    localStorage.setItem('ClevelMdata', 0);
    localStorage.setItem('CcurrentMdata', 0);
}

//Grabs the maximum and if the current level exceeds this it resets the save file.
if (Number(localStorage.getItem('ClevelMdata')) + 1 > maps.length) {
    localStorage.setItem('ClevelMdata', 0);
}

//Get the current requested level to load in.
const cML = Number(localStorage.getItem('CcurrentMdata'));
const num = genMap();
const currentMap = num;
