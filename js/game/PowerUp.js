//#############################################################################
//### Entity: PowerUp
//#############################################################################
function PowerUp(type) {
    Phaser.Sprite.call(this, game, 0, 0, 'powerup', 0)
    
    this.isDead = false
    this.anchor.setTo(0.5, 0.5)
    this.radius = CFG.RADIUS.powerup
    this.power = {
        time: 0,
        speed: 0
    }
    
    game.add.existing(this)
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

PowerUp.prototype.getPower = function() {
    return this.power
}