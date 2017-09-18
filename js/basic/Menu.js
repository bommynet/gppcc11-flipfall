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
        this.backgroundTransition = game.add.image(0, -CFG.HEIGHT, "bg_game")
        
        this.title = new GuiTitle((CFG.WIDTH - CFG.TITLE.width) / 2, (CFG.HEIGHT - CFG.TITLE.height) / 2 - 150)
        
        game.input.keyboard.onDownCallback = () => {
            let tweenOut = game.tweens.create(this.title.sprite)
            tweenOut.to({x: 480, y: 12}, 1000, Phaser.Easing.Quadratic.In)
            
            let tweenBG = game.tweens.create(this.background)
            let tweenBGT = game.tweens.create(this.backgroundTransition)
            tweenBG.to({y: CFG.HEIGHT}, 1000, Phaser.Easing.Linear.None)
            tweenBGT.to({y: 0}, 1000, Phaser.Easing.Linear.None)
            
            tweenOut.onComplete.add(() => this.game.state.start("Game"), this)
            tweenOut.start()
            tweenBG.start()
            tweenBGT.start()
        }
        
        console.log("created Menu")
    },
        
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        this.title.update()
    }
    
    
})(Menu.prototype)