var Day3BubbleLayer = cc.Layer.extend({
    keyArray: [65,66,67],
    size: 0,
    bubbleX: 1.7,
    bubbleY: 500,
    bubbleScale: 0.50,
    ki:0,
    status:1,
    change:-1,
        
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
                
        this.displayBubble(4);
        
        //keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                var tmp = event.getCurrentTarget().keyArray[event.getCurrentTarget().ki];
                    
                    var D3BossLayer = event.getCurrentTarget().getParent().getChildByTag(TagOfLayer.D3Boss);
                    
                    if(keyCode == tmp){
                        event.getCurrentTarget().ki +=1;
                        D3BossLayer.bossStatusChange(1);
                    }else{
                        D3BossLayer.bossStatusChange(2);
                    }                   
            },
            
            onKeyReleased: function(keyCode, event){
            //set delay (ms) for desk animation
	        	setTimeout(function() {
	        	}, 80);	 
	        } 
        }, this);   
        
        this.scheduleUpdate();
    },
    
    displayBubble:function(key){
        //sprite init
        this._sprite = cc.Sprite.create(bubbleSpriteList[key]);
        this._sprite.attr({
			x: size.width / this.bubbleX,
			y: this.bubbleY,
			scale: this.bubbleScale
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
                this.change = -1;
            }else{
                this.change += 1;
            }
        }
    }    
});

