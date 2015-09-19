
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

        var size = cc.winSize;
        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        cc.log(size);

        this.player = new Player;
        this.player.x = 100;
        this.player.y = 100;

        this.car = new Car;
        this.car.x = screen.width/2;
        this.car.y = 78;

        var background = new cc.Sprite(res.Background_png);

        cc.log(background);

        this.addChild(background);
        background.x = size.width / 2;
        background.y = size.height / 2;

        this.addChild(this.player);
        this.addChild(this.car);

        //Player should ALWAYS be in index 0 due to the way CheckCollisions uses this list.
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
            if (cc.rectIntersectsRect(this.spritelist[0].getBoundingBox(), this.spritelist[i].getBoundingBox())) {
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
        /* commented to distinguish working code from prototypes

        if (this.player.state == this.player.NOTHING) {

        }
        
        else if (this.player.state != this.player.NOTHING) {
            if (this.player.state == this.player.ENGINE) {
    
            }
            if (this.player.state == this.player.DOOR) {
    
            }
            if (this.player.state == this.player.TIRE) {
    
            }
        }
        */
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


