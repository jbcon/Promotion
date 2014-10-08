var TransitionLayer = cc.Layer.extend({
    s:-1,
    i:0,
    
    ctor:function (s) {
        this._super();
        var size = cc.winSize;
        this.s = g_scene;
        if(this.s == 1){
            var sceneLabel = new cc.LabelTTF("~Night~", "Arial", 38);
        }else if(this.s == 2){    
            var sceneLabel = new cc.LabelTTF("~Day 2~", "Arial", 38);
        }else if(this.s == 3){
            var sceneLabel = new cc.LabelTTF("~Night 2~", "Arial", 38);
        }else if(this.s == 4){
            var sceneLabel = new cc.LabelTTF("~Day 3~", "Arial", 38);
        }
        
        sceneLabel.x = size.width / 2;
        sceneLabel.y = 350;
        this.addChild(sceneLabel, 5);
        
        this.scheduleUpdate();
        
        return true; 
    },
    
    update:function(dt){
        if(this.i > 100){
            if(this.s == 1){
                var scene = new NightScene();
            }else if(this.s == 2){
                var scene = new Day2Scene();
            }else if(this.s == 3){
                var scene = new NightScene();
            }else if (this.s == 4){
                var scene = new Day3Scene();
            }
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }else{
            this.i+=1;
        }
    },
});

var TransitionScene = cc.Scene.extend({
    
    onEnter:function () {
        this._super();
        var layer = new TransitionLayer();
        this.addChild(layer);
    }
});

