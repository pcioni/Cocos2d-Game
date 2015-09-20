var Player = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Player_png);

        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;
        this.ACTION = false;

        this.speed = 12;

        //this.scale = 0.6;
        this.state = "nothing";
        this.nothing = "nothing";

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
    // you can also use the update method, which is called every frame
    // dt is the deltaTime, amount of time since last update call
    // make sure to call this.scheduleUpdate() in the constructor
    // to activate this if you want it
    update:function(dt) {
        if(this.UP) {
            if (this.y < 903 - this.height/2)
                this.y += this.speed;
        }
        else if(this.DOWN) {
            if (this.y > 173 + this.height/2)
                this.y -= this.speed;
        }
        if(this.LEFT) {
            if (this.x > 188 + this.width/2)
                this.x -= this.speed;
        }
        else if(this.RIGHT){
            if (this.x < 1920 - this.width/2)
                this.x += this.speed;
        }
    }
});