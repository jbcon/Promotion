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
		this.init();
	},
	init:function () {
		
		//get window size
		size = cc.winSize;
		var key = ""; //for input
		var count = 0; //for accessing each sprite
		lives = 3; //miss 3 and you lose
		
		//music
		cc.audioEngine.setMusicVolume(0.8);
		cc.audioEngine.playMusic(res.day1_music);

		//background
		this._office = cc.Sprite.create(res.office);
		this._office.attr({
			x:410,
			y:300,
			scale:0.8
		});
		this.addChild(this._office);

		//sprite array
		spriteList = [res.desk, res.outbox, res.shred, res.file];

		//sprite init
		this._sprite = cc.Sprite.create(spriteList[count]);
		this._sprite.attr({
			x: size.width / 4,
			y: 200,
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
		//this._abar.runAction(cc.moveBy(1,cc.p(200,0)));

		//left arrow
		leftarray = [];
		left = 0;
		for (var i=0; i<5; i++){
			this._larrow = cc.Sprite.create(res.arrows, cc.rect(0,0,110,100));
			this._larrow.attr({
				x: size.width -295,
				y: cc.winSize.height + 100,
				scale: 0.8
			});
			this.addChild(this._larrow,0,i);
			leftarray[i] = this._larrow;
		}
		
		//down arrow
		downarray = [];
		down = 0;
		for (var i=0; i<5; i++){
			this._darrow = cc.Sprite.create(res.arrows, cc.rect(150,0,110,100))
			this._darrow.attr({
				x: size.width -175,
				y: cc.winSize.height + 100,
				scale: 0.8
			});
			this.addChild(this._darrow);
			downarray[i] = this._darrow
		}

		//right arrow
		rightarray = [];
		right = 0;
		for (var i=0; i<5; i++){
			this._rarrow = cc.Sprite.create(res.arrows, cc.rect(300,0,110,100))
			this._rarrow.attr({
				x: size.width -55,
				y: cc.winSize.height + 100,
				scale: 0.8
			});
			this.addChild(this._rarrow);
			rightarray[i] = this._rarrow;
		}
	
		//update everything
		this.schedule(this.move, 0.33);
	
		//keyboard event listener
    	cc.eventManager.addListener({
	        event: cc.EventListener.KEYBOARD,
	        onKeyPressed: function(keyCode, event){
	        	if (keyCode == 37) {
	        		key = "LEFT";
	        		count = 1;
	        		if (leftarray[left-1].y<=event.getCurrentTarget()._abar.y+30){
	        			console.log("score!");
	        			if (left > 0){
	        				leftarray[left-1].y = size.height+100;
	        			} else {
	        				leftarray[4].y = size.height+100;
	        			}

	        		}
	        	}
	            else if (keyCode == 39) {
	            	key = "RIGHT";
	            	count = 3;
	            	if (rightarray[right-1].y<=event.getCurrentTarget()._abar.y+30){
	        			console.log("score!");
	        			if (right > 0){
	        				rightarray[right-1].y = size.height+100;
	        			} else {
	        				rightarray[4].y = size.height+100;
	        			}
	        		}
				}
	            else if (keyCode == 40) {
	            	key = "DOWN";
	            	count = 2;
	            	if (downarray[down-1].y<=event.getCurrentTarget()._abar.y+30){
	        			console.log("score!");
	        			if (down > 0){
	        				downarray[down-1].y = size.height+100;
	        			} else {
	        				downarray[4].y = size.height+100;
	        			}
	        		}
	            }
	            else count = 0;

	            //handle animation
	            event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        	event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[count]);
				event.getCurrentTarget()._sprite.attr({
					x: size.width / 4,
					y: 200,
					scale: 0.35
				});
				event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	            
	            console.log(key);
	        },
	        onKeyReleased: function(keyCode, event){
	        	//set delay (ms) for desk animation
	        	setTimeout(function() {
	        		event.getCurrentTarget().removeChild(event.getCurrentTarget()._sprite,true);
	        		event.getCurrentTarget()._sprite = cc.Sprite.create(spriteList[0]);
					event.getCurrentTarget()._sprite.attr({
					x: size.width / 4,
					y: 200,
					scale: 0.35
					});
					event.getCurrentTarget().addChild(event.getCurrentTarget()._sprite);
	        	}, 80);	        
	        }
    	}, this); 
	},
	move:function () {
		random = Math.floor(Math.random() * 3) + 1;
		switch(random){
			case 1: //left
				setTimeout(function() {
					leftarray[left].y = size.height+100;
					leftarray[left].runAction(cc.moveTo(1.2,cc.p(size.width -295,-40)));
					left++;
					if (left == 5) left = 0;
				}, 80);
				break;
			case 2: //down
				setTimeout(function() {
					downarray[down].y = size.height+100;
					downarray[down].runAction(cc.moveTo(1.2,cc.p(size.width -175,-40)));
					down++;
					if (down == 5) down = 0;
				}, 80);
				break;
			case 3: // right
				setTimeout(function() {
					rightarray[right].y = size.height+100;
					rightarray[right].runAction(cc.moveTo(1.2,cc.p(size.width -55,-40)));
					right++;
					if (right == 5) right = 0;
				}, 80);
				break;
		}
	},
	//left arrow update
	updateLeft:function () {
		leftarray[left].attr({
			//y: leftarray[left].y - 10
		});
		if (leftarray[left].y <= -40){
			leftarray[left].y = cc.winSize.height + 40;
			left+=1;
		}
		if (left >= leftarray.length){
			left = 0;
		}
	},
	//down arrow update
	updateDown:function () {
		downarray[down].attr({
			y: downarray[down].y - 10
		});
		if (downarray[down].y <= -40){
			downarray[down].y = cc.winSize.height + 40;
			down+=1;
		}
		if (down >= downarray.length){
			down = 0;
		}
	},
	//right arrow update
	updateRight:function () {
		rightarray[right].attr({
			y: rightarray[right].y - 10
		});
		if (rightarray[right].y <= -40){
			rightarray[right].y = cc.winSize.height + 40;
			right+=1;
		}
		if (right >= rightarray.length){
			right = 0;
		}
	}
});