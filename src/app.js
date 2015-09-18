
//TODO:
//in CCConfig.js, cc.SPRITE_DEBUG_DRAW is currently enabled.
//in CCConfig.js, cc.SPRITEBATCHNODE_DEBUG_DRAW is currently enabled.
//These will draw a bounding box around ALL SPRITES for debugging purposes.
//TURN THIS OFF BEFORE PANICKING ABOUT THE BOXES.


var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.scheduleUpdate();

        this.player = new Player;
        this.player.x = 100;
        this.player.y = 100;

        this.car = new Car;
        this.car.x = screen.width/2;
        this.car.y = 78;

        this.addChild(this.player);
        this.addChild(this.car);

        this.spritelist = [this.player, this.car];


        return true;
    },

    update:function (dt) {
        this.CheckCollisions();
    },

    //check for collision
    //Calls ChangeState if we collide with something, and also handles if the ACTION key is hit.
    CheckCollisions:function() {
        var i;
        for (i = 0; i < this.spritelist.length; i++) {
            if (cc.rectIntersectsRect(this.player.getBoundingBox(), this.spritelist[i].getBoundingBox())) {
                this.player.setColor(new cc.Color(255, 0, 0));
                if (this.player.ACTION == true)
                    this.ChangeState(this.spritelist[i]);
            }
            else
                this.player.setColor(new cc.Color(255, 255, 255));
        }
    },

    //hitObject is the object that we've collided with.
    //This function will be a giant chain of if-else statements for each and every object.
    ChangeState:function(hitObject) {
        if (this.player.state == this.player.NORMAL_STATE) {
            this.player.state = this.player.HOLDING_STATE;
            cc.log("Changed state from NORMAL_STATE to HOLDING_STATE)");
        }
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


