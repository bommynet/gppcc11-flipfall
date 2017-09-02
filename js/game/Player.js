//#############################################################################
//### Entity: Player
//#############################################################################
function Player() {
    Phaser.Sprite.call(this, game, 0, 0, "player", 0);
    
    this.pos = {x: 0, y:0};
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

Player.prototype.update = function() {
    // add acceleration
    this.vel.x += this.acc.x;
    this.vel.y += this.vel.y;
    
    // update position
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    
    // reset acceleration
    this.acc.x = 0;
    this.acc.y = 0;
    
    
    // update sprite position
    this.x = this.pos.x;
    this.y = this.pos.y;
}