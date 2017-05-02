BasicGame.Game = function (game) { };

BasicGame.Game.prototype = {
    
    create: function () {
        
        createPinball(this);
        
    },

    update: function () {
        
        updatePinball(this);
        
    },
    
    render: function() {
        
    },
    
    pauseUpdate: function() {
        
    },
    
    cleanup: function() {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
    },

    quitGame: function (pointer) {
        this.cleanup();
        this.state.start('MainMenu');
    },
    
    gameOver: function () {
        this.cleanup();
        this.state.start('GameOver');
    }

};
