//### GameState: TITLE
//#############################################################################
function Title() {
	Phaser.State.call(this)
}

// inherits from Phaser.State
Title.prototype = Object.create(Phaser.State)



;(function(p){


    // preload assets for this state
    p.preload = function() {
        //this.load.pack("start", "assets/assets-pack.json")
    },

    // create title screen
    p.create = function() {
        this.background = game.add.image(0, 0, "bg_title")
        this.title = new GuiTitle((CFG.WIDTH - CFG.TITLE.width) / 2, (CFG.HEIGHT - CFG.TITLE.height) / 2 - 50)
        
        game.input.keyboard.onDownCallback = () => this.startMenu()
        
        console.log("created Title")
    },
        
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        this.title.update()
    },

    // go to game menu
    p.startMenu = function() {
        this.game.state.start("Menu")
    }
    
    
})(Title.prototype)