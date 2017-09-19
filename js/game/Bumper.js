//#############################################################################
//### Entity: Bumper
//#############################################################################
function Bumper() {
    Phaser.Sprite.call(this, game, 0, 0, 'bumper', 0)
    
    this.isDead = false
    this.anchor.setTo(0.5, 0.5)
    this.radius = CFG.BUMPER.radius
    
    this.animations.add('idle', CFG.BUMPER.animations.idle, 15, true, true)
    this.animations.add('hit', CFG.BUMPER.animations.hit, 15, false, true)
    
    this.animations.play('idle')
    
    game.add.existing(this)
}

// inherits from Phaser.Sprite
Bumper.prototype = Object.create(Phaser.Sprite.prototype)
Bumper.prototype.constructor = Bumper

Bumper.prototype.resetTo = function(x, y) {
    this.x = x
    this.y = y
}

Bumper.prototype.moveBy = function(pixels) {
    this.y += pixels
    
    if(this.y < CFG.HEIGHT * -2)
        this.isDead = true
}

Bumper.prototype.hit = function() {
    // animate bumper
    this.animations.play('hit').onComplete.addOnce(x => this.animations.play('idle'), this)
    
    // play sound
    game.sound.play('a_bumper', CFG.SOUND.volume)
    
    // screen shake
    game.camera.shake(2 / CFG.WIDTH, 50)
}