var cbelt = cc.Sprite.extend ({
    ctor: function () {
        this._super();

        return true;

    },


    cmid:function() {
        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.cbeltMID_plist);
        var i,f;
        var frames=[];
        for (i=1; i <= 15; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("HorzConveyerMID"+i+".png");
            frames.push(f);
        }
        var runAnim = new cc.Animation(frames, 0.1);
        this.cbeltMIDAction = new cc.RepeatForever(new cc.Animate(runAnim))
        this.runAction(this.cbeltMIDAction);
    },

    cend:function(){
        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.cbeltEND_plist);
        var frames2=[];
        for (i=1; i <= 15; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("HORZconveyerEND"+i+".png");
            frames2.push(f);
        }
        var runAnim2 = new cc.Animation(frames2, 0.1);
        this.cbeltENDAction = new cc.RepeatForever(new cc.Animate(runAnim2));
        this.runAction(this.cbeltENDAction);
    },

    cvert:function(){
        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.cbeltVERT_plist);
        var frames3=[];
        for (i=1; i <= 12; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("VertConveyerEND_down"+i+".png");
            frames3.push(f);
        }
        var runAnim3 = new cc.Animation(frames3, 0.1);
        this.cbeltVERTAction = new cc.RepeatForever(new cc.Animate(runAnim3));
        this.runAction(this.cbeltVERTAction);
    },

    cmidrev:function(){
        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.cbeltMID_plist);
        var i,f;
        var frames=[];
        for (i=1; i <= 15; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("HorzConveyerMID"+i+".png");
            frames.push(f);
        }
        var runAnim = new cc.Animation(frames, 0.1);
        this.cbeltMIDAction = new cc.RepeatForever(new cc.Animate(runAnim))
        this.runAction(this.cbeltMIDAction);
        //Probably a duct tape solution
        this.runAction(this.cbeltMIDAction.reverse());
    },


    update:function(dt) {

    }
});