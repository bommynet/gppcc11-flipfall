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
        this.title = new GuiTitle((CFG.WIDTH - CFG.TITLE.width) / 2, (CFG.HEIGHT - CFG.TITLE.height) / 2 - 150)
        
        game.input.keyboard.onDownCallback = () => this.game.state.start("Game")
        
        console.log("created Menu")
    },
        
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        this.title.update()
    }
    
    
})(Menu.prototype)