//### GameState: TITLE
//#############################################################################
function Menu() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
Menu.prototype = Object.create(Phaser.State);



(function(p){


    // preload assets for this state
    p.preload = function() {
        //this.load.pack("start", "assets/assets-pack.json");
    },

    // create menu screen
    p.create = function() {
        console.log("created Menu");
        this.startGame();
    },

    // go to game state
    p.startGame = function() {
        this.game.state.start("Game");
    }
    
    
})(Menu.prototype);