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
        //this.load.spritesheet("block",  "assets/blocks.png", 64, 64);
        this.load.image("border", "assets/border.png");
        this.load.image("backwall", "assets/background.png");
        this.load.image("bumper", "assets/bumper.png");
    },

    // reaching this point, everything was loaded an we can start the game
    p.create = function() {
        console.log("created Preload");
        this.game.state.start("Title");
    }
    
    
})(Preload.prototype);