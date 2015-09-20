
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

        //Player child
        this.player = new Player;
        this.player.x = size.width/2;
        this.player.y = size.height/2;
		
		//Car child
        this.car = new Car;
        this.car.x = size.width;
        this.car.y = 100;
		this.car.state="broken";
		this.car.setTexture(res.CarBroke1_png);

        //Item children
		this.doors = new Crate;
        this.doors.contents = "door";
		this.doors.setTexture(res.BoxOfDoors_png);
        this.doors.x = size.width/2 - 250;
        this.doors.y = size.height/2;

        this.tires = new Crate;
        this.tires.contents = "tire";
		this.tires.setTexture(res.BoxOfWheels_png);
        this.tires.x = size.width/2;
        this.tires.y = size.height/2;

        this.engines = new Crate;
        this.engines.contents = "engine";
		this.engines.setTexture(res.BoxOfEngines_png);
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
		
		//prints out what the car needs to the console		
		this.PrintCarReq(this.car.req);

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
				this.player.ACTION=false;
            }
            else if (hitObject.tag == "bin") {
                if (hitObject.contents == "door") this.item.setTexture(res.Door_png);
                if (hitObject.contents == "tire") this.item.setTexture(res.Tire_png);
                if (hitObject.contents == "engine") this.item.setTexture(res.Engine_png);
                cc.log("Picked up " + hitObject.contents);
                this.player.state = hitObject.contents;
				this.player.ACTION=false;
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
				this.player.ACTION=false;
            }
        }
        else if (hitObject.tag == "car") {
            this.item.setTexture(res.blank);
            cc.log("Holding something, and next to car");
			if(this.ComparePartToCar()==true){
				this.player.state = this.player.nothing;
			}
			this.player.ACTION=false;
        }
		//put down paint in it's original spot
        else if (hitObject.tag == "paint"){
			if (hitObject.ccolor == "white") {
				hitObject.setTexture(res.whitePaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
			}
			if (hitObject.ccolor == "black") {
				hitObject.setTexture(res.blackPaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
			}
			if (hitObject.ccolor == "red") {
				hitObject.setTexture(res.redPaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
			}
			cc.log("put down paint color " + hitObject.ccolor)
			this.player.ACTION=false;
		}	
		
		cc.log("Already holding something and not next to car");
		this.player.ACTION=false;
        
    },
	
	PrintCarReq:function(req){
		
		for(var i=0; i<req.length; i++){
			if(i==0){
				for(var j=0; j<req[0].length; j++){
					if(req[0][j][1]>0)
						cc.log(req[0][j].toString());
				}
			}else if(req[i]!=""){
				cc.log(req[i]);
			}
		}
		
	},
	
	ComparePartToCar:function(){
		
		
		for(var i=0; i<this.car.req.length; i++){
			if(i==0){
				for(var j=0; j<this.car.req[0].length; j++){
					if(this.player.state==this.car.req[0][j][0] && this.car.req[0][j][1]>0){
						this.car.req[0][j][1]=this.car.req[0][j][1]-1;
						cc.log(this.car.req[0][j][0]+" added to car");
						this.PrintCarReq(this.car.req);
						this.CheckCarCompletion();
						cc.log(this.car.state);
						return true;
					}
				}
			}else{
				if(this.player.state==this.car.req[i]){
					cc.log(this.car.req[i]+" added to car");
					this.car.req[i]="";
					this.PrintCarReq(this.car.req);
					this.CheckCarCompletion();
					cc.log(this.car.state);
					return false;
				}
			}
		}
		//do something when false?
		cc.log("RETURN FALSE");
		return false;
		
	},
	
	CheckCarCompletion:function(){
		for(var i=0; i<this.car.req.length; i++){
			if(i==0){
				for(var j=0; j<this.car.req[0].length; j++){
					if(this.car.req[0][j][1]!=0)
						return false;
				}
			}else{
				if(this.car.req[i]!="")
					return false;
			}
		}
		this.car.state="repaired";
		this.car.setTexture(this.car.fixedSprite);
	}
	
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


