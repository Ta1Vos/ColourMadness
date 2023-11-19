// ----
// PLAYER MOVEMENT
// ----

//Checks if the player is on the grid and close enough to a grid connection to stop.
function requestStopSprite() {
    // Checks if the player is moving, if stopping isn't blocked AND if the player is close enough to the center of the closest tile to be stopped
    if (playerMoving != "idle" && blockStop == false) {
        if (player.y % 80 >= 47 && player.y % 80 <= 53 && player.x % 80 >= 47 && player.x % 80 <= 53) {
            stopSprite();
        }
    }
}

//Stop the sprite and set its state to idle.
function stopSprite() {
    player.setVelocityX(0);
    player.setVelocityY(0);
    centerSprite();

    playerMoving = "idle";
    blockStop = true;
}

//Prevent the player in moving into the given directions
function allDirections(up, down, right, left) {
    if (playerMoving != "idle") {
        blockDirections.left = left;
        blockDirections.up = up;
        blockDirections.down = down;
        blockDirections.right = right;
    }
    requestStopSprite();
}

//Place the sprite right on the grid
function centerSprite() {
    player.x = Math.round(player.x / 80) * 80 - 30;
    player.y = Math.round(player.y / 80) * 80 - 30;
}

//Reverse the movement of the player
function reversePlayer() {
    if (playerMoving == "left") {
        player.setVelocityX(350);
        playerMoving == "right"
    } else if (playerMoving == "right") {
        player.setVelocityX(-350);
        playerMoving == "left"
    } else if (playerMoving == "up") {
        player.setVelocityY(350);
        playerMoving == "down"
    } else if (playerMoving == "down") {
        player.setVelocityY(-350);
        playerMoving == "up"
    }
}

// ----
// PLAYER FUNCTIONS
// ----

// ----
// INTERACTION FUNCTIONS
// ----

//When a button is activated it will open the doors that have the same key assigned to it.
function triggerButton(player, button) {
    if (button.gameObject.triggered == false) {
        doors.forEach(function (currentDoor, i) {
            if (button.gameObject.key == currentDoor.gameObject.key) {
                if (currentDoor.gameObject.move == 'left') {
                    currentDoor.setVelocityX(-100);
                } else if (currentDoor.gameObject.move == 'right') {
                    currentDoor.setVelocityX(100);
                } else if (currentDoor.gameObject.move == 'up') {
                    currentDoor.setVelocityY(-100);
                } else if (currentDoor.gameObject.move == 'down') {
                    currentDoor.setVelocityY(100);
                }

                setTimeout(() => {
                    currentDoor.setVelocityX(0);
                    currentDoor.setVelocityY(0);

                    //Puts door back in original state if a timer is linked to the door.
                    if (button.gameObject.timer > 750) {
                        countDownTimer(button);
                        setTimeout(() => {
                            if (currentDoor.gameObject.move == 'left') {
                                currentDoor.setVelocityX(100);
                            } else if (currentDoor.gameObject.move == 'right') {
                                currentDoor.setVelocityX(-100);
                            } else if (currentDoor.gameObject.move == 'up') {
                                currentDoor.setVelocityY(100);
                            } else if (currentDoor.gameObject.move == 'down') {
                                currentDoor.setVelocityY(-100);
                            }
                            setTimeout(() => {
                                currentDoor.setVelocityX(0);
                                currentDoor.setVelocityY(0);
                                button.gameObject.triggered = false;
                            }, 750);
                        }, button.gameObject.timer);
                    }
                }, 750);
            }
        });
        button.gameObject.triggered = true;
    }
}

//If a switch state is changed, it will close non-linked doors and open linked doors
function triggerSwitch(player, buttonSwitch) {
    buttonSwitch = buttonSwitch.gameObject
    let requestedSwitchState = buttonSwitch.key;


    if (switchState == requestedSwitchState) {
        return;
    }

    switchState = requestedSwitchState;

    doors.forEach(function (currentDoor) {
        if (switchState == currentDoor.gameObject.key && currentDoor.gameObject.switchTrigger == false) {
            if (currentDoor.gameObject.move == 'left') {
                currentDoor.setVelocityX(-100);
            } else if (currentDoor.gameObject.move == 'right') {
                currentDoor.setVelocityX(100);
            } else if (currentDoor.gameObject.move == 'up') {
                currentDoor.setVelocityY(-100);
            } else if (currentDoor.gameObject.move == 'down') {
                currentDoor.setVelocityY(100);
            }
            currentDoor.gameObject.switchTrigger = true;
        } else if (switchState != currentDoor.gameObject.key && currentDoor.gameObject.switchTrigger == true) {
            if (currentDoor.gameObject.move == 'left') {
                currentDoor.setVelocityX(100);
            } else if (currentDoor.gameObject.move == 'right') {
                currentDoor.setVelocityX(-100);
            } else if (currentDoor.gameObject.move == 'up') {
                currentDoor.setVelocityY(100);
            } else if (currentDoor.gameObject.move == 'down') {
                currentDoor.setVelocityY(-100);
            }
            currentDoor.gameObject.switchTrigger = false;
        }

        setTimeout(() => {
            currentDoor.setVelocityX(0);
            currentDoor.setVelocityY(0);
        }, 750);
    });
}

//Countdown animation for the timed buttons
function countDownTimer(button) {
    const second = button.gameObject.text.text;
    button.gameObject.text.visible = true;

    //Checks if the timer has decimals, otherwise it counts regularly until it reaches 0.
    if (second % Math.floor(second) != 0 && second != 0) {
        //Gets rid of the 0.5 in the timer
        setTimeout(() => {
            button.gameObject.text.setText(Math.round((second - 0.5) * 10) / 10);
            button.gameObject.text.x = button.x - 6.25;
            countDownTimer(button);
        }, 500);
    } else if (second > 0) {
        //Center the text and count down to 0
        setTimeout(() => {
            button.gameObject.text.x = button.x - 6.25;
            button.gameObject.text.setText(Math.round(second - 1));
            countDownTimer(button);
        }, 1000);
    } else {
        setTimeout(() => {
            const timer = button.gameObject.timer / 1000;
            //Hide the text, set it back to the original state and give it the right alignment
            button.gameObject.text.visible = false;

            if (timer % Math.floor(timer) != 0) {
                button.gameObject.text.x = button.x - 6.25 * 3;
                button.gameObject.text.text = button.gameObject.timer / 1000;
            } else {
                button.gameObject.text.text = button.gameObject.timer / 1000;
            }
        }, 500);
    }
}

//Blocking function for the doors
function doorBlocking() {
    if (reverseTimeout == false) {
        reversePlayer();
        reverseTimeout = true;
        setTimeout(() => {
            reverseTimeout = false;
        }, 100);
    }
}

//Play the finish animation and send the player back to home
function endLevel() {
    playerMoving = "stop";

    player.angle += -1;
    player.scaleX += -0.01;
    player.scaleY += -0.01;

    levelFinish[0].scaleX += 0.025;
    levelFinish[0].scaleY += 0.025;
    if (player.scaleX < 0.05) {
        player.visible = false;
        levelFinish[0].scaleX += 0.15;
        levelFinish[0].scaleY += 0.15;
        if (levelFinish[0].scaleX > 23) {
            player.disableBody();

            const cML = localStorage.getItem('ClevelMdata');
            if (currentMap.level == cML) {
                localStorage.setItem('ClevelMdata', maps[cML].level + 1);
            }

            window.location = '/index.html';
        }
    }
}

function enemyTileCollision(player, enemyTile) {
    if (enemyTilesActive == true && playerIsDead == false) {
        switchState = false;
        playerIsDead = true;
    }
}

// ----
// CALCULATION FUNCTIONS
// ----

//Calculate the x and y scale
function calculateScale(pickAxis) {
    return 80 * levelScale * pickAxis + 50;
}

// ----
// REDIRECTION FUNCTIONS
// ----

//Loads the home page
function backToHome() {
    window.location = `/index.html`;
}

// ----
// UPDATE LOOP FUNCTIONS
// ----

function animationFrames() {
    //Rotation animation for the level finish
    levelFinish[0].angle += 0.25;

    //Animation for the playerdeath
    if (playerIsDead == true) {
        playerMoving = "down";
        player.setScale(player.scaleX - 0.01);
        player.angle += 1;

        if (player.scaleX < 0.8) {
            player.setScale(player.scaleX - 0.01);
            if (player.scaleX < 0.06) {
                playerIsDead = false;
                player.disableBody();
                window.location.reload();
            }
        }
    }
}

function movementDetection() {
    //Movement for the player
    // Detect if a player is standing still and if any key is pressed, then the player will move.
    if (playerMoving == "idle") {
        if (cursors.left.isDown && blockDirections.left == false) {
            player.setVelocityX(-350);
            player.setVelocityY(0);

            playerMoving = "left";

            setTimeout(() => {
                blockStop = false;
            }, 50);
        }
        else if (cursors.right.isDown && blockDirections.right == false) {
            player.setVelocityX(350);
            player.setVelocityY(0);

            playerMoving = "right";

            setTimeout(() => {
                blockStop = false;
            }, 50);
        }
        else if (cursors.up.isDown && blockDirections.up == false) {
            player.setVelocityY(-350);
            player.setVelocityX(0);

            playerMoving = "up";

            setTimeout(() => {
                blockStop = false;
            }, 50);
        } else if (cursors.down.isDown && blockDirections.down == false) {
            player.setVelocityY(350);
            player.setVelocityX(0);

            playerMoving = "down";

            setTimeout(() => {
                blockStop = false;
            }, 50);
        }
    }
}

function updateTimerCount() {
    if (enemyTiles.length > 0) {
        currentMap.special.enemyTimer.count++;
        console.log(currentMap.special.enemyTimer.count)

        //Launches events when the timer hits specific values
        if (currentMap.special.enemyTimer.count == 1) {
            for (let i = 0; i < enemyTiles.length; i++) {
                const tile = enemyTiles[i];
                tile.visible = true;
                enemyTilesActive = true;
            }
        } else if (currentMap.special.enemyTimer.count == 100) {
            for (let i = 0; i < enemyTiles.length; i++) {
                const tile = enemyTiles[i];
                tile.visible = false;
                enemyTilesActive = false;
            }
        } else if (currentMap.special.enemyTimer.limit == currentMap.special.enemyTimer.count) {
            currentMap.special.enemyTimer.count = 0;
        }

        setTimeout(() => {
            updateTimerCount();
        }, 15);
    }
}