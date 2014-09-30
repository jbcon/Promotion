
var Day1Screen = cc.Layer.extend({
	ctor:function () {
		this._super();
		//get window size
		var size = cc.winSize;
		//maybe screen with "day 1"
		var label = new cc.LabelTTF("Day 1", "Arial", 40);
		label.x = size.width / 2;
		label.y = 0;
		this.addChild(label);

		label.runAction(
            cc.spawn(
                cc.moveBy(5.5, cc.p(0, size.height + 40))
            )
        );
	}
});


var Day1Layer = cc.Layer.extend({
	_desk:null,
	ctor:function () {
		//super init
		this._super();
		//get window size
		var size = cc.winSize;
		//music
		//cc.audioEngine.playMusic(res.Cannery)

		//desk+player sprite
		this._desk = new cc.Sprite(res.desk);
		this._desk.attr({
			x: size.width / 2,
			y: size.height / 2,
			scale: 0.35
		});
		this.addChild(this._desk, 0);

		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed:  function(keyCode, event){
	        	var key;
	        	if (keyCode == 37) key = "LEFT";
	            if (keyCode == 38) key = "UP";
	            if (keyCode == 39) key = "RIGHT";
	            if (keyCode == 40) key = "DOWN";
	            console.log(key);
	        },
	        onKeyReleased: function(keyCode, event){
	            var key = keyCode.toString();
	            console.log(key);	        }
    		}, this);   

    	

		return true;
	}
});
/*
var Day1Scene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var scene = new cc.Scene();
		scene.addChild(new Day1Layer());
		scene.addChild(new Day1Screen());
		cc.director.runScene(new cc.TransitionFade(1.2, scene));
	}
});
*/