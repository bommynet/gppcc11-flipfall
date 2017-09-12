//### GameState: GAME
//#############################################################################
function Game() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
Game.prototype = Object.create(Phaser.State);


(function(p){

//### GameState Funktionen
//#############################################################################
    /**
     * Prepare game state.
     * Executed once on page / game load.
     */
    p.init = function() {
        // add background as lowest layer
        this.background = game.add.image(0, 0, "bg_game");
        
        // create game objects
        this.area = new Area();
        this.player = new Player();
        this.bumpers = [];
        
        // create gui
        this.gui = {
            score:    new GuiNumbers("digits", 8, 462, 264, 2),
            time: {
                      min: new GuiNumbers("digits_small", 2, 460, 369),
                      sec: new GuiNumbers("digits_small", 2, 512, 369),
                      update: function(time) {
                          this.min.update(time / 60)
                          this.sec.update(time % 60)
                      }
            },
            distance: new GuiNumbers("digits_small", 6, 578, 369),
            factor:   new GuiNumbers("digits_small", 2, 735, 369)
        }
        
        // create important variables
        this.isGameStarted = false;
        this.timer = 120;
        
        StartTimer.init()
        
        console.log("init done");
    },
       
    /**
     * Create game state.
     * Executed everytime the game will be started.
     */
    p.create = function() {
        this.isGameStarted = false; /// TODO: start game by user input
        this.timer = 120;
        
        this.bumpers = [];
        
        // setup basic variables
        this.speed = -300;
        this.player.resetTo(this.area.getCenterX(), 100);
        
        // reset singletons
        Gravitation.reset();
        Spawner.reset();
        Score.reset();
        StartTimer.reset()
        StartTimer.start(() => this.isGameStarted = true)
        
        // reset gui
        this.gui.score.update(0)
        this.gui.distance.update(0)
        this.gui.factor.update(1)
        this.gui.time.update(this.timer)
        
        // limit speed
        Gravitation.applyLimitY(this.speed);
        
        console.log("create done");
    },
       
    /**
     * Logik neu berechnen.
     */
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001;
        
        // update start timer
        StartTimer.update()
        
        // don't update game if it's not started yet
        if(!this.isGameStarted) return;
        
        
        //### UPDATE SINGLETONS ###############################################
        // update 'physics'
        Gravitation.update();
        
        // update spawner and add objects to game
        let obj = Spawner.spawn();
        if(obj) {
            // if obj is set, it could be a single object or an array of objects
            if(Array.isArray(obj))
                obj.forEach(o => this.bumpers.push(o), this);
            else
                this.bumpers.push(obj);
        }
        
        
        //### UPDATE OBJECTS POSITION #########################################
        let scaledVelocityY = Gravitation.getScaledVelocityY();
        let scaledVelocityX = Gravitation.getScaledVelocityX();
        
        this.player.moveBy(scaledVelocityX);
        this.area.moveBy(scaledVelocityY);
        this.bumpers.forEach(b => b.moveBy(scaledVelocityY));
        
        Score.changeDistance(-scaledVelocityY);
        //DEBUGOUT.innerHTML = `dist max:${Score.distanceMax} <br> cur:${Score.distanceCurrent} <br> score:${Score.score}`
        
        
        //### HANDLE INPUT ####################################################
        // input -> move player
        // moving left or right
        // if not moving, then slow down 'til zero
        if(cursors.left.isDown) {
            Gravitation.applyForce(-5, 0);
        } else if(cursors.right.isDown) {
            Gravitation.applyForce(5, 0);
        } else {
            if(Gravitation.vel.x < 0)
                Gravitation.applyForce(2.5, 0);
            else if(Gravitation.vel.x > 0)
                Gravitation.applyForce(-2.5, 0);
        }
        
        
        //### COLLISIONS ######################################################
        // player -> borders
        if(this.player.x - this.player.radius < this.area.area.x) {
            this.player.resetTo(this.area.area.x + this.player.radius, this.player.y);
            Gravitation.vel.x *= -0.5;
        } else if(this.player.x + this.player.radius > this.area.area.right) {
            this.player.resetTo(this.area.area.right - this.player.radius, this.player.y);
            Gravitation.vel.x *= -0.5;
        }
        
        // player -> bumper
        this.bumpers.forEach(bump => {
            // collide with bumper if distance between player and bumper is smaller than
            // both radius summed
            // Info: calculate with squared numbers to avoid high cpu usage
            let distanceSquared = Math.pow(bump.x - this.player.x, 2) + Math.pow(bump.y - this.player.y, 2);
            let radiusSquared = Math.pow(bump.radius + this.player.radius, 2);
            
            if(distanceSquared < radiusSquared) {
                /// TODO: animation, sound, show score
                
                // update score
                Score.add(Score.SCORE_BUMPER);
                
                // reset factor
                Score.resetFactor();
                this.gui.factor.flash();
                
                // let player bump of
                let ply = new Phaser.Point(this.player.x, this.player.y);
                let bmp = new Phaser.Point(bump.x, bump.y);
                let dir = Phaser.Point.subtract(ply, bmp);
                let nrm = Phaser.Point.normalize(dir);
                
                let force = new Phaser.Point();
                force.copyFrom(nrm);
                force.multiply(1000, -1000);
                
                Gravitation.applyForce(force.x, force.y);
            }
        }, this);
        
        
        //### UPDATE GUI ELEMENTS #############################################
        this.gui.score.update(Score.score)
        this.gui.distance.update(Score.distanceShow)
        this.gui.factor.update(Score.factor)
        this.gui.time.update(this.timer)
        
        // update maximum speed influenced by factor
        Gravitation.applyLimitY(this.speed + this.speed / 10 * Score.factor);
        
        
        //### UPDATE TIMER ####################################################
        if(this.timer <= 0) {
            /// TODO: game ends
            this.isGameStarted = false;
            this.timer = 0;
        } else {
            this.timer -= deltaTime;
        }
        
        
        //### REMOVE DEAD OBJECTS #############################################
        this.bumpers = this.bumpers.filter(b => !b.isDead);
        //DEBUGOUT.innerHTML = `Bumpers: ${this.bumpers.length}`;
    },

    /**
     * Wechselt zum nächsten GameState.
     */
    p.gotoNextState = function() {
        this.game.state.start("GameOver");
    },
        
//### Game Funktionen
//#############################################################################
    p.irgendwas = function() {
        
    }
    
    
}(Game.prototype));