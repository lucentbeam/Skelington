BasicGame.Game = function (game) { };

BasicGame.Game.prototype = {

/////////////////////////////////////////////////////////////
// EXAMPLE CODE
/////////////////////////////////////////////////////////////
    create: function () {
        
        this.player = getSprite('player-sprite');
        this.player.position.setTo(150,300);
        this.player.anchor.set(0.5,0.5);
        
        this.player.body = new VerletBody(this.player);
        this.player.collider = new CircleCollider(this.player.body,32);
        
        this.player.setDirection = function(d) {
            this.body.setVelocity(100*d.x, 100*d.y);
        }
        
        this.player.setButtonOne = function(v) {
            
        }
        
        this.player.update = function() {
            if (this.body.velocity.x < 0) {
                this.scale.x = -1*Math.abs(this.scale.x);
            } else if (this.body.velocity.x > 0) {
                this.scale.x = Math.abs(this.scale.x);  
            }
//            if (this.vbody.velocity.y <= 0) {
//                this.vbody.gravity.y = 0;
//            } else {
//                this.vbody.gravity.y = 6000;
//            }
//            this.vbody.update();
        }
        
        this.platform = game.add.graphics(250,500);
        this.platform.beginFill(0x303030);
        this.platform.drawRect(-250,-10,500,20);
        this.platform.collider = new LineCollider(this.platform, new Phaser.Point(-250, 0), new Phaser.Point(250, 0));
        
        controls.addSubscriber(this.player);

    },

    update: function () {
        
        controls.update();
        
        for (var i = 0; i < physicsIterations; i++)
        {
            this.platform.angle += 0.2/physicsIterations;

            var c = this.player.collider.collides(this.platform.collider);
            if (c) {
                this.player.body.moveBy(c.direction.x*c.distance, c.direction.y*c.distance, true);
            }
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
