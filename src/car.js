/**
 * Created by Matte on 9/16/2015.
 */
var Car = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Car_png);

        this.tag = "bin";
    }
});