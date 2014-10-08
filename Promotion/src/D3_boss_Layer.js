var Day3BossLayer = cc.Layer.extend({
    count: 0, // 0 = normal, 1 = happy, 2 = angry
    bossX: 3,
    bossY: 300,
    bossScale: 0.50,
        
    ctor:function () {
        this._super();
        this.init();
        return true;
    },
    
    init:function () {
        size = cc.winSize;
                
        //sprite array
		bossSpriteList = [res.D3_boss_normal_png, res.D3_boss_happy_png, res.D3_boss_angry_png];
        
        //sprite init
		this._sprite = cc.Sprite.create(bossSpriteList[this.count]);
		this._sprite.attr({
			x: size.width / this.bossX,
			y: this.bossY,
			scale: this.bossScale
		});
        
        this.addChild(this._sprite);
    },
});

