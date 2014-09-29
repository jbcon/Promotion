
var Day1Layer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//super init
		this._super();
		//get window size
		var size = cc.winSize;
		//maybe screen with "day 1"
		var label = new cc.LabelTTF("Day 1", "Arial", 40);
		label.x = size.width / 2;
		label.y = size.width / 4;
		this.addChild(label);
		//init music
		
		//desk+player sprite
		this.sprite = new cc.Sprite(res.desk);
		this.sprite.attr({
			x: size.width / 2,
			y: size.height / 2,
			scale: 0.35
		});
		this.addChild(this.sprite, 0);

		//add a keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed:  function(keyCode, event){
	            var label = keyCode.toString();
	            console.log(label);
	        },
	        onKeyReleased: function(keyCode, event){
	            var label = keyCode.toString();
	            console.log(label);	        }
    	}, this);   

		return true;
	}
});

var Day1Scene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new Day1Layer();
		this.addChild(layer);
	}
});
