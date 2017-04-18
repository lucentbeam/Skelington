var InputMap = function() {};

InputMap.prototype = {
    updated: false,
    
    _x: 0,
    get x() { return this._x; },
    set x(f) {
      if (f !== this._x) {
          this._x = f;
          this.updated = true;
      }
    },
    
    _y: 0,
    get y() { return this._y; },
    set y(f) {
      if (f !== this._y) {
          this._y = f;
          this.updated = true;
      }
    },
    
    _direction: new Phaser.Point(0,0),
    get direction() { return this._direction; },
    set direction(d) {
        if (d.x !== this._direction.x || d.y != this._direction.y) {
            this._direction = d;
            this.updated = true;
        }
    },
    
    _accept: false,
    get accept() { return this._accept; },
    set accept(b) {
        if (this._accept !== b) {
            this._accept = b;
            this.updated = true;
        }
    },
    
    _cancel: false,
    get cancel() { return this._cancel; },
    set cancel(b) {
        if (this._cancel !== b) {
            this._cancel = b;
            this.updated = true;
        }
    },
    
    _button1: false,
    get button1() { return this._button1; },
    set button1(b) {
        if (this._button1 !== b) {
            this._button1 = b;
            this.updated = true;
        }
    },
    
    _button2: false,
    get button2() { return this._button2; },
    set button2(b) {
        if (this._button2 !== b) {
            this._button2 = b;
            this.updated = true;
        }
    }
}

var InputManager = function() {
    this.subscribers = [];
    this.keyboard = new KeyboardManager();
    this.gamepad = new GamepadManager();
    this.virtualpad = new VirtualPad();
    
//    this.activeInput = 0;  // 0, 1, or 2 for keyboard, gamepad, or touch?
};

var InputType = Object.freeze({
    Keyboard: 0,
    Gamepad: 1,
    Touch: 2
});

InputManager.prototype = {
    
    update: function() {
        this.checkInvalid();
        
        this.keyboard.update();
        this.gamepad.update();
        this.virtualpad.update();
        
        if (this.gamepad.buttons.updated) {
            this.runDispatches(this.gamepad);
        } else if (this.keyboard.buttons.updated) {
            this.runDispatches(this.keyboard);
        }
    },
    
    runDispatches: function(target) {
        this.dispatch("setDirection",target.buttons.direction);
        this.dispatch("setHorizontalAxis",target.buttons.x);
        this.dispatch("setVerticalAxis",target.buttons.y);
        this.dispatch("setAccept",target.buttons.accept);
        this.dispatch("setCancel",target.buttons.cancel);
        this.dispatch("setButtonOne",target.buttons.button1);
        this.dispatch("setButtonTwo",target.buttons.button2);
        target.buttons.updated = false;
    },
    
    checkInvalid: function() {
        var invalid = [];
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === undefined) {
                invalid.push(this.subscribers[i]);
            }
        }
        for (var i = 0; i < invalid; i++) {
            this.subscribers.splice(this.subscribers.indexOf(invalid[i]),1);
        }
    },
    
    dispatch: function(fun, arg) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i][fun] === 'function') {
                this.subscribers[i][fun](arg);
            }
        }
    },
    
    addSubscriber: function(subscriber) {
        if (this.subscribers.indexOf(subscriber) === -1) {
            this.subscribers.push(subscriber);
        }
    },
    
    removeSubscriber: function(subscriber) {
        var i = this.subscribers.indexOf(subscriber);
        if (i !== -1) {
            this.subscribers.splice(i,1);
        }
    },
    
    clearSubscribers: function() {
        this.subscribers = [];
    }
};

var KeyboardManager = function() {
    this.buttons = new InputMap();
};

KeyboardManager.prototype = {
    update: function() {
        this.buttons.x = game.input.keyboard.isDown(Phaser.KeyCode.RIGHT) - game.input.keyboard.isDown(Phaser.KeyCode.LEFT) +
                game.input.keyboard.isDown(Phaser.KeyCode.D) - game.input.keyboard.isDown(Phaser.KeyCode.A);
        this.buttons.y = game.input.keyboard.isDown(Phaser.KeyCode.DOWN) - game.input.keyboard.isDown(Phaser.KeyCode.UP) +
                game.input.keyboard.isDown(Phaser.KeyCode.S) - game.input.keyboard.isDown(Phaser.KeyCode.W);
        var dir = new Phaser.Point(this.buttons.x,this.buttons.y);
        dir.normalize();
        this.buttons.direction = dir;
        
        this.buttons.accept = game.input.keyboard.isDown(Phaser.KeyCode.ENTER);
        this.buttons.cancel = game.input.keyboard.isDown(Phaser.KeyCode.ESC);
        this.buttons.button1 = game.input.keyboard.isDown(Phaser.KeyCode.Z);
        this.buttons.button2 = game.input.keyboard.isDown(Phaser.KeyCode.X);
    }
};

var GamepadManager = function() {
    this.buttons = new InputMap();  
    this.deadzone = 0.27;
};

GamepadManager.prototype = {
    update: function() {
        if (!game.input.gamepad.pad1.connected) {
            return;
        }
        var x = game.input.gamepad.pad1.axis(0);
        var y = game.input.gamepad.pad1.axis(1);
        if (Math.abs(x) > this.deadzone) {
            this.buttons.x = x;
        } else {
            this.buttons.x = 0;
        }
        if (Math.abs(y) > this.deadzone) {
            this.buttons.y = y;
        } else {
            this.buttons.y = 0;
        }
        var dir = new Phaser.Point(game.input.gamepad.pad1.axis(0), game.input.gamepad.pad1.axis(1));
        if (dir.getMagnitude() > this.deadzone) {
            dir.normalize();
            this.buttons.direction = dir;
        } else {
            this.buttons.direction = new Phaser.Point(0,0);
        }

        this.buttons.accept = game.input.gamepad.pad1.isDown(9); // xbox start
        this.buttons.cancel = game.input.gamepad.pad1.isDown(8); // xbox select
        this.buttons.button1 = game.input.gamepad.pad1.isDown(0); // xbox a
        this.buttons.button2 = game.input.gamepad.pad1.isDown(2); // xbox x
    }
};

var VirtualPad = function() { // TODO: allow for virtual buttons that swallow mouse presses and don't trigger the pad
    this.pressed = false;
    this.lastPress = new Phaser.Point(0,0);
    this.currentPosition = new Phaser.Point(0,0);
    this.direction = new Phaser.Point(0,0);
};

VirtualPad.prototype = {
    update: function() {
        if (!this.pressed && game.input.activePointer.isDown) {
            this.pressed = true;
            this.lastPress.x = game.input.activePointer.screenX;
            this.lastPress.y = game.input.activePointer.screenY;
        }
        if (this.pressed) {
            this.currentPosition.x = game.input.activePointer.screenX;
            this.currentPosition.y = game.input.activePointer.screenY;
            this.direction = Phaser.Point.subtract(this.currentPosition,this.lastPress).normalize();
        }
        this.pressed = game.input.activePointer.isDown;
    }
};