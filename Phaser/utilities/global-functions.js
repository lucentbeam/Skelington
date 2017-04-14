// reserved/global variables for code use
var game;

var controls = new InputManager();

// utility functions
function getImageData(key) {
    for (var i = 0; i < imageData.length; i++) {
        if (imageData[i].key === key) {
            return imageData[i];
        }
    }
    console.log("ERROR: Image data for name \""+key+"\" could not be found.");
    return null;
}

function loadImage(key) {
        game.load.image(key, 'gfx/'+getImageData(key).file);
}

function loadSpriteSheet(key) {
    var data = getImageData(key);
    game.load.spritesheet(data.key, 'gfx/'+data.file, data.animated.width, data.animated.height);
}

function getSprite(key, group) {
    var s = group.create(0,0,key);
    var data = getImageData(key);
    if (data.animated) {
        for (var i = 0; i < Object.keys(data.animationCycles).length; i++) {
            var k = Object.keys(data.animationCycles)[i];
            s.animations.add(k, data.animationCycles[k].frames, data.animationCycles[k].fps);
        }
    }
    if (data.scale) {
        s.scale.setTo(data.scale,data.scale);
    }
    return s;
}