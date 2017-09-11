//### GameState: PRELOADER
//#############################################################################
function Preload() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
Preload.prototype = Object.create(Phaser.State);;



(function(p){


    // show loading screen and load all necessary assets
    p.preload = function() {
        // show loading sprite
        //var preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,
        //		"loading");
        //preloadBar.anchor.set(0.5, 0.5);
        //this.load.setPreloadSprite(preloadBar);

        // load assets
        //this.load.pack("start", "assets/assets-pack.json");
        //this.load.pack("level", "assets/assets-pack.json");
        //this.load.spritesheet("player",  "assets/player.png", 49, 49);
        this.load.spritesheet("player",  "assets/"+CFG.PLAYER.file, CFG.PLAYER.width, CFG.PLAYER.height);
        //this.load.spritesheet("bumper", "assets/bumper.png", 99, 99);
        this.load.spritesheet("bumper", "assets/bumper_kati.png", 70, 70);
        this.load.spritesheet("border", "assets/border.png", 16, 100);
        this.load.spritesheet("digits", "assets/numbers_yellow.png", 38, 67);
        this.load.spritesheet("digits_small", "assets/numbers_small_yellow.png", 23, 40);
        //this.load.spritesheet("border", "assets/von_kati/Hintergrund.png", 8, 16);
        this.load.spritesheet("backwall", "assets/background.png", 384, 700);
        //this.load.spritesheet("backwall", "assets/Hintergrund.png", 384, 128);
        this.load.image("bg_game", "assets/background_night.png");
    },

    // reaching this point, everything was loaded an we can start the game
    p.create = function() {
        console.log("created Preload");
        this.game.state.start("Title");
    }
    
    
})(Preload.prototype);