// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    //holds the collison area of each enemy to be used in player.update function
    this.collision_area = {
        width: 80,
        height: 40,
        offsetX: 10
    }
    this.resetPostion();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.posX += (this.speed * dt);
    if (this.posX > 800) {
        this.resetPostion();
    }
};

/*
 * @description 
 *      - used when game starts and when enemy get out of the screen
 *      - resets speed to a random value
 *      - resets X postion on the left of the screen
 *      - resets Y postion to a random row
 */
Enemy.prototype.resetPostion = function() {
    this.speed = Math.ceil(Math.random() * 10) * 20;
    this.posX = -300;
    this.posY = Math.floor(Math.random() * 3) + 2;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get(this.sprite), this.posX, y);
};

//Player object has 3 lives and is set at the center bottom of the screen
var Player = function() {
    this.lives = 3;
    this.posX = 2;
    this.posY = 6;
    //holds the collison area of the player to be used in player.update function
    this.collision_area = {
        width: 60,
        height: 40,
        offsetX: 20
    }
};

/*
 * @description 
 *      - get the collision area of the player and each enemy
 *      - loops on the enemies and check if collision happened between player and enemy 
 *      - if there is collision calls player.lose function
 * @param {number} dt - a time delta between ticks
 */
Player.prototype.update = function(dt) {
    var enemy,
        playerX = (this.posX * 101) + this.collision_area.offsetX,
        enemyX;
    for (let i = 0; i < allEnemies.length; i++) {
        enemy = allEnemies[i];
        enemyX = enemy.posX + enemy.collision_area.offsetX;
        if (this.posY == enemy.posY && ((playerX > enemyX && playerX < enemyX + enemy.collision_area.width) || (playerX < enemyX && playerX + this.collision_area.width > enemyX))) {
            this.lose();
            break;
        }
    }
}

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    var x = this.posX * 101;
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get('images/' + selected_char + '.png'), x, y);

    // Draw number of lives left for player
    for (let j = 0; j < this.lives; j++) {
        ctx.drawImage(Resources.get('images/Heart.png'), 450 - (j * 50), 40, 50, 85);
    }
}

/*
 * @description 
 *      - invoked when any keyboard key is pressed down
 *      - if one of the arrows is pressed, moves the player
 * @param {string} key - name of key pressed
 */
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.posX > 0) this.posX--;
            break;

        case "right":
            if (this.posX < 4) this.posX++;
            break;

        case "up":
            if (this.posY > 1) this.posY--;
            break;

        case "down":
            if (this.posY < 6) this.posY++;
            break;
    }
    console.log(this.posY);
}

/*
 * @description 
 *      - used when the user wants to play again to reset postion and lives of the player
 */
Player.prototype.reset = function() {
    this.posX = 2;
    this.posY = 6;
    this.lives = 3;
}

/*
 * @description 
 *      - called when player hits enemy
 *      - resets player position
 *      - decrement lives left
 */
Player.prototype.lose = function() {
    console.log("hit");
    this.posX = 2;
    this.posY = 6;
    this.lives--;
}


// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});