var Crate = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.tag = "bin";
		
		this.contents= "";

        this.scale = 1.2;

        return true;
    },
    // you can also use the update method, which is called every frame
    // dt is the deltaTime, amount of time since last update call
    // make sure to call this.scheduleUpdate() in the constructor
    // to activate this if you want it
    update:function(dt) {

    }
});