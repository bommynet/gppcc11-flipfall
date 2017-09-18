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
        this.title = game.add.sprite((CFG.WIDTH - CFG.TITLE.width) / 2, (CFG.HEIGHT - CFG.TITLE.height) / 2 - 50, 'pinfall')
        CFG.TITLE.anim.forEach((arr) => {
            this.title.animations.add(arr.id, arr.frames, (arr.fps ? arr.fps : 15), false)
        }, this)
        
        this.title.animations.play('on')
        this.nextAnim = 4
        
        game.input.keyboard.onDownCallback = () => this.startMenu()
        
        console.log("created Title")
    },
        
    p.update = function() {
        // get elapsed time since last update
        deltaTime = game.time.physicsElapsedMS * 0.001
        
        if(this.title.animations.currentAnim.isFinished) {
            if(this.nextAnim < 0) {
                let anim_id = Bommy.Random.randomElement(CFG.TITLE.anim)
                let ani = this.title.animations.play(anim_id.id)
                ani.onComplete.addOnce(() => this.title.animations.play('on'), this)
                this.nextAnim = 4
            } else {
                this.nextAnim -= deltaTime
                console.log(this.nextAnim)
            }
        }
    },

    // go to game menu
    p.startMenu = function() {
        this.game.state.start("Menu")
    }
    
    
})(Title.prototype)