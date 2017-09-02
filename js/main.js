// Vergangene Zeit pro Update-Zyklus
var deltaTime = 0;

// create phaser game
var game = new Phaser.Game(CFG.WIDTH, CFG.HEIGHT, Phaser.AUTO, "gameDiv");

// global keyboard handler
var cursors;

window.onload = function() {
	// add all possible game states
	game.state.add("Boot",     Boot);
	game.state.add("Preload",  Preload);
	game.state.add("Title",    Title);
	game.state.add("Menu",     Menu);
	game.state.add("GameOver", GameOver);
    
	game.state.add("Game",     Game);

	// start game by "booting"
	game.state.start("Boot");
};