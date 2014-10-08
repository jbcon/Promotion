var SysMenu = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		//get window size
		var size = cc.winSize;

		var title = new cc.LabelTTF("KISS-ASS", "Arial", 175);
		title.x = size.width / 2;
		title.y = size.height / 1.5;
		this.addChild(title);

		var label = new cc.LabelTTF("[PRESS START]", "Arial", 40);
		label.x = size.width / 2;
		label.y = 100;
		this.addChild(label);

		//day1 sprite from menu sprite sheet
		var Day1Normal = new cc.Sprite(res.menu, cc.rect(0,0,126,33));
		var Day1Selected = new cc.Sprite(res.menu, cc.rect(0,33,126,33));

		//day2 sprite from menu sprite sheet
		var Day2Normal = new cc.Sprite(res.menu, cc.rect(126,0,126,33));
		var Day2Selected = new cc.Sprite(res.menu, cc.rect(126,33,126,33));

        //night sprite from menu sprite sheet
        var NightNormal = new cc.Sprite(res.menu, cc.rect(126,0,126,33));
        var NightSelected = new cc.Sprite(res.menu, cc.rect(126, 33, 126, 33));
        
		//create menu sprite from the groups of sprites above (includes function for when pressed)
		var day1 = new cc.MenuItemSprite(Day1Normal, Day1Selected, this.onDay1, this);
		var day2 = new cc.MenuItemSprite(Day2Normal, Day2Selected, this.onDay2, this);
        var night = new cc.MenuItemSprite(NightNormal, NightSelected, this.onNight, this);

		//put these on the middle of the screen
		var mainMenu = new cc.Menu(day1, day2, night);
		mainMenu.alignItemsHorizontallyWithPadding(10);
        mainMenu.x = size.width/2;
        mainMenu.y = 200;
        this.addChild(mainMenu, 1, 2);
	},
	//when day1 sprite is clicked (currently "new game")
	onDay1:function (pSender) {
		console.log("day1");
		var scene = new cc.Scene();
		scene.addChild(new Day1Layer());
		scene.addChild(new Day1Screen());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    //when day2 sprite is clicked (currently "options")
    onDay2:function (pSender) {
    	console.log("day2");
		var scene = new Day2Scene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    //when night sprite is clicked (currently "options")
    onNight:function (pSender) {
    	console.log("night");
		var scene = new NightScene();
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