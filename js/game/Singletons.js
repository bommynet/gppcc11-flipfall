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
        this.acc.add(x, y)
    },

    // limit falling speed
    applyLimitY: function(maxSpeedY) {
        this.maxSpeedY = Math.abs(maxSpeedY)
    },

    // reset variables for a new game
    reset: function() {
        this.acc.setTo(0, 0)
        this.vel.setTo(0, 0)
        this.maxSpeedY = 0
        this.maxSpeedX = 0
        this.gravitation = {x: 0, y: -300}
    },

    // update logic
    update: function() {
        // add acceleration
        this.vel.add(this.acc.x, this.acc.y)

        // reset acceleration
        this.acc.setTo(0, 0)

         // limit speed
        if(this.vel.y < -this.maxSpeedY)
            this.vel.y = -this.maxSpeedY
        else if(this.vel.y > this.maxSpeedY)
            this.vel.y = this.maxSpeedY

        // speed -> move area
        this.applyForce(0, this.gravitation.y * deltaTime)
    },

    // current vertical velocity, scaled by delta time
    getScaledVelocityY: function() {
        return this.vel.y * deltaTime
    },

    // current horizontal velocity, scaled by delta time
    getScaledVelocityX: function() {
        return this.vel.x * deltaTime
    }
}

//#############################################################################
//### Logic: Spawner
//### Spawns objects to change players way through the game
//#############################################################################
var Spawner = {
    // variables
    DISTANCE: 500,
    spawnDistance: 0,
    fnSet: [],
    powerupSpawnCounter: 5,
    
    // reset variables for a new game
    reset: function(spawntime) {
        this.currentTime = 0
        this.nextSpawnTime = spawntime || 2
        this.spawnDistance = this.DISTANCE
        this.lastFn = null
        this.fnSet = [
            SpawnFn.threeBumpersLine,
            SpawnFn.fourBumpers,
            SpawnFn.twoBumpersLine,
            SpawnFn.oneBumper,
            SpawnFn.twoBumpersNearCenter
        ]
    },
    
    // check, if a new object or set of objects should spawn
    spawn: function(movePixelsY) {
        this.spawnDistance += movePixelsY
        
        if(this.spawnDistance < 0) {
            // select random spawner function
            let fnSpawn = Bommy.Random.randomElement(
                this.fnSet.filter(x => x !== this.lastFn)
            )
            
            this.lastFn = fnSpawn
            
            // execute function to add objects
            let res = fnSpawn(Phaser.Utils.chanceRoll(50))
            this.spawnDistance = res.height
            
            this.powerupSpawnCounter--
            if(this.powerupSpawnCounter < 0) {
                let power = SpawnFn.powerupTime(
                    CFG.AREA.border + CFG.AREA.width * Math.random(),
                    CFG.HEIGHT,
                    5
                )
                
                res.objects.push(power[0])
                
                this.powerupSpawnCounter = 5
            }
            
            return res.objects
        }
    }
}

//#############################################################################
//### Logic: Score
//### Stores and updates score for current game
//#############################################################################
var Score = {
    // point values for each object
    SCORE_BUMPER: 5,
    SCORE_NAIL: 0,
    SCORE_SLINGSHOT: 10,
    SCORE_DISTANCE: 100,
    
    // other important values
    DISTANCE_FACTOR: 100,
    FACTOR_INCREASE_DISTANCE: 500,
    FACTOR_MAX: 100,//9,
    
    // variables
    score: 0,
    factor: 1,
    factor_next_inc_in: 0,
    distanceCurrent: 0,
    distanceMax: 0,
    distanceShow: 0,
    
    // reset variables for a new game
    reset: function() {
        this.score = 0
        this.distanceMax = 0
        this.distanceCurrent = 0
        this.distanceShow = 0
        this.factor = 1
        this.factor_next_inc_in = this.FACTOR_INCREASE_DISTANCE
    },
    
    // calculate current fall-distance, max-distance and add points based
    // on max-distance
    changeDistance: function(pixels) {
        this.distanceCurrent += pixels
        
        let diff = this.distanceCurrent - this.distanceMax
        
        if(diff > 0) {
            // real maximum distance
            this.distanceMax = this.distanceCurrent
            
            // scaled maximum distance
            this.distanceShow = this.distanceMax / this.DISTANCE_FACTOR
            
            // update score
            this.score += diff / this.DISTANCE_FACTOR * this.SCORE_DISTANCE * this.factor
            
            // update factor
            this.factor_next_inc_in -= diff
            if(this.factor_next_inc_in < 0) {
                this.factor++
                if(this.factor > this.FACTOR_MAX) this.factor = this.FACTOR_MAX
                this.factor_next_inc_in = this.FACTOR_INCREASE_DISTANCE
            }
        }
    },
    
    // simply add a value to current score
    add: function(score) {
        this.score += score
    },
    
    // reset factor and restart counter
    resetFactor: function() {
        this.factor = 1
        this.factor_next_inc_in = this.FACTOR_INCREASE_DISTANCE
    },
    
    // add factor to current and restart counter
    changeFactor: function(add_value) {
        this.factor += add_value
        
        if(this.factor < 1)
            this.factor = 1
        else if(this.factor > this.FACTOR_MAX)
            this.factor = this.FACTOR_MAX
            
        this.factor_next_inc_in = this.FACTOR_INCREASE_DISTANCE
    }
}

//#############################################################################
//### Logic: Start Timer
//### Counts down before game starts.
//#############################################################################
var StartTimer = {
    
    isActive: false,
    image: null,
    
    init: function() {
        this.image = game.add.image(CFG.AREA.width / 2 + CFG.AREA.border,
                                    CFG.AREA.height / 2, "countdown", 3)
        this.image.anchor.setTo(0.5, 0.5)
        this.image.visible = false
    },
    
    start: function(callback) {
        this.isActive = true
        
        // made number '3' visible
        this.image.frame = 3
        this.image.visible = true
        this.image.bringToTop()
        
        let width = 170 * 1.5
        let height = 77 * 1.5
        
        this.image.width = width
        this.image.height = height
        
        // create countdown (3..2..1..GO)
        let tween3 = game.tweens.create(this.image)
            .to({ width: width/2, height: height/2, alpha: 0.2 }, 1000, Phaser.Easing.Linear.None, false)
        let tween2 = game.tweens.create(this.image)
            .to({ width: width/2, height: height/2, alpha: 0.2 }, 1000, Phaser.Easing.Linear.None, false)
        let tween1 = game.tweens.create(this.image)
            .to({ width: width/2, height: height/2, alpha: 0.2 }, 1000, Phaser.Easing.Linear.None, false)
        let tweenGO = game.tweens.create(this.image)
            .to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, false, 1000)
        
        // reset image after each partial tween and start following
        tween3.onComplete.add(() => {
            this.image.width= width
            this.image.height = height
            this.image.alpha = 1
            this.image.frame = 2
            
            game.sound.play('a_countdown_c', CFG.SOUND.volume)
            
            tween2.start()
        }, this)
        tween2.onComplete.add(() => {
            this.image.width= width
            this.image.height = height
            this.image.alpha = 1
            this.image.frame = 1
            
            game.sound.play('a_countdown_c', CFG.SOUND.volume)
            
            tween1.start()
        }, this)
        tween1.onComplete.add(() => {
            this.image.width= width
            this.image.height = height
            this.image.alpha = 1
            this.image.frame = 0
            this.isActive = false
            callback()
            
            game.sound.play('a_countdown_e', CFG.SOUND.volume)
            
            tweenGO.start()
        }, this)
        tweenGO.onComplete.add(() => {
            this.image.width= width
            this.image.height = height
            this.image.frame = 3
            this.image.visible = false
        }, this)
        
        // start initial tween
        game.sound.play('a_countdown_c', CFG.SOUND.volume)
        tween3.start()
    }
}
