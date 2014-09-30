var Day2Layer = cc.Layer.extend({
	ctor: function(){
		this._super();
	}
});

var Day2Scene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new Day2Layer();
		this.addChild(layer);
	}
});