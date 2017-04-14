//////////////////////////////////////////////////
//   sprites
//////////////////////////////////////////////////
var imageData = [
//    {
//        key: "",                                    REQUIRED; used by Ben and hard-coded into game (preferably don't change)
//        file: "required.png",                       REQUIRED; relative to gfx folder, includes file type
//        scale: 1,                                   OPTIONAL; scale of the sprite in game
//        animated: {width: 64, height: 64},          OPTIONAL; specifies image as animated, width/height are required   
//        animationCycles: [                          REQUIRED if animated; list of animation names, their frames, and framerate
//              run: {frames: [3,4,5,4], fps: 10},                          preferably don't change animation names (run/walk) after 
//              walk: {frames: [0,1,2,1], fps: 4}                           they've been created; will need to hard-code references
//        ]                                                                 frames are 0-index, count left-to-right, and include blanks
//    },                                     comma after every entry except the last
    {
        key: "preloader-background",
        file: "preloader-background.png"
    },
    {
        key: "preloader-bar",
        file: "preloader-bar.png"
    },
    {
        key: "title-page",
        file: "title-page.png"
    },
    {
        key: "play-button",
        file: "play-button.png"
    },
    {
        key: "gameover-page",
        file: "gameover-page.png"
    },
    {
        key: "player-sprite",
        file: "player-sprite.png",
        scale: 2,
        animated: {width: 64, height: 64},
        animationCycles: {
            run: {frames: [0,1,2,1], fps: 5},
            walk: {frames: [3,4,5,4], fps: 2}
        }
    }
]



//////////////////////////////////////////////////
//   tuning parameters
//////////////////////////////////////////////////
var forExampleEnemySpawnDelay = 5000; // in ms



//////////////////////////////////////////////////
//   settings
//////////////////////////////////////////////////
var size = { x: 1920, y: 1080 }
var minSize = { x: 512, y:288 }
var maxSize = { x: 2560, y:1440 }