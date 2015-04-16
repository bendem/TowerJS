var Terrain = function(sprite) {
    this.sprite = sprite;
};

extend(Terrain, Entity, {
    draw: function(ctx) {
        var part = this.sprite.get('landscape_21');
        var point = new Point(part.width, part.height);
        var between = false;
        for(var i = 0; i < 110; i++) {
            this.sprite.drawPart(ctx, part, point);
            point = point.addX(part.width);
            if(point.x > 900) {
                point.x = between ? part.width : part.width / 2;
                between = !between;
                point = point.addY(part.height / 2.6);
            }
        }
    }
});
