//#############################################################################
//### Entity: Slingshot
//#############################################################################
function Slingshot(left = true) {
    Phaser.Sprite.call(this, game, 0, 0, 'slingshot', 0)
    
    this.frame = (left ? 0 : 4)
    
    this.alignLeft = left
    this.A = {x:  25, y:  17, r: 15}
    this.C = {x: 104, y: 176, r: 15}
    this.a = {x1: 10, y1: 14, x2:  10, y2: 113}
    this.c = {x1: 37, y1:  7, x2: 119, y2: 172}
    
    this.isDead = false
    
    game.add.existing(this)
}

// inherits from Phaser.Sprite
Slingshot.prototype = Object.create(Phaser.Sprite.prototype)
Slingshot.prototype.constructor = Slingshot

Slingshot.prototype.resetTo = function(x, y) {
    this.x = x
    this.y = y
}

Slingshot.prototype.moveBy = function(pixels) {
    this.y += pixels
    
    if(this.y < CFG.HEIGHT * -4)
        this.isDead = true
}