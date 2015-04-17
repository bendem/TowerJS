var Terrain = function(sprite) {
    this.sprite = sprite;

    this.grass = this.sprite.get('grass_block');
    this.dirt = this.sprite.get('dirt_block');
    this.water = this.sprite.get('water_block');
};

extend(Terrain, Entity, {
    draw: function(ctx) {
        var point = new Point(30, -20);
        for(var i = 0; i < 10; i++) {
            for(var j = 0; j < 13; j++) {
                if(j === 2 || i === 2) {
                    this.sprite.drawPart(ctx, this.water, point);
                } else if(j === 1 || j === 3 || i === 1 || i === 3) {
                    this.sprite.drawPart(ctx, this.dirt, point);
                } else {
                    this.sprite.drawPart(ctx, this.grass, point);
                }
                point = point.addX(this.grass.width);
            }
            point.x = 30;
            point = point.addY(83);
        }
    }
});
