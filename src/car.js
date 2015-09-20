var Car = cc.Sprite.extend ({
    ctor: function (d) {
        this._super();
		
		this.tag="car";
		this.state="";

        var size = cc.winSize;

        this.scale = 1.4;
		
		this.difficulty=d;
		cc.log(this.difficulty);

        var moveOnScreen = new cc.MoveTo(1.5,cc.p(size.width - 220,100));
        var moveLeft = new cc.MoveTo(6,cc.p(110,100));
        var moveUp = new cc.MoveTo(5,cc.p(110,size.height - 85));
        var moveRight = new cc.MoveTo(8,cc.p(size.width - 110,size.height - 85));
        //Add a function that checks to see if you've succeeded or not (point system as well)


        var seq = new cc.Sequence(moveOnScreen,cc.delayTime(2),moveLeft,moveUp,moveRight);

        this.runAction(seq);

		//Creates this.req, an array of everything the car needs
		this.req=[];
		var tempNum=0;
		var diff=this.difficulty;
		cc.log(diff);
		
		this.tuple1=["tire",0];
		this.tuple2=["door",0];
		this.tuple3=["engine",0];
		this.parts=[this.tuple1,this.tuple2,this.tuple3];
		
		for(var i=0; i<this.parts.length; i++){
			tempNum=Math.floor((Math.random()*4));
			if(diff-tempNum >= 0){
				this.parts[i][1]=tempNum;
				diff=diff-tempNum;
			}else{
				this.parts[i][1]=0;
			}
		}
		
		this.req.push(this.parts);
		
		
		if(Math.floor((Math.random()*10))%2==1 && diff-1 >= 0){
			this.req.push("hammer");
			diff=diff-1;
		}
		
		if(Math.floor((Math.random()*10))%2==1 && diff-1 >= 0){
			this.req.push("blowtorch");
			diff=diff-1;
		}
		
		if(Math.floor((Math.random()*10))%2==1 && diff-1 >= 0){
			this.req.push("wrench");
		}
		
		
		this.paintColors=["redPaint","whitePaint","blackPaint"];
		this.index=Math.floor((Math.random()*3));
		this.paint=this.paintColors[this.index];
		if(diff-1 >= 0){
			this.req.push(this.paint);
			diff=diff-1;
		}
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

    }
});