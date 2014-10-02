var BackgroundLayer = cc.Layer.extend({
    map00:null, // the first map
    map01:null, // the second map
    mapWidth:0, // the width of the map
    mapIndex:0, // determine first or second map
    space:null, // space
    spriteSheet:null, // the spriteSheet for checks
    objects:[], // array for objects on screen
 
    // constructor
    ctor:function (space) {
        this._super();
 
        this.objects =[]; // initialize objects
        this.space = space;
        
        this.init();
    },

    // initialize layer
    init:function () {
        this._super();  
        
        // set up map00
        this.map00 = cc.TMXTiledMap.create(res.N_map00_tmx);
        this.addChild(this.map00);
        this.mapWidth = this.map00.getContentSize().width;
        
        // set up map01
        this.map01 = cc.TMXTiledMap.create(res.N_map01_tmx);
        this.map01.setPosition(cc.p(this.mapWidth, 0));
        this.addChild(this.map01);
        
        // add checks sprite sheet
        cc.spriteFrameCache.addSpriteFrames(res.N_checks_plist);
        this.spriteSheet = cc.SpriteBatchNode.create(res.N_checks_png);
        this.addChild(this.spriteSheet);
        
        // load map
        this.loadObjects(this.map00, 0);
        this.loadObjects(this.map01, 1);
        
        // update
        this.scheduleUpdate();
    },
        
    // loop between two maps, upload second map when first map finish
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
    
    // load the checks on the map
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
    
    // remove checks on map when map go out of scope
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
    
    // remove checks
    removeObjectByShape:function (shape) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getShape() == shape) {
                this.objects[i].removeFromParent();
                this.objects.splice(i, 1);
                break;
            }
        }
    },
    
    // update
    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX(); // get scope
        this.checkAndReload(eyeX); // reload map if needed
    }  
});