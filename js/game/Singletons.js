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

//#############################################################################
//### Logic: Spawner
//#############################################################################
var Spawner = {
    currentTime: 0,
    nextSpawnTime: 0,
    
    reset: function(spawntime) {
        this.currentTime = 0;
        this.nextSpawnTime = spawntime || 2;
    },
    
    spawn: function() {
        // spawn new object
        if(this.currentTime >= this.nextSpawnTime) {
            // reset timer
            this.currentTime = 0;
            // create object
            let bumper = new Bumper();
            bumper.resetTo(CFG.WIDTH / 4, CFG.HEIGHT + 100);
            
            let bumper2 = new Bumper();
            bumper2.resetTo(CFG.WIDTH / 4 * 3, CFG.HEIGHT + 100);
            
            let bumper3 = new Bumper();
            bumper3.resetTo(CFG.WIDTH / 2, CFG.HEIGHT + 300);
            
            return [bumper,bumper2,bumper3];
        }
        // or count timer
        else {
            this.currentTime += deltaTime;
        }
        
        return null;
    }
};

//#############################################################################
//### Logic: Score
//#############################################################################
var Score = {
    score: 0,
    factor: 1,
    distanceCurrent: 0,
    distanceMax: 0,
    
    reset: function() {
        this.score = 0;
        this.distanceMax = 0;
        this.distanceCurrent = 0;
        this.factor = 1;
    },
    
    changeDistance: function(pixels) {
        this.distanceCurrent += pixels;
        
        let diff = this.distanceCurrent - this.distanceMax;
        
        if(diff > 0) {
            this.distanceMax = this.distanceCurrent;
            this.score += diff * this.factor;
        } else {
            /// nothing to do?
        }
    },
    
    add: function(score) {
        this.score += score;
    }
};