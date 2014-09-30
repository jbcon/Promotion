//globals

//bottommost ground height
var initialGroundHeight = 30;

var Day2Player = cc.Sprite.extend({
	ctor: function(){
		this._super(res.day2player_png);
		this.setPosition(cc.winSize.width/2, initialGroundHeight);
		this.scheduleUpdate();
	},

	update: function(dt){
		console.log("TEST");
	}


});

var Day2Layer = cc.Layer.extend({
	space: null;
	sprite: null;
	ctor: function(space){
		this._super();
		this.space = space;
		//this.initPlayer();
		this.sprite = new Day2Player();
		var size = cc.winSize;
		this.scheduleUpdate();
		this.addChild(this.sprite);

	},
	initPlayer: function(){
		this.sprite = new cc.PhysicsSprite("#player");
		var contentSize = this.sprite.getContentSize();
		this.body = new cp.Body
	}
});

var Day2Scene = cc.Scene.extend({
	space: null;

	setGroundHeight: function(groundHeight){
		var floor = new cp.SegmentShape(this.space.staticBody,
			cp.v(0,groundHeight),	//leftmost point of floor
			cp.v(cc.winSize.width, groundHeight),	//rightmost point of floor
			groundHeight);	//floor thickness
		this.space.addStaticShape(wallBottom);
	},

	initPhysics: function(){

		this.space = new cp.Space();
		this.space.gravity = cp.v(0,-350);
		setGroundHeight(initialGroundHeight);
	},

	onEnter: function(){
		this._super();
		var layer = new Day2Layer(space);
		this.addChild(layer);
		this.scheduleUpdate();
	}

});