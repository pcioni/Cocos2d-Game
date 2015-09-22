var StartScreenLayer=cc.Layer.extend({
	ctor:function(){
		this._super();
		this.audio = cc.audioEngine;
		this.audio.playMusic(res.TitleTheme_wav,true);
		var winsize=cc.director.getWinSize();
		var centerpos=cc.p(winsize.width/2,winsize.height/2);
		
		this.spriteSS=new cc.Sprite(res.StartScreen_png);
		this.spriteSS.setPosition(centerpos);
		this.spriteSS.setScale(0.40);
		this.addChild(this.spriteSS);
		
		this.spriteClick=new cc.Sprite(res.ClickToStart_png);
		this.spriteClick.setPosition(centerpos);
		this.spriteClick.y=this.spriteClick.y-100;
		this.spriteClick.setScale(0.30);
		this.addChild(this.spriteClick);
	},
	
	init:function(){
		
		this._super();
		
		var listenerClick=cc.EventListener.create({
			event: cc.EventListener.MOUSE,
			onMouseUp: function(event){
				cc.log("mouse up: "+event.getButton());
				cc.director.runScene(new MainScene());
			}
		});
		
		cc.eventManager.addListener(listenerClick, this.spriteSS);
		
	}

});

var StartScreen = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new StartScreenLayer();
		layer.init();
		this.addChild(layer);
	}
})