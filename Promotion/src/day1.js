
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

		//moves "day 1" from bottom to off screen (top)
		label.runAction(
            cc.spawn(
                cc.moveBy(5.5, cc.p(0, size.height + 40))
            )
        );
	}
});


var Day1Layer = cc.Layer.extend({
	ctor:function () {
		//super init
		this._super();
		
		//get window size
		var size = cc.winSize;
		var key = ""; //for input
		var count = 0; //for accessing each sprite
		
		//music
		cc.audioEngine.setMusicVolume(0.8);
		cc.audioEngine.playMusic(res.day1_music);

		//sprite array
		spriteList = [res.desk, res.outbox, res.shred, res.file];

		//sprite init
		this._sprite = cc.Sprite.create(spriteList[count]);
		this._sprite.attr({
			x: size.width / 3,
			y: size.height / 2,
			scale: 0.35
		});
		this.addChild(this._sprite);

		//arrow bar at bottom
		this._abar = cc.Sprite.create(res.arrows);
		this._abar.attr({
			x: size.width -175,
			y: 50,
			scale: 0.8
		});
		this.addChild(this._abar);

		leftarray = [];
		left = 0;
		//left arrow
		for (var i=0; i<10; i++){
			this._larrow = cc.Sprite.create(res.arrows, cc.rect(0,0,110,100));
			this._larrow.attr({
				x: size.width -295,
				y: cc.winSize.height + 40,
				scale: 0.8
			});
			this.addChild(this._larrow,0,i);
			leftarray[i] = this._larrow;
		}
		this.schedule(this.updateLeft);

		//down arrow
		this._darrow = cc.Sprite.create(res.arrows, cc.rect(150,0,110,100))
		this._darrow.attr({
			x: size.width -175,
			y: cc.winSize.height + 40,
			scale: 0.8
		});
		this.schedule(this.updateDown);
		this.addChild(this._darrow);

		//right arrow
		this._rarrow = cc.Sprite.create(res.arrows, cc.rect(300,0,110,100))
		this._rarrow.attr({
			x: size.width -55,
			y: cc.winSize.height + 40,
			scale: 0.8
		});
		this.schedule(this.updateRight);
		this.addChild(this._rarrow);
	
		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed: function(keyCode, event){
	        	if (keyCode == 37) {
	        		key = "LEFT";
	        		count = 1;
	        		if (event.getCurrentTarget()._larrow.y<=event.getCurrentTarget()._abar.y+20){
	        			console.log("score!");
	        		}
/*	            else if (keyCode == 38) {
	            	key = "UP";
	            	count = 0;*/
	            }
	            else if (keyCode == 39) {
	            	key = "RIGHT";
	            	count = 3;
	            	if (event.getCurrentTarget()._rarrow.y<=event.getCurrentTarget()._abar.y+20){
	        			console.log("score!");
	        		}
				}
	            else if (keyCode == 40) {
	            	key = "DOWN";
	            	count = 2;
	            	if (event.getCurrentTarget()._darrow.y<=event.getCurrentTarget()._abar.y+20){
	        			console.log("score!");
	        		}
	            }
	            else count = 0;

	            //handle animation
	            event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        	event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[count]);
				event.getCurrentTarget()._sprite.attr({
					x: size.width / 3,
					y: size.height / 2,
					scale: 0.35
				});
				event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	            
	            console.log(key);
	        },
	        onKeyReleased: function(keyCode, event){
	        	//set delay (ms)
	        	setTimeout(function() {
	        		event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        		event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[0]);
					event.getCurrentTarget()._sprite.attr({
					x: size.width / 3,
					y: size.height / 2,
					scale: 0.35
					});
					event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	        	}, 500);	        
	        }
    	}, this); 
	},
	update:function () {
		random = Math.floor(Math.random() * 3) + 1;
	},
	//left arrow update
	updateLeft:function () {
		leftarray[left].attr({
			y: leftarray[left].y - 10
		});
		if (leftarray[left].y <= -40){
			left+=1;
		}
	},
	//down arrow update
	updateDown:function () {
		this._darrow.attr({
			y: this._darrow.y - 10
		});
		if (this._darrow.y <= -40){
			//this.removeChild(this._darrow);
			this._darrow.y = cc.winSize.height + 40;
		}
	},
	//right arrow update
	updateRight:function () {
		this._rarrow.attr({
			y: this._rarrow.y - 10
		});
		if (this._rarrow.y <= -40){
			//this.removeChild(this._rarrow);
			this._rarrow.y = cc.winSize.height + 40;
		}
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
