//#############################################################################
//### Logic: Gravitation
//#############################################################################
var Gravitation = {
    vel: new Phaser.Point(),
    acc: new Phaser.Point(),
    maxSpeedY: 0,
    maxSpeedX: 0,
    gravitation: {x: 0, y: -300},

    applyForce: function(x, y) {
        this.acc.add(x, y);
    },

    reset: function() {
        this.acc.setTo(0, 0);
        this.vel.setTo(0, 0);
        this.maxSpeedY = 0;
        this.maxSpeedX = 0;
        this.gravitation = {x: 0, y: -300};
    },

    applyLimitY: function(maxSpeedY) {
        this.maxSpeedY = Math.abs(maxSpeedY);
    },

    update: function() {
        // add acceleration
        this.vel.add(this.acc.x, this.acc.y);

        // reset acceleration
        this.acc.setTo(0, 0);

         // limit speed
        if(this.vel.y < -this.maxSpeedY)
            this.vel.y = -this.maxSpeedY;
        else if(this.vel.y > this.maxSpeedY)
            this.vel.y = this.maxSpeedY;

        // speed -> move area
        this.applyForce(0, this.gravitation.y * deltaTime);
    },

    getScaledVelocityY: function() {
        return this.vel.y * deltaTime;
    },

    getScaledVelocityX: function() {
        return this.vel.x * deltaTime;
    }
};