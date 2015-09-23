var Crate = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.tag = "bin";
		
		this.contents= "";

        this.scale = 1.2;

        return true;
    },

    update:function(dt) {

    }
});