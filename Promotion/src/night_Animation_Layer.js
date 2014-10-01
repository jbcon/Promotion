var AnimationLayer = cc.Layer.extend({
    spriteSheet: null,
    runningAction: null,
    sprite: null,
    
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        //create the hero sprite
        cc.spriteFrameCache.addSpriteFrames(res.N_runner_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.N_runner_png);
        this.addChild(this.spriteSheet);
        
        
        
        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 8; i++) {
            var str = "N_Player_test_" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        
        //create the move action
        var animation = cc.Animation.create(animFrames, 0.1);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.sprite = cc.Sprite.create("#N_Player_test_1.png");
        this.sprite.attr({x: 80, y: 85});
        this.sprite.runAction(this.runningAction);
        this.spriteSheet.addChild(this.sprite);
    }
});