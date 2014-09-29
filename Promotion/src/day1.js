
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
		//[[OALSimpleAudio sharedInstance] playFile:@"Cannery.wav"]
	}
});

var Day1Scene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new Day1Layer();
		this.addChild(layer);
	}
});