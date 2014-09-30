var SysMenu = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		//get window size
		var size = cc.winSize;

		var Day1Normal = new cc.Sprite(res.menu, cc.rect(0,0,126,33));
		var Day1Selected = new cc.Sprite(res.menu, cc.rect(0,33,126,33));
		var Day1Disabled = new cc.Sprite(res.menu, cc.rect(0, 66, 126, 33));

		var Day2Normal = new cc.Sprite(res.menu, cc.rect(126,0,126,33));
		var Day2Selected = new cc.Sprite(res.menu, cc.rect(126,33,126,33));
		var Day2Disabled = new cc.Sprite(res.menu, cc.rect(126, 66, 126, 33));

		var day1 = new cc.MenuItemSprite(Day1Normal, Day1Selected, Day1Disabled, this.onDay1, this);
		var day2 = new cc.MenuItemSprite(Day2Normal, Day2Selected, Day2Disabled, this.onDay2, this);

		var mainMenu = new cc.Menu(day1, day2);
		mainMenu.alignItemsVerticallyWithPadding(10);
        mainMenu.x = size.width/2;
        mainMenu.y = size.height/2;
        this.addChild(mainMenu, 1, 2);
	},
	onDay1:function (pSender) {
		console.log("day1");
		var scene = new cc.Scene();
		scene.addChild(new Day1Layer());
		//scene.addChild(new Day1Screen());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onDay2:function (pSender) {
    	console.log("day2");
		var scene = new Day2Scene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});

SysMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};