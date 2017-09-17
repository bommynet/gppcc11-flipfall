//#############################################################################
//### Entity: Slingshot
//#############################################################################
function Slingshot(left = true) {
    Phaser.Sprite.call(this, game, 0, 0, 'slingshot', 0)
    
    this.frame = (left ? 0 : 4)
    
    this.alignLeft = left
    this.A = {x:  25, y:  17, r: 15}
    this.C = {x: 104, y: 176, r: 15}
    //this.a = {x1: 10, y1: 14, x2:  10, y2: 113}
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


// collision detection
Slingshot.prototype.possibleCollisionWithPlayer = function(player) {
    // 1. get rectangle from image position and size
    // 2. expand rectangle with players radius
    // 3. check if players center point is on/in the rectangle
    
    // 1.
    let rect = {
        left:   this.x,
        right:  this.x + this.width,
        top:    this.y,
        bottom: this.y + this.height
    }
    
    // 2.
    rect.left   -= player.radius
    rect.right  += player.radius
    rect.top    -= player.radius
    rect.bottom += player.radius
    
    // 3.
    if(rect.left <= player.position.x && rect.right >= player.position.x
      && rect.top <= player.position.y && rect.bottom >= player.position.y)
        return true
    else
        return false
}

// check if player collides with nodes A or C of the slingshot
// (returns normalized vector on collision or null)
Slingshot.prototype.collideWithNodes = function(player) {
    let nodeA = {
        x: this.x + (this.alignLeft ? this.A.x : this.width - this.A.x),
        y: this.y + this.A.y,
        r: this.A.r
    }
    let nodeC = {
        x: this.x + (this.alignLeft ? this.C.x : this.width - this.C.x),
        y: this.y + this.C.y,
        r: this.C.r
    }
    
    // check node A
    let distanceSquared_A = Math.pow(nodeA.x - player.position.x, 2) + Math.pow(nodeA.y - player.position.y, 2)
    let radiusSquared_A = Math.pow(nodeA.r + player.radius, 2)

    if(distanceSquared_A < radiusSquared_A) {
        // create normalized vector
        let ply = new Phaser.Point(player.x, player.y)
        let sli = new Phaser.Point(nodeA.x, nodeA.y)
        let dir = Phaser.Point.subtract(ply, sli)
        let nrm = Phaser.Point.normalize(dir)
        
        return nrm
    }
    
    // check node C
    let distanceSquared_C = Math.pow(nodeC.x - player.position.x, 2) + Math.pow(nodeC.y - player.position.y, 2)
    let radiusSquared_C = Math.pow(nodeC.r + player.radius, 2)

    if(distanceSquared_C < radiusSquared_C) {
        // create normalized vector
        let ply = new Phaser.Point(player.x, player.y)
        let sli = new Phaser.Point(nodeC.x, nodeC.y)
        let dir = Phaser.Point.subtract(ply, sli)
        let nrm = Phaser.Point.normalize(dir)
        
        return nrm
    }
    
    // no collision, no vector
    return null
}