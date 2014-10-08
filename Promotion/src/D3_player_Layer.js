var Day3PlayerLayer = cc.Layer.extend({
    keyArray: [65,66,67],
    size: 0,
    ki: 0,
    count: 0, // 0 = normal, 1 = happy, 2 = angry
    bossX: 3,
    bossY: 300,
    bossScale: 0.50,
    target:1,
        
    ctor:function () {
    
        this._super();
        this.init();
        return true;
    },
    
    init:function () {
        size = cc.winSize;
        
        // add background
        this.bg = new cc.Sprite(res.D3_bg_png);
        this.bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale:0.8
        });
        this.addChild(this.bg, 0);
        
        //sprite array
		bossSpriteList = [res.D3_boss_normal_png, res.D3_boss_happy_png, res.D3_boss_angry_png];
        bubbleSprite =[res.D3_boss_a_png];
        
        //sprite init
		this._sprite = cc.Sprite.create(bossSpriteList[this.count]);
		this._sprite.attr({
			x: size.width / this.bossX,
			y: this.bossY,
			scale: this.bossScale
		});
		
        this.addChild(this._sprite);
        
        this.playBubble(bubbleSprite);
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
	        	event.getCurrentTarget()._sprite = cc.Sprite.create(bossSpriteList[event.getCurrentTarget().count]);
				event.getCurrentTarget()._sprite.attr({
					x: size.width / event.getCurrentTarget().bossX,
					y: event.getCurrentTarget().bossY,
					scale: event.getCurrentTarget().bossScale
				});
				event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
            },
	        
            onKeyReleased: function(keyCode, event){
            //set delay (ms) for desk animation
	        	setTimeout(function() {
	        		event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        		event.getCurrentTarget()._sprite = cc.Sprite.create(bossSpriteList[0]);
					event.getCurrentTarget()._sprite.attr({
					x: size.width / event.getCurrentTarget().bossX,
					y: event.getCurrentTarget().bossY,
					scale: event.getCurrentTarget().bossScale
					});
					event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	        	}, 80);	 
	        }
    	}, this); 
	},
    
    playBubble:function(bubbleSpriteList){
    cc.log("play bubble");
        this.bubblesprite = cc.Sprite.create(bubbleSpriteList[0]);
		this.bubblesprite.attr({
			x: this.size.width / 1,
			y: this.bossY,
			scale: this.bossScale
		});
		this.addChild(this.bubblesprite);
    }
    
});

