var Player = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Player_png);

        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.playerRun_plist);
        var i,f;
        var frames=[];
        for (i=1; i <= 4; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("playerRun"+i+".png");
            frames.push(f);
        }
        var playerRunAnim = new cc.Animation(frames, 0.1);
        this.playerAction = new cc.RepeatForever(new cc.Animate(playerRunAnim));

        this.IDLE = true;



        cc.log( "Run Action: " + this.runAction.toString());

        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
        this.ACTION = false;

        this.speed = 12;
		this.lives=3;

        //this.scale = 0.6;
        this.state = "nothing";
        this.nothing = "nothing";

        this.stunned = false;
        this.ratReset = 0;

        this.scheduleUpdate();

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
                    //else if(key == 69 || key == 32) this.ACTION = true;
                    //cc.log("Key pressed: " + key.toString());
                }.bind(this),
                onKeyReleased: function(key, event)
                {

                    if(key == 87) this.UP = false;
                    else if(key == 65) this.LEFT = false;
                    else if(key == 83) this.DOWN = false;
                    else if(key == 68) this.RIGHT = false;
                    else if (key == 69 || key == 32) this.ACTION = true;
                    //cc.log("Key Released: " + key.toString());
                }.bind(this)
            }),this);

        return true;
    },

    hit:function() {
        cc.log("hit the rat");
        this.setColor (new cc.Color(255,0,0));
        this.stunned = true;
        this.speed -= 4;
        this.ratReset = 60;
    },

    update:function(dt) {
        //this.stopAction()

        if (this.ratReset > 0) this.ratReset -= 1;
        else {
            this.stunned = false;
            this.speed = 12;
            this.setColor (new cc.Color(255,255,255));
        }

        if(this.UP  || this.DOWN || this.LEFT || this.RIGHT)
        {
            if(this.IDLE)
            {
                cc.log("This.UP: " + this.UP + " This.DOWN: " + this.DOWN);
                cc.log("Changing action to running");
                this.stopAction(this.idleAction);
                this.IDLE = false;
                this.runAction(this.playerAction);
            }
        }
        else
        {
            if(this.IDLE == false)
            {
                cc.log("Setting action to idleAction");
                this.IDLE = true;
                this.stopAction(this.playerAction);
                this.setTexture(res.Player_png);
                cc.log("Number of running actions: " + this.getNumberOfRunningActions());
            }
        }

        if(this.UP) {
            if (this.y < 903 - this.height/2)
                this.y += this.speed;

        }
        else if(this.DOWN) {
            if (this.y > 173 + this.height/2)
                this.y -= this.speed;

        }
        if(this.LEFT) {
            this.flippedX = 180;
            if (this.x > 188 + this.width/2)
                this.x -= this.speed;

        }
        else if(this.RIGHT){

            this.flippedX = 0;
            if (this.x < 1920 - this.width/2)
                this.x += this.speed;

        }


    }
});