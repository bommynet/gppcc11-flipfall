//#############################################################################
//### Entity: Player
//#############################################################################
function Player() {
    Phaser.Sprite.call(this, game, 0, 0, "player", 0);
    
    this.vel = {x: 0, y:0};
    this.acc = {x: 0, y:0};
    
    game.add.existing(this);
}

// inherits from Phaser.Sprite
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.applyForce = function(x, y) {
    this.acc.x += x;
    this.acc.y += y;
}

Player.prototype.resetTo = function(x, y) {
    this.acc.x = 0;
    this.acc.y = 0;
    this.vel.x = 0;
    this.vel.y = 0;
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    // add acceleration
    this.vel.x += this.acc.x;
    this.vel.y += this.vel.y;
    
    // update position
    this.x += this.vel.x * deltaTime;
    this.y += this.vel.y * deltaTime;
    
    // reset acceleration
    this.acc.x = 0;
    this.acc.y = 0;
}