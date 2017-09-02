//#############################################################################
//### Entity: Border
//#############################################################################
function Border() {
    
    this.area = new Phaser.Rectangle(16, 0, CFG.WIDTH-16, CFG.HEIGHT);
    
    this.pos = {x: 0, y:0};
    this.vel = {x: 0, y:0};
    this.acc = {x: 0, y:0};
}
Border.prototype.constructor = Border;


Border.prototype.applyForce = function(x, y) {
    this.acc.x += x;
    this.acc.y += y;
}

Border.prototype.update = function() {
    // add acceleration
    this.vel.x += this.acc.x;
    this.vel.y += this.vel.y;
    
    // update position
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;
    
    // reset acceleration
    this.acc.x = 0;
    this.acc.y = 0;
    
    
    // update sprite position
    this.x = this.pos.x;
    this.y = this.pos.y;
}