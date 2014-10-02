// define enum for runner status
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
};

var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    space:null,
    body:null,
    shape:null,
    stat:RunnerStat.running,
    jumpUpAction:null,
    jumpDownAction:null,
    keyIsPressed: false,
    
    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
        
        this._debugNode = cc.PhysicsDebugNode.create(this.space);
        this._debugNode.setVisible(false);
        this.addChild(this._debugNode,10);
    },
    
    init:function () {
        this._super();

        //create the hero sprite
        cc.spriteFrameCache.addSpriteFrames(res.N_runner_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.N_runner_png);
        this.addChild(this.spriteSheet);
        
        this.initAction();
        
        //create runner through physic engine
        this.sprite = cc.PhysicsSprite.create("#N_Player_test_1.png");
        var contentSize = this.sprite.getContentSize();
        // init body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(g_runnerStartX, g_groundHight + contentSize.height / 2);
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        this.space.addBody(this.body);
        //init shape
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        this.space.addShape(this.shape);
        
        this.sprite.setBody(this.body);        
        this.sprite.runAction(this.runningAction);
        
        this.spriteSheet.addChild(this.sprite);
        
        var listener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
	        onKeyPressed:  function(keyCode, event){
	        	var thisThing = event.getCurrentTarget();
	        	if (keyCode == 32 && !thisThing.keyIsPressed){
	        		thisThing.jump();
	        		thisThing.keyIsPressed = true;
	        	}
	        },
	        onKeyReleased: function(keyCode, event){
	        	if (keyCode == 32){
	        		event.getCurrentTarget().keyIsPressed = false;
	        	}
	        }
	    });
		cc.eventManager.addListener(listener, this);
        
        this.scheduleUpdate();
    },
    
    jump: function(){
		cc.log("jump");
        if(this.stat == RunnerStat.running){
        this.body.applyImpulse(cp.v(0,500), cp.v(0,0));
        this.stat = RunnerStat.jumpUp;
        this.sprite.stopAllActions();
        this.sprite.runAction(this.jumpUpAction);
        }	
	},
    
    initAction:function(){
        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 8; i++) {
            var str = "N_Player_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
                
        var animation = cc.Animation.create(animFrames, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.runningAction.retain();
        
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "N_Player_Jump_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        animation = cc.Animation.create(animFrames, 0.2);
        this.jumpUpAction = cc.Animate.create(animation);
        this.jumpUpAction.retain();
        
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "N_Player_Jump_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        animation = cc.Animation.create(animFrames, 0.3);
        this.jumpDownAction = cc.Animate.create(animation);
        this.jumpDownAction.retain();  
    },
    
     update:function (dt) {
        
        this.space.step(dt);
        
        // check and update runner stat
        var vel = this.body.getVel();
        if (this.stat == RunnerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = RunnerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == RunnerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = RunnerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        }

    },
    
    onExit:function() {
        this.runningAction.release();
        this.jumpUpAction.release();
        this.jumpDownAction.release();
        this._super();
    },
    
    getEyeX:function () {
        return this.sprite.getPositionX() - g_runnerStartX;
    }
});