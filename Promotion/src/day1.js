
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
	_sprite:null,
	ctor:function () {
		//super init
		this._super();
		this.init();
	},
	init:function () {
		
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
			x: size.width / 4,
			y: size.height / 2,
			scale: 0.35
		});
		this.addChild(this._sprite);

		//arrow bar at bottom
		this._abar = cc.Sprite.create(res.arrows);
		this._abar.attr({
			x: size.width -175,
			y: size.height/ 4,
			scale: 0.8
		});
		this.addChild(this._abar);

		//left arrow
		this._larrow = cc.Sprite.create(res.arrows, cc.rect(0,0,110,100));
		this._larrow.attr({
			x: size.width -295,
			y: size.height+40,
			scale: 0.8
		});
		this.schedule(this.updateLeft, 0.01);
		this.addChild(this._larrow);

		//down arrow
		this._darrow = cc.Sprite.create(res.arrows, cc.rect(150,0,110,100))
		this._darrow.attr({
			x: size.width -175,
			y: size.height+40,
			scale: 0.8
		});
		this.schedule(this.updateDown, 0.03);
		this.addChild(this._darrow);

		//right arrow
		this._rarrow = cc.Sprite.create(res.arrows, cc.rect(300,0,110,100))
		this._rarrow.attr({
			x: size.width -55,
			y: size.height+40,
			scale: 0.8
		});
		this.schedule(this.updateRight, 0.03);
		this.addChild(this._rarrow);

		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed: function(keyCode, event){
	        	if (keyCode == 37) {
	        		key = "LEFT";
	        		count = 1;
	        	}
	            else if (keyCode == 39) {
	            	key = "RIGHT";
	            	count = 3;
				}
	            else if (keyCode == 40) {
	            	key = "DOWN";
	            	count = 2;
	            }
	            else count = 0;

	            //handle animation
	            event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        	event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[count]);
				event.getCurrentTarget()._sprite.attr({
					x: size.width / 4,
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
					x: size.width / 4,
					y: size.height / 2,
					scale: 0.35
					});
					event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	        	}, 80);	        
	        }
    	}, this); 
	},
	updateLeft:function (dt) {
		this._larrow.attr({
			y: this._larrow.y - 5
		});
		if (this._larrow.y <= this._abar.y){
			this._larrow.y = cc.winSize.height + 40;
		}
			
	},
	updateDown:function (dt) {
		this._darrow.attr({
			y: this._darrow.y - 5
		});
		if (this._darrow.y <= this._abar.y){
			this._darrow.y = cc.winSize.height + 40;
		}
	},
	updateRight:function (dt) {
		this._rarrow.attr({
			y: this._rarrow.y - 5
		});
		if (this._rarrow.y <= this._abar.y){
			this._rarrow.y = cc.winSize.height + 40;
		}
	}
});