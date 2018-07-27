// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.posX = 50;
    this.posY = Math.floor(Math.random() * 3) + 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get(this.sprite), this.posX, y);
};

// Now write your own player class
var Player = function() {
    this.posX = 2;
    this.posY = 6;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/' + selected_char + '.png';
    //console.log(this.sprite);
};

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    var x = this.posX * 101;
    var y = (this.posY * 83) - 120;
    ctx.drawImage(Resources.get('images/' + selected_char + '.png'), x, y);
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

    }
    // This class requires an update(), render() and
    // a handleInput() method.


// Now instantiate your objects.
var enemy = new Enemy();
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy];
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