//### GameState: BOOT
//#############################################################################
function Boot() {
	Phaser.State.call(this);
}

// inherits from Phaser.State
Boot.prototype = Object.create(Phaser.State);



(function(p){

    
    // setup basic informations
    p.init = function() {
        // allow one pointer actually
        this.input.maxPointers = 1;
        
        //cursors = game.input.keyboard.createCursorKeys();
        
        // right-click-menu is not allowed
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        // setup the scale strategy
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    // preload loding screen
    p.preload = function() {
        //this.load.pack("preload", "assets/assets-pack.json");
    },

    // all libs and basic assets are in cache at this time, so we can start
    // preloading now
    p.create = function() {
        console.log("created Boot");
        this.game.state.start("Preload");
    }

    
})(Boot.prototype);