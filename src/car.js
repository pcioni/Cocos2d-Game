var Car = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.CarBroke1_png);
        //cc.spriteFrameCache.addSpriteFrame (new cc.SpriteFrame
        //(res.squid_png, cc.rect(0,0,100,137)),"squid1");
        this.tag = "bin";

        var moveOnScreen = new cc.MoveTo(1.5,cc.p(screen.width/2 - 220,78));
        var moveLeft = new cc.MoveTo(6,cc.p(110,78));
        var moveUp = new cc.MoveTo(5,cc.p(110,screen.height/2 - 78));
        var moveRight = new cc.MoveTo(8,cc.p(screen.width/2 - 110,screen.height/2 - 78));
        //Add a function that checks to see if you've succeeded or not (point system as well)


        var seq = new cc.Sequence(moveOnScreen,cc.delayTime(2),moveLeft,moveUp,moveRight);

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