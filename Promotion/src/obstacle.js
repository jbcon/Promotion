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