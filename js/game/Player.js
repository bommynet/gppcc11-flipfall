//#############################################################################
//### Entity: Player
//#############################################################################
function Player() {
    Phaser.Sprite.call(this, game, 0, 0, 'player', 0);
    
    this.radius = CFG.PLAYER.radius;
    this.anchor.setTo(0.5, 0.5);
    
    // add(identifier, [frames], fps, loop, framesNamedByNumbers)
    this.animations.add('down', [0,1,2,3], 15, true, true);
    
    game.add.existing(this);
    this.animations.play('down');
}

// inherits from Phaser.Sprite
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.moveBy = function(pixels) {
    this.x += pixels;
}

Player.prototype.resetTo = function(x, y) {
    this.x = x;
    this.y = y;
}

Player.prototype.update = function() {
    
}