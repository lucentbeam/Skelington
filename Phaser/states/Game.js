BasicGame.Game = function (game) { };

BasicGame.Game.prototype = {

/////////////////////////////////////////////////////////////
// EXAMPLE CODE
/////////////////////////////////////////////////////////////
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.physics.arcade.gravity.setTo(0,3000);
        
        game.stage.backgroundColor = 0x333333;
        this.platforms = game.add.physicsGroup();
        
        var makePlatform = (x,y,w,h) => {
            var platform = this.platforms.add(game.add.graphics());
            platform.body.immovable = true;
            platform.body.allowGravity = false;
            platform.body.syncBounds = true;
            platform.position.setTo(x,y);
            platform.beginFill(0x606060);
            platform.drawRect(0,0,w,h);
            return platform
        }
        
        this.p = makePlatform(0,300,300,50);
        makePlatform(-10,size.y-50,size.x+20,100);
        makePlatform(400,600,200,50);
        makePlatform(800,800,200,50);
        
        this.entities = game.add.physicsGroup();
        
        this.player = getSprite('player-sprite',this.entities);
        
        this.player.body.setSize(32,48);
        this.player.body.offset.setTo(16,4);
        
        this.player.body.collideWorldBounds = true;
        
        this.player.animations.play('walk',null,true);
        
        this.player.anchor.setTo(0.5,0.5);
        
        this.player.setHorizontalAxis = function(d) {
            this.body.velocity.x = d*500;
        }
        
        this.player.setButtonOne = function(v) {
            if (v && this.body.touching.down) {
                this.body.velocity.y = -1500;
            }
        }
        
        this.player.update = function() {
            if (this.body.velocity.x < 0) {
                this.scale.x = -1*Math.abs(this.scale.x);
            } else if (this.body.velocity.x > 0) {
                this.scale.x = Math.abs(this.scale.x);  
            }
            if (this.body.velocity.y <= 0) {
                this.body.gravity.y = 0;
            } else {
                this.body.gravity.y = 6000;
            }
        }
        
        controls.addSubscriber(this.player);

    },

    update: function () {

        game.physics.arcade.collide(this.entities,this.platforms);
        
        controls.update();
        
        if (game.input.activePointer.isDown) {
            this.gameOver();
        }
        
    },
    
    render: function() {
        game.debug.body(this.player);
    },
/////////////////////////////////////////////////////////////
// END EXAMPLE CODE
/////////////////////////////////////////////////////////////
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
