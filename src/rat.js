var Rat = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Rat_png);
        this.scheduleUpdate();

        this.tag = "rat";
        this.speed = 7;
        this.schedule(this.randomWalk, 0.5);

        this.dirs = ["up", "down", "left", "right"];
        this.direction = "";

        return true;
    },

    randomWalk:function() {
        var num = Math.floor((Math.random()*4));
        this.direction = this.dirs[num];
    },

    update:function(dt) {
        if(this.direction == "up") {
            if (this.y < 903 - this.height/2)
                this.y += this.speed;
        }
        else if(this.direction == "down") {
            if (this.y > 173 + this.height/2)
                this.y -= this.speed;
        }
        if(this.direction == "left") {
            if (this.x > 188 + this.width/2)
                this.x -= this.speed;
        }
        else if(this.direction == "right"){
            if (this.x < 1920 - this.width/2)
                this.x += this.speed;
        }
    }
});