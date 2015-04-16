var Tower = function(sprite) {
    this.sprite = sprite;
};

extend(Tower, Entity, {
    draw: function(ctx) {
        var top = this.sprite.get('tower_15');
        var middle = this.sprite.get('tower_25');
        var bottom = this.sprite.get('tower_06');

        var point = new Point(520, 400);
        this.sprite.drawPart(ctx, bottom, point.addX(-5).addY(top.height/2.1 + middle.height/2.6 + middle.height/2.6));
        this.sprite.drawPart(ctx, middle, point.addY(top.height/2.1 + middle.height/2.6));
        this.sprite.drawPart(ctx, middle, point.addY(top.height/2.1));
        this.sprite.drawPart(ctx, top, point);
/*
        // debug stuff
        point = new Point(0, 0);
        var between = false;
        Game.debug = true;
        this.sprite.descriptors.forEach(function(part) {
            this.sprite.drawPart(ctx, part, point);
            point = point.addX(part.width);
            if(point.x > 900) {
                point.x = between ? part.width : part.width / 2;
                between = !between;
                point = point.addY(part.height);
            }
        }, this);
        Game.debug = false;
*/
    }
});
