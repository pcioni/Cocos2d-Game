var Tool = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.tag = "tool";
        this.toolType = "";

        //this.scheduleUpdate();

        return true;
    },

    update:function(dt) {

    }
});