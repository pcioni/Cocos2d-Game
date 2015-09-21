var GameOverScene=cc.Scene.extend({
	ctor:function(){
		this._super();
		
		var winsize=cc.director.getWinSize();
		var centerpos=cc.p(winsize.width/2,winsize.height/2);
		
		var spriteGO=new cc.Sprite(res.GameOver_png);
		spriteGO.setPosition(centerpos);
		this.addChild(spriteGO)
	}

})