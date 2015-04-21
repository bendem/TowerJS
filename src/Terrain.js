var Terrain = function(sprite, terrain_grid, square_dimension) {
    this.sprite = sprite;
    this.grid = terrain_grid;
    this.square_dimension = square_dimension;

    this.cols = terrain_grid.length;
    this.lines = terrain_grid[0].length;

    this.grass = this.sprite.get('grass_block');
    this.dirt = this.sprite.get('dirt_block');
    this.water = this.sprite.get('water_block');
    this.path = this.sprite.get('stone_block');
};

extend(Terrain, Entity, {
    draw: function(ctx) {
        var point = new Point(0, -50);
        for(var x = 0; x < this.cols; x++) {
            for(var y = 0; y < this.lines; y++) {
                switch(this.grid[x][y]) {
                    case 'dirt':
                        this.sprite.drawPart(ctx, this.dirt, point);
                        break;
                    case 'grass':
                        this.sprite.drawPart(ctx, this.grass, point);
                        break;
                    case 'water':
                        this.sprite.drawPart(ctx, this.water, point);
                        break;
                    case 'path':
                        this.sprite.drawPart(ctx, this.path, point);
                        break;

                }
                point = point.addX(this.square_dimension.x);
            }
            point.x = 0;
            point = point.addY(this.square_dimension.y);
        }
    }
});
