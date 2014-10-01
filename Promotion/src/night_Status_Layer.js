var StatusLayer = cc.Layer.extend({
    labelCheck:null,
    checks:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelCheck = cc.LabelTTF.create("Checks:0", "Helvetica", 20);
        //this.labelCoin.setColor(cc.color(0,0,0));//black color
        this.labelCheck.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCheck);
    },
    
    addCheck:function(num){
        this.checks += num;
        this.labelCheck.setString("Check:" + this.checks);
    }
});