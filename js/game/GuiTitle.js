//### GameState: GUI TITLE 'PIN FALL'
//#############################################################################
function GuiTitle(posX, posY) {
    
    // add sprite to game screen
	this.title = game.add.sprite(posX, posY, 'pinfall')
    
    // load animations from config
    CFG.TITLE.anim.forEach((arr) => {
        this.title.animations.add(arr.id, arr.frames, (arr.fps ? arr.fps : 15), false)
    }, this)

    // start animation cycle
    this.title.animations.play('on')
    this.nextAnim = 4
}

GuiTitle.prototype.update = function() {
    if(this.title.animations.currentAnim.isFinished) {
        if(this.nextAnim < 0) {
            // get a random animation and start it
            let anim_id = Bommy.Random.randomElement(CFG.TITLE.anim.slice(2,8))
            let ani = this.title.animations.play(anim_id.id)
            
            // after animation finished, reset timer and view
            ani.onComplete.addOnce(() => this.title.animations.play('on'), this)
            this.nextAnim = 4
        } else {
            this.nextAnim -= deltaTime
        }
    }
}