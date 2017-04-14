BasicGame.GameOver = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.GameOver.prototype = {

	create: function () {
//		this.music = this.add.audio('gameoverMusic');
//		this.music.play();

		var page = this.add.sprite(0, 0, 'gameover-page');
        page.width = size.x;
        page.height = size.y;
        page.inputEnabled = true;
        page.events.onInputDown.add(this.restartGame,this);

	},

	update: function () {

		//	Do some nice funky game over effect here

	},

	restartGame: function (pointer) {
		//this.music.stop();

		this.state.start('MainMenu');

	}

};