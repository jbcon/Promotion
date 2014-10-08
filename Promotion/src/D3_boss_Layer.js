var Day3BossLayer = cc.Layer.extend({
    count: 0, // 0 = normal, 1 = happy, 2 = angry
    bossX: 2,
    bossY: 240,
    bossScale: 1,
    _sprite:null,
    change: -1,
        
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
        
        this.scheduleUpdate();
    },
    
    bossStatusChange:function(status){
        this.removeChild(this._sprite,true);
        this._sprite = cc.Sprite.create(bossSpriteList[status]);
            this._sprite.attr({
				x: size.width / this.bossX,
				y: this.bossY,
				scale: this.bossScale,
			});
        this.addChild(this._sprite);
        
        if(this.change == -1){
        this.change = 0;
        }
    },
    
    update:function (dt) {
        if(this.change !=-1){
            if(this.change == 100){
                this.removeChild(this._sprite,true);
                this._sprite = cc.Sprite.create(bossSpriteList[0]);
                this._sprite.attr({
                    x: size.width / this.bossX,
                    y: this.bossY,
                    scale: this.bossScale,
                });
                this.addChild(this._sprite);
                this.change = -1;
            }else{
                this.change += 1;
            }
        }
    }
});

