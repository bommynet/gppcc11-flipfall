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
        this.player.resetTo((CFG.WIDTH - this.player.width) / 2, 100);
        
        Gravitation.reset();
        Spawner.reset();
        
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
        if(obj) this.bumpers.push(obj);
        
        
        //### UPDATE OBJECTS POSITION #########################################
        let scaledVelocityY = Gravitation.getScaledVelocityY();
        let scaledVelocityX = Gravitation.getScaledVelocityX();
        
        this.player.moveBy(scaledVelocityX);
        this.border.moveBy(scaledVelocityY);
        this.bumpers.forEach(b => b.moveBy(scaledVelocityY));
        
        
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
        if(this.player.x < this.border.area.x) {
            this.player.resetTo(this.border.area.x, this.player.y);
            Gravitation.vel.x = 0;
        } else if(this.player.x + this.player.width > this.border.area.right) {
            this.player.resetTo(this.border.area.right - this.player.width, this.player.y);
            Gravitation.vel.x = 0;
        }
        
        
        //### REMOVE DEAD OBJECTS #############################################
        this.bumpers = this.bumpers.filter(b => !b.isDead);
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