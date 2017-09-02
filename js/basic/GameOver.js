//### GameState: GAMEOVER
//#############################################################################
function GameOver() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
GameOver.prototype = Object.create(Phaser.State);



(function(p){
    

    // preload assets
    p.preload = function() {

    },

    // create game over screen
    p.create = function() {
        console.log("created GameOver");
    },

    // go to menu
    p.restartGame = function() {
        this.game.state.start("Menu");
    }
    
    
})(GameOver.prototype);