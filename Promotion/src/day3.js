var Day3Layer = cc.Layer.extend({
    keyArray: [65,66,67],
    ki: 0,
    count: 0, // 0 = normal, 1 = happy, 2 = angry
        
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
        
        //sprite array
		spriteList = [res.D3_boss_normal_png, res.D3_boss_happy_png, res.D3_boss_angry_png];
        
        //sprite init
		this._sprite = cc.Sprite.create(spriteList[this.count]);
		this._sprite.attr({
			x: size.width / 4,
			y: 200,
			scale: 0.35
		});
		this.addChild(this._sprite);
        
        //keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                var tmp = event.getCurrentTarget().keyArray[event.getCurrentTarget().ki];
                    if(keyCode == tmp){
                        event.getCurrentTarget().ki +=1;
                        event.getCurrentTarget().count = 1;
                    }else{
                        event.getCurrentTarget().count = 2;
                    }
	        
            event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        	event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[event.getCurrentTarget().count]);
				event.getCurrentTarget()._sprite.attr({
					x: size.width / 4,
					y: 200,
					scale: 0.35
				});
				event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
            },
	        
            onKeyReleased: function(keyCode, event){
            
	        }
    	}, this); 
	},
    
});

var Day3Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Day3Layer();
        this.addChild(layer);
    }
});

