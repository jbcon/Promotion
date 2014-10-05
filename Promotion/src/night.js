
var NightScene = cc.Scene.extend({
    space:null,
    gameLayer:null,
    shapesToRemove :[],
    
    onEnter:function () {
        this._super();
        this.initPhysics();
        this.gameLayer = cc.Layer.create();
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
        
        this.scheduleUpdate();
    },
    
    initPhysics:function(){
    this.space = new cp.Space();
    this.space.gravity = cp.v(0,-350);
    var wallBottom = new cp.SegmentShape(this.space.staticBody,
    cp.v(0,g_groundHight), cp.v(4294967295, g_groundHight), 0);
    this.space.addStaticShape(wallBottom);
    
    this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.check,
    this.collisionCheckBegin.bind(this), null, null, null);
    },
    
    collisionCheckBegin:function(arbiter, space){
    var shapes = arbiter.getShapes();
    this.shapesToRemove.push(shapes[1]);
    },
    
    update:function(dt){
    this.space.step(dt);
    
    var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation);
    var eyeX = animationLayer.getEyeX();
    
    this.gameLayer.setPosition(cc.p(-eyeX,0));
    
    for(var i = 0; i < this.shapesToRemove.length; i++){
    var shape = this.shapesToRemove[i];
    this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
    }
    this.shapesToRemove = [];
    }
});

