var Car = cc.Sprite.extend ({
    ctor: function (d) {
        this._super();
		
		this.tag="car";
		this.state="";

		cc.winSize.width = 1920;
        cc.winSize.height = 1080;
        var size = cc.winSize;

        this.scale = 1.4;
		
		this.difficulty=d;

        var moveOnScreen = new cc.MoveTo(1.5,cc.p(size.width - 220,100));
        var moveLeft = new cc.MoveTo(6,cc.p(110,100));
        var moveUp = new cc.MoveTo(5,cc.p(110,size.height - 85));
        var moveRight = new cc.MoveTo(8,cc.p(size.width - 110,size.height - 85));
		var moveOffScreen = new cc.MoveTo(1.5,cc.p(size.width+400,size.height - 85))
        //Add a function that checks to see if you've succeeded or not (point system as well)


        var seq = new cc.Sequence(moveOnScreen,cc.delayTime(2),moveLeft,moveUp,moveRight,
									cc.delayTime(2), moveOffScreen);

        this.runAction(seq);

		//Creates this.req, an array of everything the car needs
		this.req=[];
		var tempNum=0;
		var numTasks=5;
		var diff=this.difficulty;
		var toolChoices=["hammer","blowtorch","wrench"];
		
		this.tuple1=["tire",0];
		this.tuple2=["door",0];
		this.tuple3=["engine",0];
		this.parts=[this.tuple1,this.tuple2,this.tuple3];
		
		for(var i=0; i<this.parts.length; i++){
			tempNum=Math.floor((Math.random()*4));
			if(diff-tempNum >= 0 && numTasks>3){
				this.parts[i][1]=tempNum;
				diff=diff-tempNum;
				numTasks=numTasks-1;
			}else{
				this.parts[i][1]=0;
			}
		}
		
		this.req.push(this.parts);
		
		this.req.push(toolChoices[Math.floor((Math.random()*3))]);
		numTasks=numTasks-1;
		
		
		this.paintColors=["redPaint","whitePaint","blackPaint"];
		this.index=Math.floor((Math.random()*3));
		this.paint=this.paintColors[this.index];
		if(diff>0 && numTasks>0){
			this.req.push(this.paint);
			diff=diff-1;
		}
		var labeltext = "Defined";
		this.label = new cc.LabelTTF(labeltext, "Arial", 20);
		this.label.x = 260;
		this.label.y = 110
		this.addChild(this.label);
		this.scheduleUpdate();
		/////////////////////////////////////////////////////////
		
		this.fixedSpritesList=[res.CarFixedRed_png, res.CarFixedWhite_png, res.CarFixedBlack_png];
		this.fixedSprite=this.fixedSpritesList[this.index];
		
        return true;
    },
    // you can also use the update method, which is called every frame
    // dt is the deltaTime, amount of time since last update call
    // make sure to call this.scheduleUpdate() in the constructor
    // to activate this if you want it
    update:function(dt) {

		//The following block of code updates the car's requirements on screen
		var carstring = "";
		var i = 0;
		for (i; i <= 2; i++)
		{
			if (this.req[0][i][1] > 0)
			{
				carstring += this.req[0][i][0] + " x" + this.req[0][i][1] + "\n";
			}
		}
		for (i = 1; i < this.req.length;i++)
		{
			carstring += this.req[i] + "\n";
		}
		this.label.setString(carstring);
    }
});