var BackgroundLayer = cc.Layer.extend({
    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,
    
    ctor:function () {
        this._super();
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
    
    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.Animation);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);
    }  
});