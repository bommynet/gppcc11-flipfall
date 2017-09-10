//#############################################################################
//### Entity: Area
//#############################################################################
function Area() {
    
    this.left = CFG.AREA.border;
    this.width = CFG.AREA.width;
    
    this.spriteHeight = 100;
    this.bgspriteHeight = 700;
    this.maxSpeedY = 0;
    
    // collision area
    this.area = new Phaser.Rectangle(this.left, 0, this.width, CFG.HEIGHT);
    
    // background sprites
    this.bgsprites = [];
    for(let i=-1; i < (CFG.HEIGHT / this.bgspriteHeight + 1); i++) {
        let posY = i * this.bgspriteHeight;
        this.bgsprites.push({
            sprite: game.add.sprite(this.left, posY, 'backwall', 1),
            start: posY
        });
    }
    
    // border sprites
    this.sprites = [];
    /*for(let i=-1; i < (CFG.HEIGHT / this.spriteHeight + 1); i++) {
        let left = this.createSingleSpriteObject(i, true);
        let right = this.createSingleSpriteObject(i, false);
        
        this.sprites.push(left, right);
    }*/
}
Area.prototype.constructor = Area;



Area.prototype.moveBy = function(pixels) {
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

Area.prototype.getCenterX = function() {
    return this.width / 2 + this.left;
}



Area.prototype.createSingleSpriteObject = function(positionId, isLeftBorder) {
    let posY = positionId * this.spriteHeight;
    let posX = (isLeftBorder ? 0 : this.left + this.width);
    
    return {
        sprite: game.add.sprite(posX, posY, 'border', 0),
        start: posY
    }
    
}