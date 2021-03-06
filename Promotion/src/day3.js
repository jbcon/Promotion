var Day3Layer = cc.Layer.extend({
        
    ctor:function () {
        this._super();
        this.init();
        return true;
    },
    
    init:function () {
        var size = cc.winSize;
        
        // add background
        this.bg = new cc.Sprite(res.D3_bg_png);
        this.bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale:0.8
        });
        this.addChild(this.bg, 0);
    }
});

var Day3Scene = cc.Scene.extend({
    gameLayer: null,
    ki: 0,
    keyArray: [65,66,67],
    count:0,
    
    onEnter:function () {        
        this._super();
        this.gameLayer = cc.Layer.create(); // create game layer (layer that include background, and animation layer
        this.gameLayer.addChild(new Day3Layer());
        this.gameLayer.addChild(new Day3BossLayer(),0, TagOfLayer.D3Boss); // add background layer
        this.gameLayer.addChild(new Day3BubbleLayer());
        this.addChild(this.gameLayer);
    },
    
});

var GameOver = cc.Scene.extend({
    onEnter: function(){
        this._super();
        this.title = new cc.LabelTTF("GAME OVER", "Arial", 130);
        this.title.x = size.width / 2;
        this.title.y = size.height / 1.5;
        this.addChild(this.title);

        this.title2 = new cc.LabelTTF("SCORE: " + g_score, "Arial", 90);
        this.title2.x = size.width / 2;
        this.title2.y = size.height / 2.2;
        this.addChild(this.title2);
    }


});