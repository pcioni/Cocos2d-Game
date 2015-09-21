var Rat = cc.Sprite.extend ({
    ctor: function () {
        this._super(res.Rat_png);
        this.scheduleUpdate();

        this.tag = "rat";
        this.speed = 7;
        this.schedule(this.randomWalk, 0.25);

        this.dirs = ["up", "down", "left", "right"];
        this.direction = "";

        return true;
    },

    randomWalk:function() {
        var num = Math.floor((Math.random()*100)) % 4;
        this.direction = this.dirs[num];
    },

    update:function(dt) {
        if(this.direction == "up") {
            if (this.y < 835 - this.height/2)
                this.y += this.speed;
        }
        else if(this.direction == "down") {
            if (this.y > 200 + this.height/2)
                this.y -= this.speed;
        }
        if(this.direction == "left") {
            this.flippedX = 0;
            if (this.x > 200 + this.width/2)
                this.x -= this.speed;
        }
        else if(this.direction == "right"){
            this.flippedX = 180;
            if (this.x < 1800 - this.width/2)
                this.x += this.speed;
        }
    }
});