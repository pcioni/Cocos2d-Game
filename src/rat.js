var Rat = cc.Sprite.extend ({
    ctor: function () {
        this._super();
        this.scheduleUpdate();

        this.tag = "rat";
        this.speed = 7;
        //change this number to determine how often the rat switches direction
        this.schedule(this.randomWalk, 0.25);

        this.dirs = ["up", "down", "left", "right"];
        this.direction = "";

        //animation junk
        var i,f;
        cc.spriteFrameCache.addSpriteFrames(res.ratVert_plist);
        var frames2=[];
        for (i=1; i <= 4; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("vertRat"+i+".png");
            frames2.push(f);
        }
        var runAnim2 = new cc.Animation(frames2, 0.25);
        this.vertrat = new cc.RepeatForever(new cc.Animate(runAnim2));

        //animation junk
        cc.spriteFrameCache.addSpriteFrames(res.ratHorz_plist);
        var frames=[];
        for (i=1; i <= 4; i++) {
            f=cc.spriteFrameCache.getSpriteFrame("rat"+i+".png");
            frames.push(f);
        }
        var runAnim = new cc.Animation(frames, 0.25);
        this.horzrat = new cc.RepeatForever(new cc.Animate(runAnim))
        this.runAction(this.horzrat);

        return true;
    },

    //The rat operates on a random walk. It rolls a number 0-3, uses that as an index for a direction in dirs.
    //It runs that direction for 1/4 of a second befre rerolling. Change this number in this.schedule
    randomWalk:function() {
        var num = Math.floor((Math.random()*100)) % 4;
        this.direction = this.dirs[num];
    },

    update:function(dt) {
        if(this.direction == "up") {
            if (this.y < 835 - this.height/2)
                this.y += this.speed;
            this.stopAllActions();
            this.runAction(this.vertrat);
        }
        else if(this.direction == "down") {
            if (this.y > 200 + this.height/2)
                this.y -= this.speed;
            this.stopAllActions();
            this.runAction(this.vertrat);
        }
        if(this.direction == "left") {
            this.flippedX = 0;
            if (this.x > 200 + this.width/2)
                this.x -= this.speed;
            this.stopAllActions();
            this.runAction(this.horzrat);
        }
        else if(this.direction == "right"){
            this.flippedX = 180;
            if (this.x < 1800 - this.width/2)
                this.x += this.speed;
            this.stopAllActions();
            this.runAction(this.horzrat);
        }
    }
});
