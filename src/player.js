var Player = cc.Sprite.extend ({
    ctor: function () {

        this._super(res.Player_png);
        //this._super();
        //this.sprite = new cc.Sprite("res/#Left1.png");

        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
        this.ACTION = false;

        this.speed = 5;



        cc.spriteFrameCache.addSpriteFrames(res.Player_Left_plist);

        var leftFrames = [];

        for(var i = 1; i < 5; i++)
        {
            var str = "Left" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            //cc.log(i + frame.getTexture());
            leftFrames.push(frame);
            //leftAnim.addSpriteFrame(frame);
        }

        cc.log("After for loop");
        var leftAnim = new cc.Animation(frames, 0.3);
        cc.log("After animation set");
        //leftAnim.setDelayPerUnit(0.08);
        //this.leftAnim = new cc.Animation(leftFrames, 0.3);
        this.runLeft = new cc.RepeatForever(new cc.Animate(leftAnim));
        cc.log("After runLeft set");
        //cc.log(this.getNumberOfRunningActions());
        this.runAction(this.runLeft);
        //cc.log(this.getNumberOfRunningActions());

        cc.log("After runAction set");
        //this.scale = 0.6;
        this.state = "nothing";
        this.nothing = "nothing";

        this.scheduleUpdate();
        cc.log("After schedule update");

        //W: keycode 87
        //A: keycode 65
        //S: keycode 83
        //D: keycode 68
        //E: 69
        //Space: 32

        cc.eventManager.addListener (
            cc.EventListener.create ({
                event: cc.EventListener.KEYBOARD ,
                onKeyPressed: function(key, event)
                {
                    if(key == 87) this.UP = true;
                    else if(key == 65) this.LEFT = true;
                    else if(key == 83) this.DOWN = true;
                    else if(key == 68) this.RIGHT = true;
                    else if (key == 69 || key == 32) this.ACTION = true;
                    //cc.log("Key pressed: " + key.toString());
                }.bind(this),
                onKeyReleased: function(key, event)
                {

                    if(key == 87) this.UP = false;
                    else if(key == 65) this.LEFT = false;
                    else if(key == 83) this.DOWN = false;
                    else if(key == 68) this.RIGHT = false;
                    else if (key == 69 || key == 32) this.ACTION = false;
                    //cc.log("Key Released: " + key.toString());
                }.bind(this)
            }),this);

        return true;
    },
    // you can also use the update method, which is called every frame
    // dt is the deltaTime, amount of time since last update call
    // make sure to call this.scheduleUpdate() in the constructor
    // to activate this if you want it
    update:function(dt) {
        if(this.UP)
        {
            this.y += this.speed;
            this.runAction(this.runLeft);
            //cc.log("Running");
        }
        else if(this.DOWN)
        {
            this.y -= this.speed;
            this.runAction(this.runLeft);
        }
        if(this.LEFT)
        {
            this.x -= this.speed;
        }
        else if(this.RIGHT)
        {
            this.x += this.speed;
        }
    }
});