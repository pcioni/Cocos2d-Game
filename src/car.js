var Car = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Car_png);
        //cc.spriteFrameCache.addSpriteFrame (new cc.SpriteFrame
        //(res.squid_png, cc.rect(0,0,100,137)),"squid1");
        this.tag = "bin";

        var moveLeft = new cc.MoveTo(5,cc.p(0,0));
        var moveUp = new cc.MoveTo(4,cc.p(0,screen.height/2));
        var moveRight = new cc.MoveTo(5,cc.p(screen.width/2,screen.height/2));

        var seq = new cc.Sequence(moveLeft,moveUp,moveRight);

        this.runAction(seq);



        return true;
    },
    // you can also use the update method, which is called every frame
    // dt is the deltaTime, amount of time since last update call
    // make sure to call this.scheduleUpdate() in the constructor
    // to activate this if you want it
    update:function(dt) {

    }
});