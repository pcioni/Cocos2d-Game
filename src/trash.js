var Trash = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Trash_png);

        this.tag="trash";

        return true;
    },

    update:function(dt) {

    }
});