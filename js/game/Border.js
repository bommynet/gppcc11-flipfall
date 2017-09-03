//#############################################################################
//### Entity: Border
//#############################################################################
function Border() {
    
    this.spriteHeight = 100;
    this.bgspriteHeight = 700;
    this.maxSpeedY = 0;
    
    // collision area
    this.area = new Phaser.Rectangle(16, 0, CFG.WIDTH-2*16, CFG.HEIGHT);
    
    // background sprites
    this.bgsprites = [];
    for(let i=-1; i < (CFG.HEIGHT / this.bgspriteHeight + 1); i++) {
        let posY = i * this.bgspriteHeight;
        this.bgsprites.push({
            sprite: game.add.sprite(0, posY, 'backwall'),
            start: posY
        });
    }
    
    // border sprites
    this.sprites = [];
    for(let i=-1; i < (CFG.HEIGHT / this.spriteHeight + 1); i++) {
        let left = this.createSingleSpriteObject(i, true);
        let right = this.createSingleSpriteObject(i, false);
        
        this.sprites.push(left, right);
    }
    
    this.pos = {x: 0, y:0};
    this.poshalf = {x: 0, y:0};
    this.vel = {x: 0, y:0};
    this.acc = {x: 0, y:0};
}
Border.prototype.constructor = Border;


Border.prototype.applyForce = function(x, y) {
    this.acc.x += x;
    this.acc.y += y;
}

Border.prototype.applyLimitY = function(maxSpeedY) {
    this.maxSpeedY = Math.abs(maxSpeedY);
}

Border.prototype.update = function() {
    // add acceleration
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    
    // limit speed
    if(this.vel.y < -this.maxSpeedY)
        this.vel.y = -this.maxSpeedY;
    else if(this.vel.y > this.maxSpeedY)
        this.vel.y = this.maxSpeedY;
    
    // update position
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    this.poshalf.x += this.vel.x * deltaTime * 0.5;
    this.poshalf.y += this.vel.y * deltaTime * 0.5;
    
    // reset acceleration
    this.acc.x = 0;
    this.acc.y = 0;
    
    
    // update border sprite positions
    this.sprites.forEach(obj => {
        obj.sprite.y = this.pos.y + obj.start;
    }, this);
    
    // reset border sprite positions, if range reached
    if(this.sprites[0].sprite.y < this.sprites[0].start - this.sprites[0].sprite.height
      || this.sprites[0].sprite.y > this.sprites[0].start + this.sprites[0].sprite.height) {
        this.sprites.forEach(obj => {obj.sprite.y = obj.start;});
        this.pos.y = 0;
    }
    
    
    // update background sprite positions
    this.bgsprites.forEach(obj => {
        obj.sprite.y = this.poshalf.y + obj.start;
    }, this);
    
    // reset background sprite positions, if range reached
    if(this.bgsprites[0].sprite.y < this.bgsprites[0].start - this.bgsprites[0].sprite.height
      || this.bgsprites[0].sprite.y > this.bgsprites[0].start + this.bgsprites[0].sprite.height) {
        this.bgsprites.forEach(obj => {obj.sprite.y = obj.start;});
        this.poshalf.y = 0;
    }
}



Border.prototype.createSingleSpriteObject = function(positionId, isLeftBorder) {
    let posY = positionId * this.spriteHeight;
    let posX = (isLeftBorder ? 0 : CFG.WIDTH - 16);
    
    return {
        sprite: game.add.sprite(posX, posY, 'border'),
        start: posY
    }
    
}