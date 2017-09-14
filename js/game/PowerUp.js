//#############################################################################
//### Entity: PowerUp
//#############################################################################
function PowerUp(type) {
    Phaser.Sprite.call(this, game, 0, 0, 'powerup', 0)
    
    this.isDead = false
    this.anchor.setTo(0.5, 0.5)
    this.radius = CFG.RADIUS.powerup
    this.power = {
        time: type.time,
        speed: type.speed
    }
    
    game.add.existing(this)
}

PowerUp.TYPE = {
    time5:   {time:  5, speed: 0},
    time10:  {time: 10, speed: 0},
    speedUp: {time:  0, speed: 1}
}

// inherits from Phaser.Sprite
PowerUp.prototype = Object.create(Phaser.Sprite.prototype)
PowerUp.prototype.constructor = PowerUp

PowerUp.prototype.resetTo = function(x, y) {
    this.x = x
    this.y = y
}

PowerUp.prototype.moveBy = function(pixels) {
    this.y += pixels
    
    if(this.y < (CFG.HEIGHT + 100) * -1)
        this.isDead = true
}