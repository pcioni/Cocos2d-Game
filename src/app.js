
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
        //this.audio.playMusic(res.StageTheme_wav,true); //plays the stage theme

        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        cc.winSize.width = 1920;
        cc.winSize.height = 1080;
        this.size = cc.winSize;

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
		
		//tools children
		this.hammer = new Tool;
		this.wrench = new Tool;
		this.blowtorch = new Tool;
		this.hammer.toolType = "hammer";
		this.wrench.toolType = "wrench";
		this.blowtorch.toolType = "blowtorch";
        this.hammer.setTexture(res.HammerSitting_png);
		this.wrench.setTexture(res.WrenchSitting_png);
		this.blowtorch.setTexture(res.BlowTorchSitting_png);
		this.hammer.x = 450;
        this.wrench.x = 450;
        this.blowtorch.x = 450;
        this.hammer.y = 300;
        this.wrench.y = 450;
        this.blowtorch.y = 600;

        //Player child
        this.player = new Player;
        this.player.x = this.size.width/2;
        this.player.y = this.size.height/2;
		
        //Item children
		this.doors = new Crate;
        this.doors.contents = "door";
		this.doors.setTexture(res.BoxOfDoors_png);
        this.doors.x = this.size.width/2 - 250;
        this.doors.y = this.size.height/2;
        this.tires = new Crate;
        this.tires.contents = "tire";
		this.tires.setTexture(res.BoxOfWheels_png);
        this.tires.x = this.size.width/2;
        this.tires.y = this.size.height/2;
        this.engines = new Crate;
        this.engines.contents = "engine";
		this.engines.setTexture(res.BoxOfEngines_png);
        this.engines.x = this.size.width/2 + 250;
        this.engines.y = this.size.height/2;
		
		//background child
        var background = new cc.Sprite(res.Background_png);
        background.x = this.size.width / 2;
        background.y = this.size.height / 2;

		//trash child
		this.trash = new Trash;
		this.trash.x=this.size.width/2;
		this.trash.y=(this.size.height/2) - 200;

		//add everything as a child
        this.addChild(background);
        this.addChild(this.blackPaint);
        this.addChild(this.redPaint);
        this.addChild(this.whitePaint);
        this.addChild(this.player);
		this.addChild(this.tires);
		this.addChild(this.doors);
		this.addChild(this.engines);
		this.addChild(this.hammer);
		this.addChild(this.wrench);
		this.addChild(this.blowtorch);
		this.addChild(this.item);
		this.addChild(this.trash);

		//prints out what the car needs to the console		
		//this.PrintCarReq(this.car.req);
		
        this.spritelist = [this.player, this.engines, this.tires, this.doors,
                            this.blackPaint, this.redPaint, this.whitePaint, 
							this.hammer, this.wrench, this.blowtorch, this.trash];
		
		//this.spawn=this.SpawnNewCar();
		
		//window.setInterval(this.SpawnNewCar, 1000);
		this.SpawnNewCar();
		this.schedule(this.SpawnNewCar, 10.0);
        return true;
    },

    update:function (dt) {
        this.item.x = this.player.x;
        this.item.y = this.player.y;
        this.CheckCollisions();
    },
	
	SpawnNewCar:function(){
		
		this.spritelist.push(new Car(4));
		this.spritelist[this.spritelist.length-1].x=this.size.width;
		this.spritelist[this.spritelist.length-1].y=100;
		this.spritelist[this.spritelist.length-1].state="broken";
		this.spritelist[this.spritelist.length-1].setTexture(res.CarBroke1_png);
		this.addChild(this.spritelist[this.spritelist.length-1]);
		this.PrintCarReq(this.spritelist[this.spritelist.length-1].req);
	},

    //check for collision
    //Calls ChangeState if we collide with something, and also handles if the ACTION key is hit.
    CheckCollisions:function() {
        var i;
        for (i = 1; i < this.spritelist.length; i++) {
			//check for collision
            if (cc.rectIntersectsRect(this.player.getBoundingBox(), this.spritelist[i].getBoundingBox())) {
                if (this.player.ACTION == true){
                    this.ChangeState(this.spritelist[i]);
				}
            }
			
			if(this.spritelist[i].tag=="car" && this.spritelist[i].x>this.size.width){
				if(this.spritelist[i].state=="broken"){
					this.player.lives=this.player.lives-1;
				}
				this.spritelist.splice(i,1);
				i--;
				cc.log("THIS IS NO LONGER IN SPRITELIST");
				cc.log("lives: "+this.player.lives);
				if(this.player.lives==0){
					cc.director.runScene(new GameOverScene());
				}
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
				this.item.tag = "";
                if (hitObject.contents == "door") this.item.setTexture(res.Door_png);
                if (hitObject.contents == "tire") this.item.setTexture(res.Tire_png);
                if (hitObject.contents == "engine") this.item.setTexture(res.Engine_png);
                cc.log("Picked up " + hitObject.contents);
                this.player.state = hitObject.contents;
            }
            else if (hitObject.tag == "paint") {
				this.item.tag = "perm"
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
                cc.log("picked up paint color " + hitObject.ccolor);
            }
			else if (hitObject.tag == "tool"){
				this.item.tag = "perm";
				if(hitObject.toolType=="hammer"){
					hitObject.setTexture(res.paintBlank);
					this.item.setTexture(res.HammerSitting_png);
					this.player.state=hitObject.toolType;
				}else if(hitObject.toolType=="wrench"){
					hitObject.setTexture(res.paintBlank);
					this.item.setTexture(res.WrenchSitting_png);
					this.player.state=hitObject.toolType;
				}else if(hitObject.toolType=="blowtorch"){
					hitObject.setTexture(res.paintBlank);
					this.item.setTexture(res.BlowTorchSitting_png);
					this.player.state=hitObject.toolType;
				}
			}
			this.player.ACTION=false;
        }
        else if (hitObject.tag == "car") {
			//move set texture to blank so it only effects parts

            //cc.log("Holding something, and next to car");
			if (this.ComparePartToCar(hitObject)==true){
				this.player.state = this.player.nothing;
				if (this.item.tag != "perm")
					this.item.setTexture(res.blank);
			}
			else if (this.ComparePartToCar(hitObject) == false)
				if (this.item.tag != "perm") {
					this.item.setTexture(res.blank);
					this.player.state = this.player.nothing;
				}
				//ADD SCORE DEDUCTION HERE
			if(this.CheckCarCompletion(hitObject.req)==true){
					hitObject.state="repaired";
					hitObject.setTexture(hitObject.fixedSprite);
			}
        }
		//put down paint in it's original spot
        else if (hitObject.tag == "paint"){
			if (hitObject.ccolor == "white" && this.item.getTexture().url == res.whitePaint_png) {
				hitObject.setTexture(res.whitePaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.ccolor);
			}
			if (hitObject.ccolor == "black" && this.item.getTexture().url == res.blackPaint_png) {
				hitObject.setTexture(res.blackPaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.ccolor);
			}
			if (hitObject.ccolor == "red" && this.item.getTexture().url == res.redPaint_png) {
				hitObject.setTexture(res.redPaint_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.ccolor);
			}
			cc.log("Could not put down paint color");
		}
		//put down tool in it's original spot
		else if (hitObject.tag == "tool") {
			if (hitObject.toolType == "hammer" && this.item.getTexture().url == res.HammerSitting_png ) {
				hitObject.setTexture(res.HammerSitting_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.toolType);
			}
			if (hitObject.toolType == "wrench" && this.item.getTexture().url == res.WrenchSitting_png) {
				hitObject.setTexture(res.WrenchSitting_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.toolType);
			}
			if (hitObject.toolType == "blowtorch" && this.item.getTexture().url == res.BlowTorchSitting_png) {
				hitObject.setTexture(res.BlowTorchSitting_png);
				this.item.setTexture(res.blank);
				this.player.state = this.player.nothing;
				cc.log("Put down paint color " + hitObject.toolType);
			}
			cc.log("Could not put down tool");

		}
		else if(hitObject.tag == "trash" && this.item.tag != "perm") {
			this.player.state =this.player.nothing;
			this.item.setTexture((res.blank));
			cc.log("THREW IT AWAY");
		}

		this.player.ACTION=false;
		
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
	
	ComparePartToCar:function(car){
		for(var i=0; i<car.req.length; i++){
			if(i==0){
				for(var j=0; j<car.req[0].length; j++){
					if(this.player.state==car.req[0][j][0] && car.req[0][j][1]>0){
						car.req[0][j][1]=car.req[0][j][1]-1;
						cc.log(car.req[0][j][0]+" added to car");
						this.PrintCarReq(car.req);
						return true;
					}
				}
			}else{
				if(this.player.state==car.req[i]){
					cc.log(car.req[i]+" added to car");
					car.req[i]="";
					this.PrintCarReq(car.req);
					return false;
				}
			}
		}
		//do something when false?
		cc.log("RETURN FALSE");
		return false;
		
	},
	
	CheckCarCompletion:function(req){
		for(var i=0; i<req.length; i++){
			if(i==0){
				for(var j=0; j<req[0].length; j++){
					if(req[0][j][1]!=0)
						return false;
				}
			}else{
				if(req[i]!="")
					return false;
			}
		}
		return true;
	}
	
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});


