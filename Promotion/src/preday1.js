//for instructions
var PreDay1 = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		//get window size
		var size = cc.winSize;

		//create labels to go on screen
		var day1 = new cc.LabelTTF("Day 1", "Arial", 40);
		day1.x = size.width / 2;
		day1.y = size.height / 1.5;
		this.addChild(day1);

		var instruct = new cc.LabelTTF("I have had this song stuck in \n my head forever. Maybe it will \n help me sort out this paperwork", "Arial", 40);
		instruct.x = size.width / 2 + 10;
		instruct.y = size.height / 2;
		this.addChild(instruct);

		var arrow = new cc.LabelTTF("USE THE CORRECT ARROW KEYS TO \n HELP SORT OUT THE PAPERWORK", "Arial", 40);
		arrow.x = size.width / 2 + 10;
		arrow.y = 100;
		this.addChild(arrow);

		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed: function(keyCode, event){
	        	if(keyCode == 13){
	        		var scene = new cc.Scene();
					scene.addChild(new Day1Layer());
					cc.director.runScene(new cc.TransitionFade(1.2, scene));
	        	}
	        }
	    }, this);
	}
});

//for the intro to the game aka promotion available
var Intro = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		//get window size
		var size = cc.winSize;

		//email background
		var email = cc.Sprite.create(res.email);
		email.x = 400;
		email.y = 400;
		this.addChild(email);

		//this.removeChild(email);

		var label1 = new cc.LabelTTF("A NEW OPENING?!", "Arial", 40);

		label1.x = size.width / 2;
		label1.y = size.height / 1.5;
		label1.setColor((0,0,0));
		this.addChild(label1);

		var label2 = new cc.LabelTTF("AND ONLY 3 DAYS TO \n IMPRESS THE BOSS?", "Arial", 40);
		label2.x = size.width / 2;
		label2.y = size.height / 3;
		label2.setColor((0,0,0));
		this.addChild(label2);

		var start = new cc.LabelTTF("[PRESS ENTER]", "Arial", 40);
		start.x = size.width / 2;
		start.y = 100;
		this.addChild(start);

		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed: function(keyCode, event){
	        	if(keyCode == 13){
	        		var scene = new cc.Scene();
					scene.addChild(new PreDay1());
					cc.director.runScene(new cc.TransitionFade(1.2, scene));
	        	}
	        }
	    }, this);
	}
});