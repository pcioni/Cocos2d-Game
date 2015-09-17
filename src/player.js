/**
 * Created by Matte on 9/16/2015.
 */
var Player = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Player_png);

        this.UP = false;
        this.DOWN = false;
        this.LEFT = false;
        this.RIGHT = false;

        this.speed = 5;

        this.scale = 0.6;

        this.scheduleUpdate();


        //W: keycode 87
        //A: keycode 65
        //S: keycode 83
        //D: keycode 68


        cc.eventManager.addListener (
            cc.EventListener.create ({
                event: cc.EventListener.KEYBOARD ,
                onKeyPressed: function(key, event)
                {
                    //console.log(typeof(key));
                    if(key == 87) this.UP = true;
                    else if(key == 65) this.LEFT = true;
                    else if(key == 83) this.DOWN = true;
                    else if(key == 68) this.RIGHT = true;
                    //cc.log("Key pressed: " + key.toString());
                }.bind(this),
                onKeyReleased: function(key, event)
                {

                    if(key == 87) this.UP = false;
                    else if(key == 65) this.LEFT = false;
                    else if(key == 83) this.DOWN = false;
                    else if(key == 68) this.RIGHT = false;
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
        }
        else if(this.DOWN)
        {
            this.y -= this.speed;
        }
        else if(this.LEFT)
        {
            this.x -= this.speed;
        }
        else if(this.RIGHT)
        {
            this.x += this.speed;
        }
    }
});