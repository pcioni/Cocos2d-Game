
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
        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        cc.winSize.width = 1920;
        cc.winSize.height = 1080;
        var size = cc.winSize;
        cc.log(size);

        this.player = new Player;
        this.player.x = size.width/2;
        this.player.y = size.width/2;

        this.car = new Car;
        this.car.x = size.width;
        this.car.y = 78;
		
		this.crate = new Crate;
		this.crate.x = size.width/2;
		this.crate.y = size.height/2;

        var background = new cc.Sprite(res.Background_png);

        cc.log(background);

        this.addChild(background);
        background.x = size.width / 2;
        background.y = size.height / 2;

        this.addChild(this.player);
        this.addChild(this.car);
		this.addChild(this.crate);


        this.spritelist = [this.player, this.car, this.crate];


        return true;
    },

    update:function (dt) {
        this.CheckCollisions();
    },

    //check for collision
    //Calls ChangeState if we collide with something, and also handles if the ACTION key is hit.
    CheckCollisions:function() {
        var i;
        for (i = 1; i < this.spritelist.length; i++) {
            if (cc.rectIntersectsRect(this.player.getBoundingBox(), this.spritelist[i].getBoundingBox())) {
                this.player.setColor(new cc.Color(255, 0, 0));
				cc.log("hit")
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


