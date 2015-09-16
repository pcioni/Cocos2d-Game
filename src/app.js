
var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.scheduleUpdate();

        this.player = new Player;
        this.player.x = 100;
        this.player.y = 100;

        this.car = new Car;
        this.car.x = 275;
        this.car.y = 200;

        this.addChild(this.player);
        this.addChild(this.car);

        return true;
    },

    update:function (dt) {
        this.CheckCollisions();
    },

    //check for collision
    //I don't know how this works -PC
    CheckCollisions:function() {
        if (cc.rectIntersectsRect(this.player.getBoundingBox(), this.car.getBoundingBox()))
            this.player.setColor(new cc.Color(255, 0, 0));
        else
            this.player.setColor(new cc.Color(255, 255, 255));
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


