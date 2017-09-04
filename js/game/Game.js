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
        this.border = new Border();
        this.player = new Player();
        this.bumpers = [];
        
        this.isGameStarted = false;
        
        console.log("init done");
    },
       
    /**
     * Create game state.
     * Executed everytime the game will be started.
     */
    p.create = function() {
        this.isGameStarted = true; /// TODO: start game by user input
        this.bumpers = [];
        
        // setup basic variables
        this.speed = -300;
        this.player.resetTo(CFG.WIDTH / 2, 100);
        
        Gravitation.reset();
        Spawner.reset();
        Score.reset();
        
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
        
        // don't update game if it's not started yet
        if(!this.isGameStarted) return;
        
        
        //### UPDATE SINGLETONS ###############################################
        Gravitation.update();
        let obj = Spawner.spawn();
        if(obj) {
            obj.forEach(o => this.bumpers.push(o), this);
        }
        
        
        //### UPDATE OBJECTS POSITION #########################################
        let scaledVelocityY = Gravitation.getScaledVelocityY();
        let scaledVelocityX = Gravitation.getScaledVelocityX();
        
        this.player.moveBy(scaledVelocityX);
        this.border.moveBy(scaledVelocityY);
        this.bumpers.forEach(b => b.moveBy(scaledVelocityY));
        
        Score.changeDistance(-scaledVelocityY);
        DEBUGOUT.innerHTML = `dist max:${Score.distanceMax} <br> cur:${Score.distanceCurrent} <br> score:${Score.score}`
        
        
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
        if(this.player.left < this.border.area.x) {
            this.player.resetTo(this.border.area.x + this.player.radius, this.player.y);
            Gravitation.vel.x *= -0.5;
        } else if(this.player.right > this.border.area.right) {
            this.player.resetTo(this.border.area.right - this.player.radius, this.player.y);
            Gravitation.vel.x *= -0.5;
        }
        
        this.bumpers.forEach(bump => {
            // collide with bumper if distance between player and bumper is smaller than
            // both radius summed
            // Info: calculate with squared numbers to avoid high cpu usage
            let distanceSquared = Math.pow(bump.x - this.player.x, 2) + Math.pow(bump.y - this.player.y, 2);
            let radiusSquared = Math.pow(bump.radius + this.player.radius, 2);
            
            if(distanceSquared < radiusSquared) {
                /// TODO: animation, sound, show score
                
                // update score
                Score.add(100);
                
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