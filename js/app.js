var life = 3;
var score = 0;
var gameOn = true;
//Global randomNumber generator to use in the rest of the progra
function randomNumber(min, max){
    return Math.round( Math.random() * (max - min) + min);
}
//steps to place enemies at
var enemyY = [60, 143, 226, 309];
//place steps at random in a new array
var randEnemyArraY = [];
function randEnemyY(){
    while(enemyY !=0) {
        var randyY = randomNumber(0, enemyY.length-1);
        var rand = enemyY[randyY];
        enemyY.splice(randyY,1);
        randEnemyArraY.push(rand);
    }
}
randEnemyY();

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Placement
    this.x = -98;
    this.y = randEnemyArraY[0];
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt;
    //If Enemy is not visible on canvas, reset the initial x-value
    if(this.x > 503) this.x = -98;
    if(this.x < -98) this.x = 503;
    //Collision detection
    if(this.y-80 < player.y && this.y+80 > player.y) {
        if(this.x-70 < player.x && this.x+70 > player.x) {
            playerDead();
        };
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var EnemyFast = function() {
    //call prototype properties from Enemy
    Enemy.call(this);

    this.sprite = 'images/enemy-bug.png';

    this.x = -98;
    this.y = randEnemyArraY[1];
    this.speed = 300;
};
// set EnemyFast prototype as a subclass of Enemy
EnemyFast.prototype = Object.create(Enemy.prototype);
// set EnemyFast constructor
EnemyFast.prototype.constructor = EnemyFast;

var EnemyBack = function() {

    Enemy.call(this);
    this.sprite = 'images/enemy-bug-back.png';

    this.x = 503;
    this.y = randEnemyArraY[2];
    this.speed = -200;
};
// set EnemyBack prototype as a subclass of Enemy
EnemyBack.prototype = Object.create(Enemy.prototype);
// set EnemyBack constructor
EnemyBack.prototype.constructor = EnemyBack;

var EnemyFastest = function() {
    //call prototype properties from Enemy
    Enemy.call(this);

    this.sprite = 'images/enemy-bug.png';

    this.x = -98;
    this.y = randEnemyArraY[3];
    this.speed = 200;
};
// set EnemyFast prototype as a subclass of Enemy
EnemyFastest.prototype = Object.create(Enemy.prototype);
// set EnemyFast constructor
EnemyFastest.prototype.constructor = EnemyFastest;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    //placement
    this.x = 200;
    this.y = 475;
    // this.speed = 400;
    this.alive = true;
};
Player.prototype.update = function(dt) {
// this.x += this.speed *dt;
if(player.y <= 50){
    reachWater();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if(this.x>0 && gameOn) this.x-=100;
            break;

        case 'up':
            if(this.y>0 && gameOn) this.y -= 83;
            break;

        case 'right':
            if(this.x<350 && gameOn) this.x += 100;
            break;

        case 'down':
            if(this.y<475 && gameOn) this.y += 83;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
new Enemy(),
new EnemyFast(),
new EnemyBack(),
new EnemyFastest()
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
//player start position
function resetPlayerPosition(){
    player.x = 200;
    player.y = 475;
}
//Reset player position and subtract a life when player touches enemies
function playerDead(){
    if(life<0) {gameOver();}
    resetPlayerPosition();
    screenLife(life);
    life--
}
//replace player and add point when player reaches water
function reachWater(){
    resetPlayerPosition();
    score++
    screenScore(score);
}
//Reset game when lives reaches 0
function gameOver() {
    allEnemies.length = 0;
    life=3;
    gameOn = false;
}
function gameReset() {
    enemyY = [60, 143, 226, 309];
    randEnemyArraY.length = 0;
    randEnemyY();
    allEnemies = [
    new Enemy(),
    new EnemyFast(),
    new EnemyBack(),
    new EnemyFastest()
    ];
    resetPlayerPosition();
    gameOn = true;
    life = 3;
    score = 0;
    screenLife(life);
    screenScore(score);
}
// document.getElementById("reset").onclick = gameReset();
function screenLife(life){
    var element = document.getElementById("lives");
    element.innerHTML = "Lives: "+life;
}
function screenScore(score) {
    var element = document.getElementById("score");
    element.innerHTML = "Score: "+score;
}