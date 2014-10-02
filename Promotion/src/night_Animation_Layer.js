// define enum for player status
if(typeof PlayerStat == "undefined") {
    var playerStat = {}; // player's status
    playerStat.running = 0; // set player currently to running
    playerStat.jumpUp = 1; // number represent for player jump
    playerStat.jumpDown = 2; // number represent for player fall
};

var AnimationLayer = cc.Layer.extend({
    spriteSheet: null, // spriteSheet for player
    runningAction: null, // running action for player
    sprite: null, // sprite for player
    space:null, // space
    body:null, // body for player
    shape:null, // shape for player 
    stat:playerStat.running, // status of player
    jumpUpAction:null, // bool for jump up
    jumpDownAction:null, // bool for jump down
    keyIsPressed: false, // check if "space" is clicked
    
    // constructor
    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();
        
        /* for debug
        this._debugNode = cc.PhysicsDebugNode.create(this.space);
        this.addChild(this._debugNode,10);
        */
    },
    
    // initialize
    init:function () {
        this._super();

        // initialize player's animation
        this.initAction();
        
        //create the player sprite
        cc.spriteFrameCache.addSpriteFrames(res.N_runner_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.N_runner_png);
        this.addChild(this.spriteSheet);
        
        //create player through physic engine
        this.sprite = cc.PhysicsSprite.create("#N_Player_test_1.png");
        var contentSize = this.sprite.getContentSize();
        
        // initialize body
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(g_playerStartX, g_groundHight + contentSize.height / 2);
        this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
        this.space.addBody(this.body);
        
        //initialize shape
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        this.space.addShape(this.shape);
    
        // initialize sprite 
        this.sprite.setBody(this.body);        
        this.sprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.sprite);
        
        // set up listener for "space" (the "jump" key)
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
		cc.eventManager.addListener(listener, this); // add listener
        
        this.scheduleUpdate(); // update
    },
    
    // jump action
    jump: function(){
		//cc.log("jump"); for debug
        if(this.stat == playerStat.running){ 
        this.body.applyImpulse(cp.v(0,500), cp.v(0,0)); // apply effect on player
        this.stat = playerStat.jumpUp; // switch status
        this.sprite.stopAllActions(); // switch animation
        this.sprite.runAction(this.jumpUpAction);
        }	
	},
    
    // initialize player's movement
    initAction:function(){
        // initialize running animation
        var animFrames = [];
        for (var i = 1; i < 8; i++) {
            var str = "N_Player_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        // initialize runningAction 
        var animation = cc.Animation.create(animFrames, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.runningAction.retain();
        
        // initialize jumpUp animation
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "N_Player_Jump_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        // initialize jumpUpAction
        animation = cc.Animation.create(animFrames, 0.2);
        this.jumpUpAction = cc.Animate.create(animation);
        this.jumpUpAction.retain();
        
        // initialize jumpDown
        animFrames = [];
        for (var i = 0; i < 4; i++) {
            var str = "N_Player_Jump_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        // initialize jumpDown Action
        animation = cc.Animation.create(animFrames, 0.3);
        this.jumpDownAction = cc.Animate.create(animation);
        this.jumpDownAction.retain();  
    },
    
    // update for chipmunk engine
     update:function (dt) {
        
        this.space.step(dt); //update 
        
        // check and update player stat and switch between animation
        var vel = this.body.getVel();
        if (this.stat == playerStat.jumpUp) {
            if (vel.y < 0.1) {
                this.stat = playerStat.jumpDown;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.jumpDownAction);
            }
        } else if (this.stat == playerStat.jumpDown) {
            if (vel.y == 0) {
                this.stat = playerStat.running;
                this.sprite.stopAllActions();
                this.sprite.runAction(this.runningAction);
            }
        }

    },
    
    // when exit scene, clean stuff up
    onExit:function() {
        this.runningAction.release();
        this.jumpUpAction.release();
        this.jumpDownAction.release();
        this._super();
    },
    
    // get scope of the game
    getEyeX:function () {
        return this.sprite.getPositionX() - g_playerStartX;
    }
});