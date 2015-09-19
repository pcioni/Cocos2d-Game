
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



        this.item = new Item;

        //Paint children
        this.blackPaint = new Paint;
        this.redPaint = new Paint;
        this.whitePaint = new Paint;

        this.blackPaint.ccolor = "black";
        this.redPaint.ccolor = "red";
        this.whitePaint.ccolor = "white";

        this.blackPaint.setTexture(res.blackPaint_png);
        this.redPaint.setTexture(res.redPaint_png);
        this.whitePaint.setTexture(res.whitePaint_png);

        this.blackPaint.x = 1450;
        this.whitePaint.x = 1450;
        this.redPaint.x = 1450;
        this.blackPaint.y = 300;
        this.whitePaint.y = 450;
        this.redPaint.y = 600;

        //Player children
        this.player = new Player;
        this.player.x = size.width/2;
        this.player.y = size.height/2;

        this.car = new Car;
        this.car.x = size.width;
        this.car.y = 100;

        //Item children
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
        background.x = size.width / 2;
        background.y = size.height / 2;

        this.addChild(background);
        this.addChild(this.blackPaint);
        this.addChild(this.redPaint);
        this.addChild(this.whitePaint);
        this.addChild(this.player);
        this.addChild(this.car);
		this.addChild(this.tires);
		this.addChild(this.doors);
		this.addChild(this.engines);
<<<<<<< HEAD
		
		//prints out what the car needs to the console
		
		this.PrintCarReq(this.car.req);

=======
        this.addChild(this.item);

		//prints out what the car needs
		for(var i=0; i<this.car.req.length; i++){
			cc.log(this.car.req[i].toString());
		}
		cc.log("needHammer: "+this.car.needHammer);
		cc.log("needRench: "+this.car.needRench);
		cc.log(this.car.paint);
>>>>>>> 9a34a91ff25ab4f0587731a09f5ab2a7cd04bfcc
		//////////////////////////////

        this.spritelist = [this.player, this.car, this.engines, this.tires, this.doors,
                            this.blackPaint, this.redPaint, this.whitePaint];

        return true;
    },

    update:function (dt) {
        this.item.x = this.player.x;
        this.item.y = this.player.y;
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
        }

    },

    //hitObject is the object that we've collided with.
    //This function will be a giant chain of if-else stateme nts for each and every object.
    ChangeState:function(hitObject) {
        if (this.player.state == this.player.nothing) {
            if (hitObject.tag == "car") {
                cc.log("Not holding anything, and next to car");
            }
            else if (hitObject.tag == "bin") {
                if (hitObject.contents == "door") this.item.setTexture(res.Door_png);
                if (hitObject.contents == "tire") this.item.setTexture(res.Tire_png);
                if (hitObject.contents == "engine") this.item.setTexture(res.Engine_png);
                cc.log("Not holding anything and next to crate holding " + hitObject.contents);
                this.player.state = hitObject.contents;
            }
            else if (hitObject.tag == "paint") {
                if (hitObject.ccolor == "white") {
                    hitObject.setTexture(res.paintBlank);
                    this.item.setTexture(res.whitePaint_png);
                    this.player.state = "whitePaint";
                }
                if (hitObject.ccolor == "black") {
                    hitObject.setTexture(res.paintBlank);
                    this.item.setTexture(res.blackPaint_png);
                    this.player.state = "blackPaint";
                }
                if (hitObject.ccolor == "red") {
                    hitObject.setTexture(res.paintBlank);
                    this.item.setTexture(res.redPaint_png);
                    this.player.state = "redPaint";
                }
                cc.log("picked up paint color " + hitObject.ccolor)
            }
        }
        else if (hitObject.tag == "car") {
            this.item.setTexture(res.blank);
            cc.log("Holding something, and next to car");
			
			//checks if the car needs held object, if so -1 from the car needing it
			for(var i=0; i<this.car.req.length; i++){
				if(i==0){
					for(var j=0; j<this.car.req[0].length; j++){
						if(this.player.state==this.car.req[0][j][0] && this.car.req[0][j][1]>0){
							this.car.req[0][j][1]=this.car.req[0][j][1]-1;
							cc.log(this.car.req[0][j][0]+" added to car");
							this.PrintCarReq(this.car.req);
						}else{
							//do something if the car doesn't
							//need what you have
							//do we still want the player to drop the item?
						}
					}
				}else{
					if(this.player.state==this.car.req[i]){
						cc.log(this.car.req[i]+" added to car");
					}
				}
			}
			
            this.player.state = this.player.nothing;
        }
        else {
            cc.log("Already holding something and not next to car");
        }
    },
	
	PrintCarReq:function(req){
		
		for(var i=0; i<req.length; i++){
			if(i==0){
				for(var j=0; j<req[0].length; j++){
					if(req[0][j][1]>0)
						cc.log(req[0][j].toString());
				}
			}else{
				cc.log(req[i]);
			}
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


