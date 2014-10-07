var Check = cc.Class.extend({
    space:null, // space
    sprite:null, // sprite for check
    shape:null, // shape for check
    _mapIndex:0,// which map belongs to
    
    // get whick map need it
    get mapIndex() {
        return this._mapIndex;
    },
    
    // initialize map need it
    set mapIndex(index) {
        this._mapIndex = index;
    },

    // Constructor
    ctor:function (spriteSheet, space, pos) {
        this.space = space;

        this.sprite = cc.PhysicsSprite.createWithSpriteFrameName("#check.png");
        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        this.shape = new cp.BoxShape(body,
            this.sprite.getContentSize().width,
            this.sprite.getContentSize().height);
        this.shape.setCollisionType(SpriteTag.check);

        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);

        this.space.addStaticShape(this.shape);
        spriteSheet.addChild(this.sprite);
    },

    // remove check
    removeFromParent:function () {
        this.space.removeStaticShape(this.shape);
        this.shape = null;
        this.sprite.removeFromParent();
        this.sprite = null;
    },

    // return shape
    getShape:function () {
        return this.shape;
    }
});