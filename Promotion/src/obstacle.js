var Obstacle = cc.Node.extend({
	space: null,
	sprite: null,
	shape: null,

	ctor: function(image, space, posX, posY){
		this._super();
		this.space = space;
		this.sprite = cc.PhysicsSprite.create(image);
		var body = new cp.StaticBody();
		body.setPos(cc.p(posX, posY));
		this.sprite.setBody(body);
		this.addChild(this.sprite);

		var contentSize = this.sprite.getContentSize();
		this.shape = new cp.BoxShape(body, contentSize.width, contentSize.height);
		this.shape.setCollisionType(SpriteTag.obstacle);
		this.scheduleUpdate();
		this.space.addStaticShape(this.shape);

	},

	update: function(dt){

	}
});

var Desk = cc.Node.extend({
	ctor: function(image,space,posX, posY){
		this._super();
		this.space = space;
		this.sprite = cc.PhysicsSprite.create(image);
		var body = new cp.StaticBody();
		this.sprite.setBody(body);
		this.addChild(this.sprite);
		this.drawnSprite = new cc.Sprite(image);
		this.drawnSprite.setPosition(cc.p(posX, posY));
		this.addChild(this.drawnSprite);


		var contentSize = this.sprite.getContentSize();
		this.shape = new cp.SegmentShape(body,
			cp.v(posX,0),	//leftmost point of floor
			cp.v(posX+contentSize.width, 0),	//rightmost point of floor
			0);	//floor thickness
		//this.shape.setCollisionType(SpriteTag.desk);
		this.scheduleUpdate();
		this.drawnSprite.scheduleUpdate();
		this.space.addStaticShape(this.shape);

	},
	update: function(dt){

	}
})