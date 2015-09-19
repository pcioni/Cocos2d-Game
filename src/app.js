
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

        this.audio = cc.audioEngine; //when using anything with audio in app.js, put audio. in front of it
        this.audio.playMusic(res.StageTheme_wav,true); //plays the stage theme

        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        cc.winSize.width = 1920;
        cc.winSize.height = 1080;
        var size = cc.winSize;
        cc.log(size);

        this.player = new Player;
        this.player.x = size.width/2;
        this.player.y = size.height/2;

        this.car = new Car;
        this.car.x = size.width;
        this.car.y = 100;
		
		this.doors = new Crate;
        this.doors.contents = "door";
        this.doors.x = size.width/2 - 250;
        this.doors.y = size.height/2;

        this.tires = new Crate;
        this.tires.contents = "tire";
        this.tires.x = size.width/2;
        this.tires.y = size.height/2;

        this.engines = new Crate;
        this.engines.contents = "engine";
        this.engines.x = size.width/2 + 250;
        this.engines.y = size.height/2;

        var background = new cc.Sprite(res.Background_png);

        cc.log(background);

        this.addChild(background);
        background.x = size.width / 2;
        background.y = size.height / 2;

        this.addChild(this.player);
        this.addChild(this.car);
		this.addChild(this.tires);
		this.addChild(this.doors);
		this.addChild(this.engines);
		
		for(var i=0; i<this.car.req.length; i++){
			cc.log(this.car.req[i].toString());
		}

        this.spritelist = [this.player, this.car, this.engines, this.tires, this.doors];

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
        if (this.player.state == this.player.nothing) {
            if (hitObject.tag == "car") {
                cc.log("Not holding anything, and next to car");
            }
            else if (hitObject.tag == "bin") {
                cc.log("Not holding anything and next to create holding " + hitObject.contents);
                this.player.state = hitObject.contents;
            }
        }
        else if (hitObject.tag == "car") {
            cc.log("Holding something, and next to car");
            this.player.state = this.player.nothing;
        }
        else {
            cc.log("Already holding something and not next to car");
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


