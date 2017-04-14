
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
//		this.music = this.add.audio('titleMusic');
//		this.music.play();

		var title = this.add.sprite(0, 0, 'title-page');
        title.width = size.x;
        title.height = size.y;

		this.playButton = this.add.sprite(size.x*0.5, size.y*0.6, 'play-button');
        this.playButton.anchor.setTo(0.5,0.5);
        this.playButton.inputEnabled = true;
        this.playButton.events.onInputDown.add(this.startGame,this);
        
        controls.addSubscriber(this);

	},

    setAccept: function(b) {
        if (b) {
            this.startGame();
        }
    },
    
	update: function () {

        controls.update();

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
        controls.clearSubscribers();
		this.state.start('Game');

	}

};
