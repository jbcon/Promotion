//globals

//bottommost ground height
var initialGroundHeight = 30;
//player start position
var playerStartX = 100;

function Day2Player (space, groundHeight){

	this.sprite = new cc.PhysicsSprite(res.D2_run_f1_png);
	var contentSize = this.sprite.getContentSize();
	this.playerSpeed = 50;


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
	}
	
});

var Day2Scene = cc.Scene.extend({
	space: null,
	groundHeight: initialGroundHeight,
	groundWidth: 1000000,

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
		var layer = new Day2Layer(this.space);
		this.addChild(layer);
		this.scheduleUpdate();
	},

	update: function(dt){
		this.space.step(dt);
	}


});