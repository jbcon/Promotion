var g_groundHight = 57;
var g_runnerStartX = 80;
var g_score = 0;
var g_multiplier = 0;
var g_scene = -1;


// layer type
if(typeof TagOfLayer == "undefined"){
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.Status = 2;
    TagOfLayer.D3Boss = 4;
};

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.runner = 0;
    SpriteTag.check = 1;
};