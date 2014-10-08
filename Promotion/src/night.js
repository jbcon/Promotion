var NightScene = cc.Scene.extend({
    space:null, // space
    gameLayer:null, // gamelayer that inculde background, animation layer
    shapesToRemove :[], // stuff to remove
    timer:0,
    
    onEnter:function () {
        this._super();
        this.initPhysics(); // initial physic
        this.gameLayer = cc.Layer.create(); // create game layer (layer that include background, and animation layer
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background); // add background layer
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation); // add animation layer
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status); // add status layer
        
        this.scheduleUpdate(); // update
    },
    
    // initial physic in the game
    initPhysics:function(){
        // create space
        this.space = new cp.Space();
        this.space.gravity = cp.v(0,-350);
        
        // create wall
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
                             cp.v(0,g_groundHight), cp.v(4294967295, 
                             g_groundHight), 0);
        this.space.addStaticShape(wallBottom);
        
        // create collision check for runner and wall
        this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.check,
        this.collisionCheckBegin.bind(this), null, null, null);
    },
    
    // collision handler for player and checks
    collisionCheckBegin:function(arbiter, space){
        var shapes = arbiter.getShapes();
        this.shapesToRemove.push(shapes[1]); // remove check from screen
        var statusLayer = this.getChildByTag(TagOfLayer.Status);
        statusLayer.addCheck(1); // add check point
    },
    
    // update check for chipmunk engine
    update:function(dt){
        this.space.step(dt); // update
    
        var animationLayer = this.gameLayer.getChildByTag(TagOfLayer.Animation); 
        var eyeX = animationLayer.getEyeX(); 
        this.gameLayer.setPosition(cc.p(-eyeX,0)); // update scope of the game
    
        // remove everything that is out of scope
        for(var i = 0; i < this.shapesToRemove.length; i++){
            var shape = this.shapesToRemove[i];
            this.gameLayer.getChildByTag(TagOfLayer.background).removeObjectByShape(shape);
        }
        this.shapesToRemove = [];
        
        this.timer +=1;
        if(this.timer == 10000){
            this.gameOver();
        }
    },
    
    gameOver:function(){
        cc.log("==game over");
        var sL = this.getChildByTag(TagOfLayer.Status);
        var ctmp = sL.checks;
        g_score += ctmp*100;
        if(g_nightState == 0){
            g_scene = 2;
        }else{
            g_scene = 4;
        }
        var scene = new TransitionScene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});

