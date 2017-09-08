//#############################################################################
//### Logic: Gravitation
//### Update game 'gravitation' to continuos move the player downwards, make it
//### steerable and make it possible to fire it in other directions.
//#############################################################################
var Gravitation = {
    // variables
    vel: new Phaser.Point(),
    acc: new Phaser.Point(),
    maxSpeedY: 0,
    maxSpeedX: 0,
    gravitation: {x: 0, y: -300},

    // add a force to environment
    applyForce: function(x, y) {
        this.acc.add(x, y);
    },

    // limit falling speed
    applyLimitY: function(maxSpeedY) {
        this.maxSpeedY = Math.abs(maxSpeedY);
    },

    // reset variables for a new game
    reset: function() {
        this.acc.setTo(0, 0);
        this.vel.setTo(0, 0);
        this.maxSpeedY = 0;
        this.maxSpeedX = 0;
        this.gravitation = {x: 0, y: -300};
    },

    // update logic
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

    // current vertical velocity, scaled by delta time
    getScaledVelocityY: function() {
        return this.vel.y * deltaTime;
    },

    // current horizontal velocity, scaled by delta time
    getScaledVelocityX: function() {
        return this.vel.x * deltaTime;
    }
};

//#############################################################################
//### Logic: Spawner
//### Spawns objects to change players way through the game
//#############################################################################
var Spawner = {
    // variables
    currentTime: 0,
    nextSpawnTime: 0,
    
    // reset variables for a new game
    reset: function(spawntime) {
        this.currentTime = 0;
        this.nextSpawnTime = spawntime || 2;
    },
    
    // check, if a new object or set of objects should spawn
    spawn: function() {
        // spawn new object
        if(this.currentTime >= this.nextSpawnTime) {
            // reset timer
            this.currentTime = 0;
            // create object
            let bumper = new Bumper();
            bumper.resetTo(CFG.WIDTH / 4, CFG.HEIGHT + 100);
            
            let bumper2 = new Bumper();
            bumper2.resetTo(CFG.WIDTH / 4 * 3, CFG.HEIGHT + 200);
            
            return [bumper,bumper2];
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
//### Stores and updates score for current game
//#############################################################################
var Score = {
    // point values for each object
    SCORE_BUMPER: 100,
    SCORE_NAIL: 0,
    SCORE_SLINGSHOT: 100,
    
    // variables
    score: 0,
    factor: 1,
    distanceCurrent: 0,
    distanceMax: 0,
    
    // reset variables for a new game
    reset: function() {
        this.score = 0;
        this.distanceMax = 0;
        this.distanceCurrent = 0;
        this.factor = 1;
    },
    
    // calculate current fall-distance, max-distance and add points based
    // on max-distance
    changeDistance: function(pixels) {
        this.distanceCurrent += pixels;
        
        let diff = this.distanceCurrent - this.distanceMax;
        
        if(diff > 0) {
            this.distanceMax = this.distanceCurrent;
            this.score += diff / 10 * this.factor;
        } else {
            /// nothing to do?
        }
    },
    
    // simply add a value to current score
    add: function(score) {
        this.score += score;
    }
};