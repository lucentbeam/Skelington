
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
    
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloader-background');
        this.background.width = size.x;
        this.background.height = size.y;
		this.preloadBar = this.add.sprite(size.x/2, size.y*0.495, 'preloader-bar');
        this.preloadBar.anchor.setTo(0.5,0.5);
        this.preloadBar.scale = this.background.scale;

		this.load.setPreloadSprite(this.preloadBar);
        
        loadImage("title-page");
        loadImage("gameover-page");
        loadImage("play-button");
        loadImage("player-sprite");
        
        loadBitmapFont("p1-white");
        loadBitmapFont("p1-black");

//		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
//		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
//		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');

	},

	create: function () {

		//	Once load has finished, disable crop while the music decodes
		this.preloadBar.cropEnabled = false;
        game.input.gamepad.start();

	},

	update: function () {
		
//		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        if (this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};