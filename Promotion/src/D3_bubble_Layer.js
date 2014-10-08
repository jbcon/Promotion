var Day3BubbleLayer = cc.Layer.extend({
    size: 0,
    display:0,
    di:0,
    keyArray: [65,66,67,68,69,73,76,80,81,83,84,85],
    ansArray: [],
    ki:0,
    ai:0,
    target:2,
    bubbleX: 1.7,
    bubbleY: 500,
    bubbleScale: 0.50,
    change:-1,
    change2:-1,
    gameOver:0,
    mistakes:0,
    
    
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
                            res.D3_boss_85_png];
            
        bubbleSpriteList2 = [res.D3_player_65_png, res.D3_player_66_png,
                             res.D3_player_68_png, res.D3_player_69_png,
                             res.D3_player_73_png, res.D3_player_76_png,
                             res.D3_player_80_png, res.D3_player_81_png,
                             res.D3_player_83_png, res.D3_player_84_png,
                             res.D3_player_85_png, res.D3_player_90_png];   
            
        // add player
        this.player = new cc.Sprite(res.D3_player_png);
        this.player.attr({
            x: size.width / 1.3,
            y: size.height / 2,
            scale:2
        });
        this.addChild(this.player, 0);
        
        //keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
            if(event.getCurrentTarget().display == 1){
                if(event.getCurrentTarget().ki < event.getCurrentTarget().target){
                 
                 var tmp = event.getCurrentTarget().keyArray[event.getCurrentTarget().ki];
                 var D3BossLayer = event.getCurrentTarget().getParent().getChildByTag(TagOfLayer.D3Boss);
                    
                    if(keyCode == tmp){
                        event.getCurrentTarget().displayBubble2(event.getCurrentTarget().ki);
                        event.getCurrentTarget().ki +=1;
                        D3BossLayer.bossStatusChange(1);
                    }else{
                        event.getCurrentTarget().displayBubble2(11);
                        D3BossLayer.bossStatusChange(2);
                    }
                }                
            }
            }, // onKeyPress
        }, this);   
        
        this.scheduleUpdate();
    },
        
    displayBubble:function(key){
        //sprite init
        this.player_b = cc.Sprite.create(bubbleSpriteList[key]);
        this.player_b.attr({
			x: size.width / this.bubbleX,
			y: this.bubbleY,
			scale: this.bubbleScale
		});
        this.addChild(this.player_b);
        if(this.change == -1){
        this.change = 0;
        }
    },
    
    displayBubble2:function(key){
        //sprite init
        this.boss_b = cc.Sprite.create(bubbleSpriteList2[key]);
        this.boss_b.attr({
			x: size.width / 2.5,
			y: this.bubbleY,
			scale: this.bubbleScale
		});
        this.addChild(this.boss_b);
        if(this.change2 == -1){
        this.change2 = 0;
        this.di = 1;
        }
    },
    
    update:function (dt) {
        if(this.target < this.keyArray.length && this.gameOver == 0){   
            if(this.display == 0){
                if(this.di == 0){
                    if(this.ki < this.target){
                        this.displayBubble(this.ki);
                        this.ki+=1;
                        this.di = 1;
                    }else{
                        this.ki = 0;
                        this.display = 1;
                    }
                }
            }else{
                if(this.ki == this.target){
                    this.ki = 0;
                    this.display = 0;
                    this.target += 1;
                }
            }            
        }
        
        if(this.change > -1){
            if(this.change > 200){
                this.removeChild(this.player_b,true);
                this.change = -1;
                this.di = 0;
            }else{
                this.change += 1;
            }
        }  

        if(this.change2 > -1){
            if(this.change2 > 100){
                this.removeChild(this.boss_b,true);
                this.change2 = -1;
                this.di = 0;
            }else{
                this.change2 += 1;
            }
        }         
    }
});

