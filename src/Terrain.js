var Terrain = function(sprite) {
    this.sprite = sprite;
};

extend(Terrain, Entity, {
    draw: function(ctx) {
        var x = 0;
        var y = 0;
        var between = false;
        this.sprite.descriptors.forEach(function(part) {
            this.sprite.drawPart(ctx, part, new Point(x, y));
            x += part.width;
            if(x > 700) {
                if(!between) {
                    x = 132 / 2;
                } else {
                    x = 0;
                }
                between = !between;
                y += 99 / 2;
            }
        }, this);
    }
});
