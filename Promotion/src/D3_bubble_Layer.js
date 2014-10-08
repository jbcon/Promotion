var Day3BubbleLayer = cc.Layer.extend({
    size: 0,
    bubbleX: 1.8,
    bubbleY: 500,
    bubbleScale: 0.50,
    target:1,
        
    ctor:function () {
    
        this._super();
        this.init();
        return true;
    },
    
    init:function () {
        size = cc.winSize;
                
        //sprite array
		bubbleSpriteList = [res.D3_boss_65_png, res.D3_boss_66_png, 
                            res.D3_boss_68_png, res.D3_boss_69_png,
                            res.D3_boss_73_png, res.D3_boss_76_png,
                            res.D3_boss_80_png, res.D3_boss_81_png,
                            res.D3_boss_83_png, res.D3_boss_84_png,
                            res.D3_boss_85_png,];
        
        //sprite init
		this._sprite = cc.Sprite.create(bubbleSpriteList[0]);
		this._sprite.attr({
			x: size.width / this.bubbleX,
			y: this.bubbleY,
			scale: this.bubbleScale
		});
        
        this.addChild(this._sprite);
    },
    
    playBubble:function(bubbleSpriteList){
    cc.log("play bubble");
        this.bubblesprite = cc.Sprite.create(bubbleSpriteList[0]);
		this.bubblesprite.attr({
			x: this.size.width / bubbleX,
			y: this.bubbleY,
			scale: this.bubbleScale
		});
		this.addChild(this.bubblesprite);
    }
    
});

