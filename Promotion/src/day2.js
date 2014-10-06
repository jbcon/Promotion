//globals

//bottommost ground height
var initialGroundHeight = 30;
//player start position
var playerStartX = 100;
var gameSpeed = 400;


function Day2Player (space, groundHeight){

	this.sprite = new cc.PhysicsSprite(res.day2player_png);
	var contentSize = this.sprite.getContentSize();
	this.playerSpeed = gameSpeed;

	this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
	
	//set player start position
	this.body.setPos(cp.v(playerStartX, 500));
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
		console.log("TEST");
	 	this.player.body.applyImpulse(cp.v(0,500), cp.v(0,0));
	},

	getMovementX: function(){
		return this.player.sprite.getPositionX() - playerStartX;
	},

	update: function(dt){

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

		console.log(this.bgLayer.getPositionX());
		console.log(this.bgLayer.map0.width);

		//reposition the backgrounds
		if (this.bgLayer.getPositionX() < 
			(1+this.numTimesBgScrolledOffscreen)*-this.bgLayer.map0.width){
			var tempMap = this.bgLayer.map0;
			this.bgLayer.map0 = this.bgLayer.map1;
			this.bgLayer.map1 = tempMap;
			this.bgLayer.map1.setPosition(cc.p(this.bgLayer.map0.getPositionX()
				+this.bgLayer.map0.width, this.bgLayer.map1.height/2));

			this.numTimesBgScrolledOffscreen++;
			console.log("OFFSCREEN");

		}


		this.bgLayer.setPosition(cc.p(-movement,0));
	}


});