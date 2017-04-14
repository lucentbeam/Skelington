var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(minSize.x, minSize.y, maxSize.x, maxSize.y);
        this.scale.forceLandscape = true;
        this.scale.pageAlignHorizontally = true;
    },

    preload: function () {
        // required assets for preloader screen
        loadImage('preloader-background');
        loadImage('preloader-bar');
    },

    update: function () {

        this.state.start('Preloader');

    }

};
