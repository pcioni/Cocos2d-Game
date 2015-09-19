var Item = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.tag = "paint";
        this.color = "";

        //this.scheduleUpdate();

        return true;
    },

    update:function(dt) {

    }
});