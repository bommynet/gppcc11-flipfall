//#############################################################################
//### Entity: Bumper
//#############################################################################
function Bumper() {
    Phaser.Sprite.call(this, game, 0, 0, 'bumper', 0);
    
    this.vel = new Phaser.Point();
    this.acc = new Phaser.Point();
    
    game.add.existing(this);
}

// inherits from Phaser.Sprite
Bumper.prototype = Object.create(Phaser.Sprite.prototype);
Bumper.prototype.constructor = Bumper;

Bumper.prototype.applyForce = function(x, y) {
    this.acc.add(x, y);
}

Bumper.prototype.resetTo = function(x, y) {
    this.acc.setTo(0, 0);
    this.vel.setTo(0, 0);
    this.x = x;
    this.y = y;
}

Bumper.prototype.setVelocity = function(x, y) {
    this.vel.setTo(x, y);
}

Bumper.prototype.update = function() {
    // add acceleration
    this.vel.add(this.acc.x, this.acc.y);
    
    // update position
    this.x += this.vel.x * deltaTime;
    this.y += this.vel.y * deltaTime;
    
    // reset acceleration
    this.acc.setTo(0, 0);
}