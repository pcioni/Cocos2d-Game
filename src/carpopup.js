var Player = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Player_png);

        this.scheduleUpdate();



        return true;
    },

    update:function(dt) {

    }
});