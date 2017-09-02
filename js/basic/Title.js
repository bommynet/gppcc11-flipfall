//### GameState: TITLE
//#############################################################################
function Title() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
Title.prototype = Object.create(Phaser.State);



(function(p){


    // preload assets for this state
    p.preload = function() {
        //this.load.pack("start", "assets/assets-pack.json");
    },

    // create title screen
    p.create = function() {
        console.log("created Title");
        this.startMenu();
    },

    // go to game menu
    p.startMenu = function() {
        this.game.state.start("Menu");
    }
    
    
})(Title.prototype);