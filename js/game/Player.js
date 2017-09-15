//#############################################################################
//### Entity: Player
//#############################################################################
function Player() {
    Phaser.Sprite.call(this, game, 0, 0, 'player', 0);
    
    this.radius = CFG.PLAYER.radius;
    this.anchor.setTo(0.5, 0.5);
    
    // add(identifier, [frames], fps, loop, framesNamedByNumbers)
    this.animations.add('fall', CFG.PLAYER.animations.fall, 15, true, true);
    this.animations.add('up', CFG.PLAYER.animations.up, 15, true, true);
    this.animations.add('prepare', CFG.PLAYER.animations.prepare, 15, false, true);
    
    game.add.existing(this);
    this.animations.play('prepare');
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
    // update prepare-animation (do not continous animate eyes)
    if(this.animations.currentAnim.name === 'prepare'
      && this.animations.currentAnim.isFinished
      && Phaser.Utils.chanceRoll(1)) {
        this.animations.currentAnim.restart()
    }
}