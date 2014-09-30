var SysMenu = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		//get window size
		var size = cc.winSize;

		//day1 sprite from menu sprite sheet
		var Day1Normal = new cc.Sprite(res.menu, cc.rect(0,0,126,33));
		var Day1Selected = new cc.Sprite(res.menu, cc.rect(0,33,126,33));
		var Day1Disabled = new cc.Sprite(res.menu, cc.rect(0, 66, 126, 33));

		//day2 sprite from menu sprite sheet
		var Day2Normal = new cc.Sprite(res.menu, cc.rect(126,0,126,33));
		var Day2Selected = new cc.Sprite(res.menu, cc.rect(126,33,126,33));
		var Day2Disabled = new cc.Sprite(res.menu, cc.rect(126, 66, 126, 33));

		//create menu sprite from the groups of sprites above (includes function for when pressed)
		var day1 = new cc.MenuItemSprite(Day1Normal, Day1Selected, Day1Disabled, this.onDay1, this);
		var day2 = new cc.MenuItemSprite(Day2Normal, Day2Selected, Day2Disabled, this.onDay2, this);

		//put these on the middle of the screen
		var mainMenu = new cc.Menu(day1, day2);
		mainMenu.alignItemsVerticallyWithPadding(10);
        mainMenu.x = size.width/2;
        mainMenu.y = size.height/2;
        this.addChild(mainMenu, 1, 2);
	},
	//when day1 sprite is clicked (currently "new game")
	onDay1:function (pSender) {
		console.log("day1");
		var scene = new cc.Scene();
		scene.addChild(new Day1Layer());
		//scene.addChild(new Day1Screen());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    //when day2 sprite is clicked (currently "options")
    onDay2:function (pSender) {
    	console.log("day2");
		var scene = new Day2Scene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});
//define SysMenu.scene() to run above code
SysMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};