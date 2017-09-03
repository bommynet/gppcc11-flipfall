//#############################################################################
//### Entity: Bumper
//#############################################################################
function Bumper() {
    Phaser.Sprite.call(this, game, 0, 0, 'bumper', 0);
    
    this.isDead = false;
    this.anchor.setTo(0.5, 0.5);
    this.radius = this.width / 2;
    
    game.add.existing(this);
}

// inherits from Phaser.Sprite
Bumper.prototype = Object.create(Phaser.Sprite.prototype);
Bumper.prototype.constructor = Bumper;

Bumper.prototype.resetTo = function(x, y) {
    this.x = x;
    this.y = y;
}

Bumper.prototype.moveBy = function(pixels) {
    this.y += pixels;
    
    if(this.y < CFG.HEIGHT * -4)
        this.isDead = true;
}