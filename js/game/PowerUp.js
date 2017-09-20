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

// inherits from Phaser.Sprite
PowerUp.prototype = Object.create(Phaser.Sprite.prototype)
PowerUp.prototype.constructor = PowerUp

PowerUp.prototype.resetTo = function(x, y) {
    this.x = x
    this.y = y
}

PowerUp.prototype.moveBy = function(pixels) {
    this.y += pixels
    
    if(this.y < -100)
        this.isDead = true
}

PowerUp.prototype.hit = function() {
    game.sound.play('a_powerup', CFG.SOUND.volume)
}