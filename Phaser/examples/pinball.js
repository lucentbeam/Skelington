level = [
    [0.15, 0, 0.15, .95],
    [0.15, 0.95, 0.85, 1],
    [0.8, 0.4, 0.8, 0.8],
    [0.2, 0.5, 0.2, 0.7],
    [0.7, 0.5, 0.7, 0.7],
    [0.25, 0.55, 0.25, 0.65],
    [0.65, 0.55, 0.65, 0.65]
]

bumpers = [
    [0.45, 0.25],
    [0.35, 0.15],
    [0.55, 0.15],
    [0.35, 0.35],
    [0.55, 0.35],
    [0.7, 0]
]

function makeWall(x1, y1, x2, y2) {
    var w = game.add.graphics(x1, y1);
    var length = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    var angle = Math.atan2(y2-y1, x2-x1);
    w.beginFill(0x303030); w.drawRect(0, -10, length, 20);
    w.rotation = angle;
    attachLineBody(w, 'walls', new Phaser.Point(0, 0), new Phaser.Point(x2-x1, y2-y1));
    return w;
}

function makeBumper(x, y) {
    var radius = 50;
    var b = game.add.graphics(x, y);
    b.beginFill(0xAA3030); b.drawCircle(0, 0, radius*2);
    b.position.setTo(x, y);
    b.anchor.set(0.5,0.5);
    
    attachCircleBody(b, 'bumpers', radius);
    b.restitution = 1.5;
}

function makeFlipper(x, y, left) { 
    var len = 300;
    var offset = left ? len : -len;
    var flipper = makeWall(x, y, x+offset, y);
    flipper.up = false;
    flipper.restitution = 0.5;
    flipper.setButtonOne = function(v) {
        this.up = v;
    }
    flipper.lowered = left ? 30 : 150;
    flipper.raised = left ? -45 : 225;

    flipper.update = function() {
        var targetRot = this.up ? this.raised * degToRad : this.lowered * degToRad;
        var factor = 0.35/physicsIterations;
        this.body.rotation = this.body.rotation*(1-factor) + targetRot * factor;
    }
    controls.addSubscriber(flipper);
    return flipper;
}

function createPinball(state) {
    Physics.createGroup('balls');
    Physics.createGroup('walls');
    Physics.createGroup('launcher');
    Physics.createGroup('bumpers');

    state.ball = game.add.graphics();
    state.ball.restitution = 1
    state.ball.beginFill(0xAAAAAA);
    state.ball.drawCircle(0,0,50);
    state.ball.position.setTo(size.x*0.4,600);
    state.ball.anchor.set(0.5,0.5);

    attachCircleBody(state.ball, 'balls', 32);
    state.ball.body.gravity = new Phaser.Point(0,1500);
    
    for (var i = 0; i < level.length; i++) {
        makeWall(level[i][0]*size.x, level[i][1]*size.y, level[i][2]*size.x, level[i][3]*size.y);
    }
    makeFlipper(size.x*0.7, size.y*0.7, false);
    makeFlipper(size.x*0.2, size.y*0.7, true);

    for (var i = 0; i < bumpers.length; i++) {
        makeBumper(size.x * bumpers[i][0], size.y * bumpers[i][1]);
    }
    var launcher = game.add.graphics(size.x*0.85, size.y-50);
    launcher.beginFill(0xFF0000);
    launcher.drawCircle(0, 0, 30);
    attachCircleBody(launcher, 'launcher', 32);

    var tmp = [new Phaser.Point(size.x*0.15,0), new Phaser.Point(size.x*0.84, 0), new Phaser.Point(size.x*0.85, 0), new Phaser.Point(size.x*0.85, size.y*0.01), new Phaser.Point(size.x*0.85, size.y)]
    for (var i = 0; i < 20; i++) {
        var f = i * 0.05;
        var pt1 = bezier(tmp, f);
        var pt2 = bezier(tmp, f + 0.05);
        var w = makeWall(pt1.x, pt1.y, pt2.x, pt2.y);
        w.restitution = 0;
    }
}

function updatePinball(state) {
    controls.update();

    for (var i = 0; i < physicsIterations; i++)
    {
        Physics.updateGroup("balls");
        Physics.updateGroup("walls");

        Physics.collideGroups('balls', 'walls', function(ball, wall, collision) {
            ball.body.moveBy(collision.direction.x*collision.distance, collision.direction.y*collision.distance, false);
            ball.body.reflectVelocityToDirection(collision.direction, ball.restitution*wall.restitution);
        });

        Physics.collideGroups('balls', 'bumpers', function(ball, bumper, collision) {
            ball.body.moveBy(collision.direction.x*collision.distance, collision.direction.y*collision.distance, false);
            ball.body.reflectVelocityToDirection(collision.direction, ball.restitution*bumper.restitution);
        });
        
        Physics.collideGroups('launcher','balls', function(launcher, ball, collision) {
            ball.body.setVelocity(0, -2500);
        });

    }

//    if (game.input.activePointer.isDown) {
//        state.gameOver();
//    }
}