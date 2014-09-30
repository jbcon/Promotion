var NightLayer = cc.Layer.extend({
	ctor: function(){
		this._super();
	}
});

var NightScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new NightLayer();
        this.addChild(layer);
    }
});

