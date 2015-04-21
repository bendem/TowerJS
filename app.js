var SPRITE = 'assets/sprites/PlanetCute.png';

// Game.debug = true;
var game = new Game();

// Start loading sprites before anything else
game.resourceManager.load(SPRITE);

game.resourceManager.ready(function() {
    var sprite = new Sprite(
        game.resourceManager.get(SPRITE)
    ).registerIds([
        {id: 'brown_block', position: new Point(0, 0), 'width': 101, 'height': 171},
        {id: 'character_boy', position: new Point(101, 0), 'width': 101, 'height': 171},
        {id: 'character_cat_girl', position: new Point(202, 0), 'width': 101, 'height': 171},
        {id: 'character_horn_girl', position: new Point(303, 0), 'width': 101, 'height': 171},
        {id: 'character_pink_girl', position: new Point(404, 0), 'width': 101, 'height': 171},
        {id: 'character_princess_girl', position: new Point(505, 0), 'width': 101, 'height': 171},
        {id: 'chest_closed', position: new Point(606, 0), 'width': 101, 'height': 171},
        {id: 'chest_lid', position: new Point(707, 0), 'width': 101, 'height': 171},
        {id: 'chest_open', position: new Point(808, 0), 'width': 101, 'height': 171},
        {id: 'dirt_block', position: new Point(909, 0), 'width': 101, 'height': 171},
        {id: 'door_tall_closed', position: new Point(1010, 0), 'width': 101, 'height': 171},
        {id: 'door_tall_open', position: new Point(0, 171), 'width': 101, 'height': 171},
        {id: 'enemy_bug', position: new Point(101, 171), 'width': 101, 'height': 171},
        {id: 'gem_blue', position: new Point(202, 171), 'width': 101, 'height': 171},
        {id: 'gem_green', position: new Point(303, 171), 'width': 101, 'height': 171},
        {id: 'gem_orange', position: new Point(404, 171), 'width': 101, 'height': 171},
        {id: 'grass_block', position: new Point(505, 171), 'width': 101, 'height': 171},
        {id: 'heart', position: new Point(606, 171), 'width': 101, 'height': 171},
        {id: 'key', position: new Point(707, 171), 'width': 101, 'height': 171},
        {id: 'plain_block', position: new Point(808, 171), 'width': 101, 'height': 171},
        {id: 'ramp_east', position: new Point(909, 171), 'width': 101, 'height': 171},
        {id: 'ramp_north', position: new Point(1010, 171), 'width': 101, 'height': 171},
        {id: 'ramp_south', position: new Point(0, 342), 'width': 101, 'height': 171},
        {id: 'ramp_west', position: new Point(101, 342), 'width': 101, 'height': 171},
        {id: 'rock', position: new Point(202, 342), 'width': 101, 'height': 171},
        {id: 'roof_east', position: new Point(303, 342), 'width': 101, 'height': 171},
        {id: 'roof_north_east', position: new Point(404, 342), 'width': 101, 'height': 171},
        {id: 'roof_north', position: new Point(505, 342), 'width': 101, 'height': 171},
        {id: 'roof_north_west', position: new Point(606, 342), 'width': 101, 'height': 171},
        {id: 'roof_south_east', position: new Point(707, 342), 'width': 101, 'height': 171},
        {id: 'roof_south', position: new Point(808, 342), 'width': 101, 'height': 171},
        {id: 'roof_south_west', position: new Point(909, 342), 'width': 101, 'height': 171},
        {id: 'roof_west', position: new Point(1010, 342), 'width': 101, 'height': 171},
        {id: 'selector', position: new Point(0, 513), 'width': 101, 'height': 171},
        {id: 'shadow_east', position: new Point(101, 513), 'width': 101, 'height': 171},
        {id: 'shadow_north_east', position: new Point(202, 513), 'width': 101, 'height': 171},
        {id: 'shadow_north', position: new Point(303, 513), 'width': 101, 'height': 171},
        {id: 'shadow_north_west', position: new Point(404, 513), 'width': 101, 'height': 171},
        {id: 'shadow_side_west', position: new Point(505, 513), 'width': 101, 'height': 171},
        {id: 'shadow_south_east', position: new Point(606, 513), 'width': 101, 'height': 171},
        {id: 'shadow_south', position: new Point(707, 513), 'width': 101, 'height': 171},
        {id: 'shadow_south_west', position: new Point(808, 513), 'width': 101, 'height': 171},
        {id: 'shadow_west', position: new Point(909, 513), 'width': 101, 'height': 171},
        {id: 'speechbubble', position: new Point(1010, 513), 'width': 101, 'height': 171},
        {id: 'star', position: new Point(0, 684), 'width': 101, 'height': 171},
        {id: 'stone_block', position: new Point(101, 684), 'width': 101, 'height': 171},
        {id: 'stone_block_tall', position: new Point(202, 684), 'width': 101, 'height': 171},
        {id: 'tree_short', position: new Point(303, 684), 'width': 101, 'height': 171},
        {id: 'tree_tall', position: new Point(404, 684), 'width': 101, 'height': 171},
        {id: 'tree_ugly', position: new Point(505, 684), 'width': 101, 'height': 171},
        {id: 'wall_block', position: new Point(606, 684), 'width': 101, 'height': 171},
        {id: 'wall_block_tall', position: new Point(707, 684), 'width': 101, 'height': 171},
        {id: 'water_block', position: new Point(808, 684), 'width': 101, 'height': 171},
        {id: 'window_tall', position: new Point(909, 684), 'width': 101, 'height': 171},
        {id: 'wood_block', position: new Point(1010, 684), 'width': 101, 'height': 171}
    ]);

    var terrain_block = sprite.get('brown_block');
    var square_dimension = new Vector(terrain_block.width, 83);

    var cols = Math.floor(game.width / square_dimension.x);
    var lines = Math.floor(game.height / square_dimension.y);

    game.setWidth(cols * square_dimension.x);
    game.setHeight(lines * square_dimension.y);

    var path = generateHorizontalPath(
        cols, lines,
        new Point(0, Math.floor(lines / 2)),
        new Point(cols - 1, randomInt(0, Math.floor(lines / 2)))
    );

    var terrain = [];

    for(var y = 0; y < lines; y++) {
        var a = [];
        for(var x = 0; x < cols; x++) {
            a.push(path[x][y] ? 'dirt' : 'grass');
        }
        terrain.push(a);
    }

    game
        .register(new Terrain(sprite, terrain, square_dimension))
        // .register(new Tower(sprite))
        .register(new Decoration(sprite, 'tree_tall', 3, 4))
        .register(new Decoration(sprite, 'tree_tall', 4, 5))
        .register(new Decoration(sprite, 'tree_tall', 9, 5))
        .register(new Decoration(sprite, 'tree_tall', 5, 9))
        ;
    game.start();
});
