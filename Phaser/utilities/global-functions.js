// reserved/global variables for code use
var game;

var controls = new InputManager();

var physicsIterations = 100;
var dt = 0.016 / physicsIterations;

var degToRad = Math.PI / 180;

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
    var data = getImageData(key);
    if (data.animated) {
        game.load.spritesheet(data.key, 'gfx/'+data.file, data.animated.width, data.animated.height);
    } else {
        game.load.image(key, 'gfx/'+data.file);
    }
}

function getSprite(key, group) {
    var s;
    if (group) {
        s = group.create(0,0,key);
    } else {
        s = game.add.sprite(0,0,key);
    }
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

function getFontData(key) {
    for (var i = 0; i < fontData.length; i++) {
        if (fontData[i].key === key) {
            return fontData[i];
        }
    }
    console.log("ERROR: Image data for name \""+key+"\" could not be found.");
    return null;
}

function loadBitmapFont(key) {
    var data = getFontData(key);
    game.load.bitmapFont(data.key, "gfx/fonts/"+data.image, "gfx/fonts/"+data.xml);
}

function getText(key, text) {
    var data = getFontData(key);
    var font = game.add.bitmapText(0,0,data.key,text,data.size);
    return font;
}