var Day3Layer = cc.Layer.extend({
    keyArray: [65,66,67],
    ki: 0,
    target:null,
        
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
        });
        this.addChild(this.bg, 0);
        
        //keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                var tmp = event.getCurrentTarget().keyArray[event.getCurrentTarget().ki];
                    if(keyCode == tmp){
                        cc.log("Correct!");
                        event.getCurrentTarget().ki +=1;
                    }
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

