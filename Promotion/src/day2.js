//globals

//bottommost ground height
var initialGroundHeight = 30;
//player start position
var playerStartX = 100;

function Day2Player (space, groundHeight){

	this.sprite = new cc.PhysicsSprite(res.day2player_png);
	var contentSize = this.sprite.getContentSize();

	this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
	this.body.setPos(cp.v(playerStartX, 500));
	space.addBody(this.body);
	this.shape = new cp.BoxShape(this.body, contentSize.width, groundHeight);
	space.addShape(this.shape);
	this.sprite.setBody(this.body);

	this.sprite.scheduleUpdate();
	this.sprite.update = function(dt){

	}

	
};


var Day2Layer = cc.Layer.extend({
	space: null,
	player: null,
	ctor: function(space){
		this._super();
		this.space = space;
		this.initPlayer();
		var size = cc.winSize;
		this.scheduleUpdate();
		this.addChild(this.player.sprite);
		var listener = cc.EventListener.create({
			event: cc.EventListener.KEYBOARD,
	        onKeyPressed:  function(keyCode, event){
	        	if (keyCode == 32){
	        		event.getCurrentTarget().jump();
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
	 	this.player.body.applyImpulse(cp.v(0,500), cp.v(.5,0));
	}
	
});

var Day2Scene = cc.Scene.extend({
	space: null,
	groundHeight: null,

	setGroundHeight: function(groundHeight){
		var floor = new cp.SegmentShape(this.space.staticBody,
			cp.v(0,groundHeight),	//leftmost point of floor
			cp.v(cc.winSize.width, groundHeight),	//rightmost point of floor
			groundHeight);	//floor thickness
		this.space.addStaticShape(floor);
		this.groundHeight = groundHeight;
	},

	initPhysics: function(){

		this.space = new cp.Space();
		this.space.gravity = cp.v(0,-2000);
		this.setGroundHeight(initialGroundHeight);
	},

	onEnter: function(){
		this._super();
		this.initPhysics();
		var layer = new Day2Layer(this.space);
		this.addChild(layer);
		this.scheduleUpdate();
	},

	update: function(dt){
		this.space.step(dt);
	}


});