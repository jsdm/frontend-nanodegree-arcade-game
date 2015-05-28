// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Placement
    this.x = -98;
    this.y = 310;
    this.speed = 130;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt;
    if(this.x > 503) this.x = -98;
    if(this.x < -98) this.x = 503;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var EnemyFast = function() {
    //call prototype properties from Enemy
    Enemy.call(this);

    this.sprite = 'images/enemy-bug.png'

    this.x = -98;
    this.y = 227;
    this.speed = 300;
}
// set EnemyFast prototype as a subclass of Enemy
EnemyFast.prototype = Object.create(Enemy.prototype);
// set EnemyFast constructor
EnemyFast.prototype.constructor = EnemyFast;

var EnemyBack = function() {

    Enemy.call(this);
    this.sprite = 'images/enemy-bug-back.png';

    this.x = 503;
    this.y = 144;
    this.speed = -200;
}
// set EnemyBack prototype as a subclass of Enemy
EnemyBack.prototype = Object.create(Enemy.prototype);
// set EnemyBack constructor
EnemyBack.prototype.constructor = EnemyBack;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    //placement
    this.x = 100;
    this.y = 475;
}
Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if(this.x>0) this.x -= 100;
            break;

        case 'up':
            if(this.y>0) this.y -= 83;
            break;

        case 'right':
            if(this.x<350) this.x += 100;
            break;

        case 'down':
            if(this.y<475) this.y += 83;
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
 new Enemy(),
 new EnemyFast(),
 new EnemyBack()
];
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
