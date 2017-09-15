//### GameState: TITLE
//#############################################################################
function Menu() {
	Phaser.State.call(this)
}

// inherits from Phaser.State
Menu.prototype = Object.create(Phaser.State)



;(function(p){


    // preload assets for this state
    p.preload = function() {
        //this.load.pack("start", "assets/assets-pack.json")
    },

    // create menu screen
    p.create = function() {
        this.background = game.add.image(0, 0, "bg_menu")
        game.input.keyboard.onDownCallback = () => this.game.state.start("Game")
        
        console.log("created Menu")
    }
    
    
})(Menu.prototype)