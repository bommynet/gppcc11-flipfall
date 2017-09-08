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
            sprite: game.add.sprite(0, posY, 'backwall', 1),
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
    // update border positions
    this.sprites.forEach(obj => {
        let newY = obj.sprite.y + pixels;
        
        if(pixels < 0) {
            while(newY < obj.start - obj.sprite.height) {
                newY += obj.sprite.height;
            }
        } else if(pixels > 0) {
            while(newY > obj.start + obj.sprite.height) {
                newY -= obj.sprite.height;
            }
        }
        
        obj.sprite.y = newY;
    });
    
    // update background positions
    this.bgsprites.forEach(obj => {
        let newY = obj.sprite.y + pixels;
        
        if(pixels < 0) {
            while(newY < obj.start - obj.sprite.height) {
                newY += obj.sprite.height;
            }
        } else if(pixels > 0) {
            while(newY > obj.start + obj.sprite.height) {
                newY -= obj.sprite.height;
            }
        }
        
        obj.sprite.y = newY;
    });
}



Border.prototype.createSingleSpriteObject = function(positionId, isLeftBorder) {
    let posY = positionId * this.spriteHeight;
    let posX = (isLeftBorder ? 0 : CFG.WIDTH - 16);
    
    return {
        sprite: game.add.sprite(posX, posY, 'border'),
        start: posY
    }
    
}