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
        
        this.presskey = game.add.image(0, 0, 'presskey')
        this.presskey.reset(
            (CFG.WIDTH - this.presskey.width) / 2,
            458
        )
        let tween = game.tweens.create(this.presskey)
        tween.to({alpha: 0}, 700, Phaser.Easing.Exponential.In, true, 0, -1)
        tween.yoyo(true)
        
        game.input.keyboard.onDownCallback = () => {
            // lets bounce title text to new position
            let tweenOut = game.tweens.create(this.title.sprite)
            tweenOut.to({y: (CFG.HEIGHT - CFG.TITLE.height) / 2 - 150}, 500, Phaser.Easing.Elastic.Out)

            // after animation, switch screen
            tweenOut.onComplete.add(() => this.game.state.start("Menu"), this)
            tweenOut.start()
        }
        
        console.log("created Title")
    },
        
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        this.title.update()
    }
    
    
})(Title.prototype)