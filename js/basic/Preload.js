//### GameState: PRELOADER
//#############################################################################
function Preload() {
	Phaser.State.call(this)
}

// inherits from Phaser.State
Preload.prototype = Object.create(Phaser.State)



;(function(p){


    // show loading screen and load all necessary assets
    p.preload = function() {
        // show loading sprite
        //var preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,
        //		"loading")
        //preloadBar.anchor.set(0.5, 0.5)
        //this.load.setPreloadSprite(preloadBar)

        // load spritesheets
        this.load.spritesheet("player",  "assets/"+CFG.PLAYER.file, CFG.PLAYER.width, CFG.PLAYER.height)
        this.load.spritesheet("bumper", "assets/bumper_kati.png", CFG.BUMPER.width, CFG.BUMPER.height)
        this.load.spritesheet("slingshot", "assets/slingshots.png", 128, 192)
        this.load.spritesheet("digits", "assets/numbers_yellow.png", 38, 67)
        this.load.spritesheet("digits_small", "assets/numbers_small.png", 23, 40)
        this.load.spritesheet("backwall", "assets/background.png", 384, 700)
        this.load.spritesheet("countdown", "assets/countdown.png", 170, 77)
        this.load.spritesheet("powerup", "assets/power_up.png", 30, 30)
        this.load.spritesheet("btn_sound", "assets/speaker.png", 48, 48)
        this.load.spritesheet("gameover", "assets/gameover.png", 202, 59)
        this.load.spritesheet("presskey", "assets/presskey.png", 256, 28)
        this.load.spritesheet(CFG.TITLE.id, CFG.TITLE.file, CFG.TITLE.width, CFG.TITLE.height)
        
        // load images
        this.load.image("bg_game", "assets/background_night.png")
        this.load.image("bg_menu", "assets/background_menu.png")
        this.load.image("bg_title", "assets/background_title.png")
        
        // load sounds
        this.load.audio("a_countdown_c", "assets/sounds/countdown_count.wav")
        this.load.audio("a_countdown_e", "assets/sounds/countdown_end.wav")
        this.load.audio("a_bumper", "assets/sounds/bumper_0.wav")
        this.load.audio("a_powerup", "assets/sounds/powerup.wav")
    },

    // reaching this point, everything was loaded an we can start the game
    p.create = function() {
        console.log("created Preload")
        this.game.state.start("Title")
        //this.game.state.start("Game")
    }
    
    
})(Preload.prototype)