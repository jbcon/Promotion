var StatusLayer = cc.Layer.extend({
    labelCheck:null, // checks point label on screen
    checks:0, // check points

    // constructor
    ctor:function () {
        this._super();
        this.init();
    },

    // initialize for status layer
    init:function () {
        this._super();

        // get window size
        var winsize = cc.director.getWinSize(); 

        // create check point label on screen
        this.labelCheck = cc.LabelTTF.create("Checks:0", "Helvetica", 20);
        this.labelCheck.setPosition(cc.p(70, winsize.height - 20));
        this.addChild(this.labelCheck);
    },
    
    // addCheck point when player get checks
    addCheck:function(num){
        this.checks += num;
        this.labelCheck.setString("Check:" + this.checks);
    }
});