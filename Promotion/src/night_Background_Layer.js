var BackgroundLayer = cc.Layer.extend({
    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,
    space:null,
    spriteSheet:null,
    objects:[],
    
    ctor:function (space) {
        this._super();
        
        this.objects =[];
        this.space = space;
        
        this.init();
    },

    init:function () {
        this._super();  
        
        this.map00 = cc.TMXTiledMap.create(res.N_map00_tmx);
        this.addChild(this.map00);
        
        this.mapWidth = this.map00.getContentSize().width;
        
        this.map01 = cc.TMXTiledMap.create(res.N_map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);
        
        cc.spriteFrameCache.addSpriteFrames(res.N_checks_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.N_checks_png);
        this.addChild(this.spriteSheet);
        
        this.loadObjects(this.map00, 0);
        this.loadObjects(this.map01, 1);
        
        this.scheduleUpdate();
    },
    
    checkAndReload:function(eyeX){
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if(this.mapIndex == newMapIndex){
            return false;
        }
        
        if(0 == newMapIndex % 2){
            this.map01.setPositionX(this.mapWidth*(newMapIndex+1));
        }else{
            this.map00.setPositionX(this.mapWidth*(newMapIndex+1));
        }
        this.mapIndex = newMapIndex;
        
        return true;
    },
    
    loadObjects:function (map, mapIndex) {
        // add checks
        var checkGroup = map.getObjectGroup("check");
        var checkArray = checkGroup.getObjects();
        for (var i = 0; i < checkArray.length; i++) {
            var check = new Check(this.spriteSheet,
                this.space,
                cc.p(checkArray[i]["x"] + this.mapWidth * mapIndex,checkArray[i]["y"]));
            check.mapIndex = mapIndex;
            this.objects.push(check);
        }
    },
    
    removeObjects:function (mapIndex) {
        while((function (obj, index) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].mapIndex == index) {
                    obj[i].removeFromParent();
                    obj.splice(i, 1);
                    return true;
                }
            }
            return false;
        })(this.objects, mapIndex));
    },
    
    removeObjectByShape:function (shape) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getShape() == shape) {
                this.objects[i].removeFromParent();
                this.objects.splice(i, 1);
                break;
            }
        }
    },
    
    checkAndReload:function (eyeX) {
        var newMapIndex = parseInt(eyeX / this.mapWidth);
        if (this.mapIndex == newMapIndex) {
            return false;
        }

        if (0 == newMapIndex % 2) {
            // change mapSecond
            this.map01.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map01, newMapIndex + 1);

        } else {
            // change mapFirst
            this.map00.setPositionX(this.mapWidth * (newMapIndex + 1));
            this.loadObjects(this.map00, newMapIndex + 1);

        }

        this.removeObjects(newMapIndex - 1);
        this.mapIndex = newMapIndex;

        return true;
    },
    
    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
    }  
});