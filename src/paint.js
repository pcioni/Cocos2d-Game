var Paint = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.tag = "paint";
        this.ccolor = "";

        //this.scheduleUpdate();

        return true;
    },

    update:function(dt) {

    }
});