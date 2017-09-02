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
        
        this.isGameStarted = false;
        
        console.log("init done");
    },
       
    /**
     * Create game state.
     * Executed everytime the game will be started.
     */
    p.create = function() {
        this.isGameStarted = true; /// TODO: start game by user input
        
        // setup basic variables
        this.speed = -100;
        this.player.resetTo((CFG.WIDTH - this.player.width) / 2, 100);
        
        // speed -> move area
        this.border.applyForce(0, this.speed);
        
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
        
        this.player.update();
        this.border.update();
        
        // input -> move player
        // moving left or right
        // if not moving, then slow down 'til zero
        if(cursors.left.isDown) {
            this.player.applyForce(-1, 0);
        } else if(cursors.right.isDown) {
            this.player.applyForce(1, 0);
        } else {
            if(this.player.vel.x < 0)
                this.player.applyForce(0.5, 0);
            else if(this.player.vel.x > 0)
                this.player.applyForce(-0.5, 0);
        }
        
        // speed -> move area
        ///this.border.applyForce(0, this.speed);
        
        
        
        if(this.player.x < this.border.area.x)
            this.player.resetTo(this.border.area.x, this.player.y);
        else if(this.player.x + this.player.width > this.border.area.right)
            this.player.resetTo(this.border.area.right - this.player.width, this.player.y);
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