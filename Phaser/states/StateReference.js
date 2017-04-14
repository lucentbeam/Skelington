
BasicGame.StateReference = function (game) {
    
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
};

BasicGame.StateReference.prototype = {

    init: function() {
        // called at state startup, before preload
        // can initialize variables or reroute to other states
    },
    
    preload: function() {
        // called after init, and shouldn't use assets that are loaded
        // within it (not yet available)
    },
    
    loadUpdate: function() {
        // called during loader process
        // only occurs if preload loads one or more objects
    },
    
    loadRender: function() {
        // called during loader process
        // only occurs if preload loads one or more objects
        // must use existing assets
    },
    
    create: function () {
        // called after preload
    },
    
    paused: function() {
        // called on core game loop paused
    },
    
    pauseUpdate: function() {
        // called instead of update while game is paused
    },
    
    resumed: function() {
        // called after core game loop resumes from pause state
    },
    
    update: function () {
        // after debug, physics, and stage have preUpdate called
        // but before stage, tweens, sounds, input, physics, and particles have postUpdate called
    },
    
    preRender: function() {
        // after all objects are updated, but before any rendering
    },
    
    render: function() {
        // called after game renderer and plugins are renderer
        // post effects added here
    },
    
    resize: function() {
        // called after browser resizes if scalemode is set to RESIZE
    },
    
    shutdown: function() {
        // called when another state is loaded from this one
    }

};