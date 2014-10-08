//globals

//bottommost ground height
var initialGroundHeight = 50;
//player start position
var playerStartX = 100;
var gameSpeed = 700;

//jumping enum
if(typeof RunnerStat == "undefined") {
    var RunnerStat = {};
    RunnerStat.running = 0;
    RunnerStat.jumpUp = 1;
    RunnerStat.jumpDown = 2;
};


function Day2Player (space, groundHeight){

	cc.spriteFrameCache.addSpriteFrames(res.D2_run_plist);
	this.spriteSheet = cc.SpriteBatchNode.create(res.D2_run_png);

	var animFrames = [];
	for (var i = 1; i < 7; i++){
		var str = "D2_run_f" + i + ".png";
		var frame = cc.spriteFrameCache.getSpriteFrame(str);
		animFrames.push(frame);
	}

	var animation = cc.Animation.create(animFrames, 0.05);
	this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
	this.sprite = new cc.PhysicsSprite("#D2_run_f1.png");
	this.sprite.runAction(this.runningAction);
	this.playerSpeed = gameSpeed;

	this.sprite.attr({
		scale: 0.25
	});

	var contentSize = this.sprite.getContentSize();

	this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
	

	//set player start position
	this.body.setPos(cp.v(playerStartX, initialGroundHeight+contentSize.height/2));
	space.addBody(this.body);

	this.body.applyImpulse(cp.v(this.playerSpeed, 0), cp.v(0,0));

	//create player shape
	this.shape = new cp.BoxShape(this.body, contentSize.width, groundHeight);
	space.addShape(this.shape);

	//assign body to player sprite
	this.sprite.setBody(this.body);

	this.sprite.scheduleUpdate();
	this.sprite.update = function(dt){

	}

	
};

var Day2BgLayer = cc.Layer.extend({
	map0: null,
	map1: null,
	space: null,
	ctor: function(space){
		this._super();
		this.space = space;
		this.map0 = new cc.Sprite(res.day2bg_png);
		this.map1 = new cc.Sprite(res.day2bg_png);

		this.map0.setPosition(cc.p(this.map0.width/2 ,this.map0.height/2));
		this.map1.setPosition(cc.p(this.map0.getPositionX()+this.map0.width, this.map1.height/2));
		this.addChild(this.map0);
		this.addChild(this.map1);
		this.map0.scheduleUpdate();
		this.map1.scheduleUpdate();

		this.map0.update = function(dt){}
		this.map1.update = function(dt){}
		return true;

	},

	update: function(dt){
		if (this.map0)

		var newPos = this.map0.getPositionX()+this.map0.width;
		this.map1.setPosition(cc.p(newPos, this.map0.height/2));
	}

});

var Day2Layer = cc.Layer.extend({
	space: null,
	player: null,
	keyIsPressed: false,
	state: RunnerStat.running,
	ctor: function(space){
		this._super();
		this.space = space;
		this.initPlayer();
		var size = cc.winSize;
		this.scheduleUpdate();
		this.addChild(this.player.sprite);
		//if space was pressed
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

	},
	initPlayer: function(){
		this.player = new Day2Player(this.space, 30);
	},

	jump: function(){
		if (this.state == RunnerStat.running){
		 	this.player.body.applyImpulse(cp.v(0,700), cp.v(0,0));
		 	this.state = RunnerStat.jumpUp;
		}
	},

	getMovementX: function(){
		return this.player.sprite.getPositionX() - playerStartX;
	},

	update: function(dt){
		var vel = this.player.body.getVel();

        if (this.state == RunnerStat.jumpUp) {
            if (vel.y < 0) {
                this.state = RunnerStat.jumpDown;
            }
        }
        else if (this.state == RunnerStat.jumpDown) {
            if (vel.y < 10 && vel.y > -10) {
                this.state = RunnerStat.running;
            }
        }
	}
	
});

var Day2Scene = cc.Scene.extend({
	space: null,
	groundHeight: initialGroundHeight,
	groundWidth: 1000000,
	layer: null,
	bgLayer: null,

	//number of times the background scrolls offscreen
	numTimesBgScrolledOffscreen: 0,

	setGroundHeight: function(){
		var floor = new cp.SegmentShape(this.space.staticBody,
			cp.v(0,this.groundHeight),	//leftmost point of floor
			cp.v(this.groundWidth, this.groundHeight),	//rightmost point of floor
			this.groundHeight);	//floor thickness
		this.space.addStaticShape(floor);
	},

	initPhysics: function(){

		this.space = new cp.Space();
		this.space.gravity = cp.v(0,-2000);
		this.setGroundHeight();
	},

	onEnter: function(){
		this._super();
		this.initPhysics();
		this.bgLayer = new Day2BgLayer(this.space);
		this.addChild(this.bgLayer);
		this.layer = new Day2Layer(this.space);
		this.addChild(this.layer);

		
		this.scheduleUpdate();
	},

	update: function(dt){
		this.space.step(dt);
		var movement = this.layer.getMovementX();
		this.layer.setPosition(cc.p(-movement, 0));

		//reposition the backgrounds
		if (this.bgLayer.getPositionX() < 
			(1+this.numTimesBgScrolledOffscreen)*-this.bgLayer.map0.width){
			var tempMap = this.bgLayer.map0;
			this.bgLayer.map0 = this.bgLayer.map1;
			this.bgLayer.map1 = tempMap;
			this.bgLayer.map1.setPosition(cc.p(this.bgLayer.map0.getPositionX()
				+this.bgLayer.map0.width, this.bgLayer.map1.height/2));

			this.numTimesBgScrolledOffscreen++;

		}


		this.bgLayer.setPosition(cc.p(-movement,0));
	}


});