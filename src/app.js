
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

		//On high-end machines, our A-grade, FPS-locked movement suddenly becomes extremely fast and
		//	extremely janky. I found this solution on the web, and I'm not sure what it does exactly,
		//	but it makes the game run smoother on my machine.
		//I'm going to jump in front of a bus if I ever have to do something this hacky again.
		cc.director.setAnimationInterval(1.0/45.0);

        this.audio = cc.audioEngine; //when using anything with audio in app.js, put audio. in front of it

        this.audio.playMusic(res.StageTheme_wav,true); //plays the stage theme

        cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
        cc.winSize.width = 1920;
        cc.winSize.height = 1080;
        this.size = cc.winSize;

        this.item = new Item;

		//the rat lol
		this.rat = new Rat;
		this.rat.x = 1200;
		this.rat.y = 450;

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

		//Score and Lives display
		this.points = 0;
		this.liveslabel = new cc.LabelTTF("Lives: " + this.player.lives,"Arial",40);
		this.pointslabel = new cc.LabelTTF("Score: " + this.points,"Arial",40);
		this.liveslabel.x = 1700;
		this.liveslabel.y = 760;
		this.pointslabel.x = 1700;
		this.pointslabel.y = 720;

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

		//conveyor belts
		//This is the dumbest way of doing this, but hey, I couldn't get a list to work.
		this.cbeltBottomMid1 = new cbelt; this.cbeltBottomMid1.x = 90; this.cbeltBottomMid1.y = 90; this.cbeltBottomMid1.cmid(); this.addChild(this.cbeltBottomMid1);
		this.cbeltBottomMid2 = new cbelt; this.cbeltBottomMid2.x = 270; this.cbeltBottomMid2.y = 90; this.cbeltBottomMid2.cmid(); this.addChild(this.cbeltBottomMid2);
		this.cbeltBottomMid3 = new cbelt; this.cbeltBottomMid3.x = 360; this.cbeltBottomMid3.y = 90; this.cbeltBottomMid3.cmid(); this.addChild(this.cbeltBottomMid3);
		this.cbeltBottomMid4 = new cbelt; this.cbeltBottomMid4.x = 540; this.cbeltBottomMid4.y = 90; this.cbeltBottomMid4.cmid(); this.addChild(this.cbeltBottomMid4);
		this.cbeltBottomMid5 = new cbelt; this.cbeltBottomMid5.x = 720; this.cbeltBottomMid5.y = 90; this.cbeltBottomMid5.cmid(); this.addChild(this.cbeltBottomMid5);
		this.cbeltBottomMid6 = new cbelt; this.cbeltBottomMid6.x = 900; this.cbeltBottomMid6.y = 90; this.cbeltBottomMid6.cmid(); this.addChild(this.cbeltBottomMid6);
		this.cbeltBottomMid7 = new cbelt; this.cbeltBottomMid7.x = 1080; this.cbeltBottomMid7.y = 90; this.cbeltBottomMid7.cmid(); this.addChild(this.cbeltBottomMid7);
		this.cbeltBottomMid8 = new cbelt; this.cbeltBottomMid8.x = 1260; this.cbeltBottomMid8.y = 90; this.cbeltBottomMid8.cmid(); this.addChild(this.cbeltBottomMid8);
		this.cbeltBottomMid9 = new cbelt; this.cbeltBottomMid9.x = 1440; this.cbeltBottomMid9.y = 90; this.cbeltBottomMid9.cmid(); this.addChild(this.cbeltBottomMid9);
		this.cbeltBottomMid10 = new cbelt; this.cbeltBottomMid10.x = 1620; this.cbeltBottomMid10.y = 90; this.cbeltBottomMid10.cmid(); this.addChild(this.cbeltBottomMid10);
		this.cbeltBottomMid11 = new cbelt; this.cbeltBottomMid11.x = 1800; this.cbeltBottomMid11.y = 90; this.cbeltBottomMid11.cmid(); this.addChild(this.cbeltBottomMid11);
		this.cbeltBottomMid12 = new cbelt; this.cbeltBottomMid12.x = 1980; this.cbeltBottomMid12.y = 90; this.cbeltBottomMid12.cend(); this.addChild(this.cbeltBottomMid12);

		this.cbeltLeft1 = new cbelt; this.cbeltLeft1.x = 80; this.cbeltLeft1.y = 255; this.cbeltLeft1.cvert(); this.addChild((this.cbeltLeft1));
		this.cbeltLeft2 = new cbelt; this.cbeltLeft2.x = 80; this.cbeltLeft2.y = 405; this.cbeltLeft2.cvert(); this.addChild((this.cbeltLeft2));
		this.cbeltLeft3 = new cbelt; this.cbeltLeft3.x = 80; this.cbeltLeft3.y = 555; this.cbeltLeft3.cvert(); this.addChild((this.cbeltLeft3));
		this.cbeltLeft4 = new cbelt; this.cbeltLeft4.x = 80; this.cbeltLeft4.y = 705; this.cbeltLeft4.cvert(); this.addChild((this.cbeltLeft4));
		this.cbeltLeft5 = new cbelt; this.cbeltLeft5.x = 80; this.cbeltLeft5.y = 855; this.cbeltLeft5.cvert(); this.addChild((this.cbeltLeft5));

		this.cbeltTopMid1 = new cbelt; this.cbeltTopMid1.x = 90; this.cbeltTopMid1.y = 1000; this.cbeltTopMid1.cmidrev(); this.addChild(this.cbeltTopMid1); this.flippedX = 180;
		this.cbeltTopMid2 = new cbelt; this.cbeltTopMid2.x = 270; this.cbeltTopMid2.y = 1000; this.cbeltTopMid2.cmidrev(); this.addChild(this.cbeltTopMid2); this.flippedX = 180;
		this.cbeltTopMid3 = new cbelt; this.cbeltTopMid3.x = 360; this.cbeltTopMid3.y = 1000; this.cbeltTopMid3.cmidrev(); this.addChild(this.cbeltTopMid3); this.flippedX = 180;
		this.cbeltTopMid4 = new cbelt; this.cbeltTopMid4.x = 540; this.cbeltTopMid4.y = 1000; this.cbeltTopMid4.cmidrev(); this.addChild(this.cbeltTopMid4); this.flippedX = 180;
		this.cbeltTopMid5 = new cbelt; this.cbeltTopMid5.x = 720; this.cbeltTopMid5.y = 1000; this.cbeltTopMid5.cmidrev(); this.addChild(this.cbeltTopMid5); this.flippedX = 180;
		this.cbeltTopmMid6 = new cbelt; this.cbeltTopmMid6.x = 900; this.cbeltTopmMid6.y = 1000; this.cbeltTopmMid6.cmidrev(); this.addChild(this.cbeltTopmMid6); this.flippedX = 180;
		this.cbeltTopMid7 = new cbelt; this.cbeltTopMid7.x = 1080; this.cbeltTopMid7.y = 1000; this.cbeltTopMid7.cmidrev(); this.addChild(this.cbeltTopMid7); this.flippedX = 180;
		this.cbeltTopMid8 = new cbelt; this.cbeltTopMid8.x = 1260; this.cbeltTopMid8.y = 1000; this.cbeltTopMid8.cmidrev(); this.addChild(this.cbeltTopMid8); this.flippedX = 180;
		this.cbeltTopMid9 = new cbelt; this.cbeltTopMid9.x = 1440; this.cbeltTopMid9.y = 1000; this.cbeltTopMid9.cmidrev(); this.addChild(this.cbeltTopMid9); this.flippedX = 180;
		this.cbeltTopMid10 = new cbelt; this.cbeltTopMid10.x = 1620; this.cbeltTopMid10.y = 1000; this.cbeltTopMid10.cmidrev(); this.addChild(this.cbeltTopMid10); this.flippedX = 180;
		this.cbeltTopMid11 = new cbelt; this.cbeltTopMid11.x = 1800; this.cbeltTopMid11.y = 1000; this.cbeltTopMid11.cmidrev(); this.addChild(this.cbeltTopMid11); this.flippedX = 180;
		this.cbeltTopMid12 = new cbelt; this.cbeltTopMid12.x = 1980; this.cbeltTopMid12.y = 1000; this.cbeltTopMid12.cmidrev(); this.addChild(this.cbeltTopMid12); this.flippedX = 180;

		this.addChild(this.blackPaint);
		this.addChild(this.redPaint);
        this.addChild(this.whitePaint);
		this.addChild(this.tires);
		this.addChild(this.doors);
		this.addChild(this.engines);
		this.addChild(this.trash);
		this.addChild(this.rat);
		this.addChild(this.player);
		this.addChild(this.hammer);
		this.addChild(this.wrench);
		this.addChild(this.blowtorch);
		this.addChild(this.item);
		this.addChild(this.pointslabel);
		this.addChild(this.liveslabel);

		//prints out what the car needs to the console
		//this.PrintCarReq(this.car.req);
		
        this.spritelist = [this.player, this.engines, this.tires, this.doors,
                            this.blackPaint, this.redPaint, this.whitePaint, 
							this.hammer, this.wrench, this.blowtorch, this.trash, this.rat];
		
		this.counterThing=0;
		this.CarSpawnSpeed=15;
		this.CarDiff=3;
		this.SpawnNewCar();
		this.schedule(this.SpawnNewCar, this.CarSpawnSpeed);
        return true;
    },

    update:function (dt) {
        this.item.x = this.player.x+30;
        this.item.y = this.player.y;

        this.CheckCollisions();
		this.liveslabel.setString("Lives: " + this.player.lives); //updates the lives on screen
		this.pointslabel.setString("Score: " + this.points); //updates score on screen
    },
	
	SpawnNewCar:function(){
		
		this.spritelist.push(new Car(this.CarDiff));
		this.spritelist[this.spritelist.length-1].x=this.size.width;
		this.spritelist[this.spritelist.length-1].y=100;
		this.spritelist[this.spritelist.length-1].state="broken";
		this.spritelist[this.spritelist.length-1].setTexture(res.CarBroke1_png);

		this.addChild(this.spritelist[this.spritelist.length-1]);
		this.PrintCarReq(this.spritelist[this.spritelist.length-1].req);
		this.counterThing=this.counterThing+1;
		
		//THIS IS WHERE OUT DIFFICULTY CURVE IS MADE
		
		//Every 3 cars spawn cars will spawn a second faster
		//until a car spawns every 8 seconds
		if(this.CarSpawnSpeed>8 && this.counterThing%3==0){
			this.CarSpawnSpeed=this.CarSpawnSpeed-1;
			this.schedule(this.SpawnNewCar, this.CarSpawnSpeed);
		}
		
		//After 10 cars, cars will require 4 tasks done to them inorder to be completed
		if(this.counterThing==10){
			this.CarDiff=4;
			this.schedule(this.SpawnNewCar, this.CarSpawnSpeed);
		}
		//////////////////////////////////////////////////////////////////
		
		cc.log("car #: "+this.counterThing);
	},

    //check for collision
    //Calls ChangeState if we collide with something, and also handles if the ACTION key is hit.
    CheckCollisions:function() {
        var i;
        for (i = 1; i < this.spritelist.length; i++) {
			//check for collision
            if (cc.rectIntersectsRect(this.player.getBoundingBox(), this.spritelist[i].getBoundingBox())) {

				if (this.spritelist[i].tag == "rat" && this.player.stunned == false) {
					this.points -= 20;
					this.player.hit();
				}

                if (this.player.ACTION == true)
                    this.ChangeState(this.spritelist[i]);
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
					this.GameOver = new GameOverScene();
					cc.director.runScene(this.GameOver);
					//stops all sounds and switches to game over
					this.audio.stopMusic();
					this.audio.stopAllEffects();
					this.audio.playMusic(res.GameOver_wav,false);
					this.finalscore = new cc.LabelTTF("Final Score: " + this.points, "Arial",40);
					this.GameOver.addChild(this.finalscore);
					this.finalscore.x = 960;
					this.finalscore.y = 180;
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
				this.audio.playEffect(res.PickUp_wav);this.player.state = hitObject.contents;
            }
            else if (hitObject.tag == "paint") {
				this.item.tag = "perm";
                if (hitObject.ccolor == "white") {
                    hitObject.setTexture(res.whitePaintSign);
                    this.item.setTexture(res.whitePaint_png);
                    this.player.state = "whitePaint";
                }
                if (hitObject.ccolor == "black") {
                    hitObject.setTexture(res.blackPaintSign);
                    this.item.setTexture(res.blackPaint_png);
                    this.player.state = "blackPaint";
                }
                if (hitObject.ccolor == "red") {
                    hitObject.setTexture(res.redPaintSign);
                    this.item.setTexture(res.redPaint_png);
                    this.player.state = "redPaint";
                }
				this.audio.playEffect(res.PickUp_wav);
                cc.log("picked up paint color " + hitObject.ccolor);
            }
			else if (hitObject.tag == "tool"){
				this.item.tag = "perm";
				if(hitObject.toolType=="hammer"){
					hitObject.setTexture(res.hammerSign);
					this.item.setTexture(res.HammerSitting_png);
					this.player.state=hitObject.toolType;
				}else if(hitObject.toolType=="wrench"){
					hitObject.setTexture(res.wrenchSign);
					this.item.setTexture(res.WrenchSitting_png);
					this.player.state=hitObject.toolType;
				}else if(hitObject.toolType=="blowtorch") {
					hitObject.setTexture(res.torchSign);
					this.item.setTexture(res.BlowTorchSitting_png);
					this.player.state = hitObject.toolType;
				}
				this.audio.playEffect(res.PickUp_wav);
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
			else if (this.ComparePartToCar(hitObject) == false) {
				if (this.item.tag != "perm") {
					this.item.setTexture(res.blank);
					this.player.state = this.player.nothing;
					this.audio.playEffect(res.WrongPart_wav);
					this.points -= 50; //subtracts 50 points when you put on the wrong part
				}
				//ADD SCORE DEDUCTION HERE
			}
			if(this.CheckCarCompletion(hitObject.req)==true){
					this.points += hitObject.difficulty*50;
					hitObject.state="repaired";
					hitObject.setTexture(hitObject.fixedSprite);
					hitObject.removeChild(hitObject.bubble);
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
			this.audio.playEffect(res.PickUp_wav);
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
			}else if(req[i]!="")
				cc.log(req[i]);
		}
		
	},
	
	ComparePartToCar:function(car){
		for(var i=0; i<car.req.length; i++){
			if(i==0){
				for(var j=0; j<car.req[0].length; j++){
					if(this.player.state==car.req[0][j][0] && car.req[0][j][1]>0){
						car.req[0][j][1]=car.req[0][j][1]-1;
						cc.log(car.req[0][j][0]+" added to car");
						this.audio.playEffect(res.Place_wav);
						this.PrintCarReq(car.req);
						return true;
					}
				}
			}else{
				if(this.player.state==car.req[i]){
					cc.log(car.req[i]+" added to car");
					if (car.req[i] == "hammer" || car.req[i] == "wrench")
						this.audio.playEffect(res.Wrench_wav);
					else if (car.req[i] == "blowtorch")
						this.audio.playEffect(res.Torch_wav);
					else
						this.audio.playEffect(res.SprayPaint_wav);
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


