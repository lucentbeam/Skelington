BasicGame.Game = function (game) { };

BasicGame.Game.prototype = {

/////////////////////////////////////////////////////////////
// EXAMPLE CODE
/////////////////////////////////////////////////////////////
    create: function () {
        
        Physics.createGroup('balls');
        Physics.createGroup('flippers');
        
        this.ball = game.add.graphics();
        this.ball.beginFill(0xAAAAAA);
        this.ball.drawCircle(0,0,50);
        this.ball.position.setTo(300,300);
        this.ball.anchor.set(0.5,0.5);
        
        attachCircleBody(this.ball, 'balls', 32);
        this.ball.body.gravity = new Phaser.Point(0,900);
        
        this.flipper = game.add.graphics(250,500);
        this.flipper.beginFill(0x303030);
        this.flipper.drawRect(0,-10,500,20);
        attachLineBody(this.flipper, 'flippers', new Phaser.Point(0, 0), new Phaser.Point(500, 0));
        this.flipper.up = false;
        
        this.flipper.setButtonOne = function(v) {
            this.up = v;
        }
        
        this.flipper.updateRotation = function() {
            var targetRot = this.up ? -45 * degToRad : 30 * degToRad;
            var factor = 0.35/physicsIterations;
            this.body.rotation = this.body.rotation*(1-factor) + targetRot * factor;
        }
        
        controls.addSubscriber(this.flipper);

    },

    update: function () {
        
        controls.update();
        
        for (var i = 0; i < physicsIterations; i++)
        {
            this.flipper.updateRotation();
            
            this.ball.body.update();
            this.flipper.body.update();

            Physics.collideGroups('balls', 'flippers', function(ball, flipper, collision) {
                ball.body.moveBy(collision.direction.x*collision.distance, collision.direction.y*collision.distance, false);
                ball.body.reflectVelocityToDirection(collision.direction, 0.5);
            });
        }
        
        if (game.input.activePointer.isDown) {
            this.gameOver();
        }
        
    },
    
    render: function() {
        
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
