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

        // initialize check animation
        var animFrames = [];
        for (var i = 0; i < 8; i++) {
            var str = "N_check_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.2);
        var action = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // initialize sprite
        this.sprite = cc.PhysicsSprite.create("#N_check_0.png");
        
        // initialize physics
        var radius = 0.95 * this.sprite.getContentSize().width / 2;
        var body = new cp.StaticBody();
        body.setPos(pos);
        this.sprite.setBody(body);

        // initialize rigid body
        this.shape = new cp.CircleShape(body, radius, cp.vzero);
        this.shape.setCollisionType(SpriteTag.check);
        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);
        this.space.addStaticShape(this.shape);

        // add sprite to sprite sheet
        this.sprite.runAction(action);
        spriteSheet.addChild(this.sprite, 1);
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