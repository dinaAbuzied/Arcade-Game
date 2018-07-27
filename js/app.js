// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
    this.posX += this.speed;
    if (this.posX > 800) {
        this.resetPostion();
    }
};

Enemy.prototype.resetPostion = function() {
    this.speed = Math.ceil(Math.random() * 5);
    this.posX = -300;
    this.posY = Math.floor(Math.random() * 3) + 2;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get(this.sprite), this.posX, y);
};

var Player = function() {
    this.lives = 3;
    this.posX = 2;
    this.posY = 6;
    this.collision_area = {
        width: 60,
        height: 40,
        offsetX: 20
    }
};

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

Player.prototype.render = function() {
    var x = this.posX * 101;
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get('images/' + selected_char + '.png'), x, y);

    for (let j = 0; j < this.lives; j++) {
        ctx.drawImage(Resources.get('images/Heart.png'), 450 - (j * 50), 40, 50, 85);
    }
}

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

Player.prototype.reset = function() {
    this.posX = 2;
    this.posY = 6;
    this.lives = 3;
}

Player.prototype.lose = function() {
        console.log("hit");
        this.posX = 2;
        this.posY = 6;
        this.lives--;
    }
    // This class requires an update(), render() and
    // a handleInput() method.


// Now instantiate your objects.

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