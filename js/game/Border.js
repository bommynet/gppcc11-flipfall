//#############################################################################
//### Entity: Border
//#############################################################################
function Border() {
    
    this.spriteHeight = 100;
    this.bgspriteHeight = 100;
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



Border.prototype.moveBy = function(pixels) {
    this.pos.y += pixels;
    this.poshalf.y += pixels / 2;
    
    
    // update border sprite positions
    this.sprites.forEach(obj => {
        obj.sprite.y = this.pos.y + obj.start;
    }, this);
    
    // reset border sprite positions, if range reached
    /*if(this.sprites[0].sprite.y < this.sprites[0].start - this.sprites[0].sprite.height
      || this.sprites[0].sprite.y > this.sprites[0].start + this.sprites[0].sprite.height) {
        this.sprites.forEach(obj => {obj.sprite.y = obj.start;});
        this.pos.y = 0;
    }*/
    /// TODO: avoid 'jumping' of the border elements, if y is less/grater min/max position (still not working -.-)
    if(this.sprites[0].sprite.y < this.sprites[0].start - this.sprites[0].sprite.height) {
        let diff = (this.sprites[0].start - this.sprites[0].sprite.height) - this.sprites[0].sprite.y;
        this.sprites.forEach(obj => {obj.sprite.y = obj.start - diff;});
        this.pos.y = diff;
    } else if(this.sprites[0].sprite.y > this.sprites[0].start + this.sprites[0].sprite.height) {
        let diff = this.sprites[0].sprite.y - (this.sprites[0].start + this.sprites[0].sprite.height);
        this.sprites.forEach(obj => {obj.sprite.y = obj.start + diff;});
        this.pos.y = diff;
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