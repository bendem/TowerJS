var Terrain = function(sprite, terrain_grid) {
    this.sprite = sprite;
    this.grid = terrain_grid;

    this.grass = this.sprite.get('grass_block');
    this.dirt = this.sprite.get('dirt_block');
    this.water = this.sprite.get('water_block');
    this.path = this.sprite.get('stone_block');
};

extend(Terrain, Entity, {
    drawInfo: function() {
        var parts = [];
        var point = new Point(0, -50);
        for(var y = 0; y < lines; y++) {
            for(var x = 0; x < cols; x++) {
                parts.push({
                    name: 'tile',
                    spritePart: this[this.grid[x][y]],
                    position: point.clone(),
                    layer: -1 - lines + y,
                });
                point.x += square_dimension.x;
            }
            point.x = 0;
            point.y += square_dimension.y;
        }
        return parts;
    }
});
