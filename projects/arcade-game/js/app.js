// Global increment values to know the height and width of each row and the num of rows.

var yIncrement = 83;
var xIncrement = 101;
var numRows = 6;
var numCols = 5;
var yOffset = Math.floor(yIncrement / 2);
var xOffset = Math.floor(xIncrement / 2);
// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 50;
    this.height = 50;

    // Reset the enemy position to be a random value before the start of the canvas.
    this.reset = function () {
        this.x = -Math.floor(Math.random() * xIncrement * 10) - xIncrement;
        this.y = Math.floor((Math.random() * 3) + 1) * yIncrement - yOffset;
        this.speed = Math.floor(Math.random() * 400) + 100;
    };

    // Reset position on instance
    this.reset();    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= numCols * xIncrement){
        // Reset position of enemy when it goes off the screen
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-princess-girl.png';
    this.width = 50;
    this.height = 50;
    
    // Reset the position of the player
    this.reset = function () {
        this.x = xIncrement * 2;
        this.y = yIncrement * 4 + yOffset;
    };

    // Reset position on first load
    this.reset();  

    this.update = function () {
        // Check if player has an invalid x or y position, then set it back to valid
        if (this.x >= numCols * xIncrement) {
            this.x -= xIncrement;
        }
        if (this.x < 0) {
            this.x += xIncrement;
        }
        if (this.y >= (numRows - 1) * yIncrement) {
            this.y -= yIncrement;
        }
        if (this.y < 0) {
            this.reset();
        }
        this.render();
    };

    // Change X and Y based on the input direction
    this.handleInput = function (direction) {
        switch (direction) {
            case 'left':
                this.x -= xIncrement;
                break;
            case 'up':
                this.y -= yIncrement;
                break;
            case 'right':
                this.x += xIncrement;
                break;
            case 'down':
                this.y += yIncrement;
                break;
        }
        this.update();
    };
    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
      
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 10; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});