var SPRITE = 'assets/sprites/PlanetCute.png';

// Game.debug = true;
var game = new Game();
var spriteBuilder = new SpriteBuilder(game.resourceManager, SPRITE).load();

game.resourceManager.ready(function() {
    var sprite = spriteBuilder.getSprite();
    var terrain_block = sprite.get('brown_block');
    var square_dimension = new Vector(terrain_block.width, 83);

    var cols = Math.floor(game.width / square_dimension.x);
    var lines = Math.floor(game.height / square_dimension.y);

    game.setWidth(cols * square_dimension.x);
    game.setHeight(lines * square_dimension.y);

    // Generate the map with the path
    var path = new Path(
        cols, lines,
        Math.floor(lines / 2),
        Math.floor(lines / 2)
    ).generate();

    // Add decorations
    var large_decorations = 4;
    var small_decorations = 3;
    var x, y, i;
    for(i = 0; i < large_decorations; i++) {
        x = randomInt(0, cols);
        y = randomInt(1, lines - 1);
        if(path[x][y+1] === 0) {
            path[x][y+1] = 3;
        }
    }
    for(i = 0; i < small_decorations; i++) {
        x = randomInt(0, cols);
        y = randomInt(1, lines - 1);
        if(path[x][y] === 0) {
            path[x][y] = 4;
        }
    }

    debugArray2D(path);

    // Generate the terrain and the decorations
    var terrain = [];
    var decorations = [];

    for(y = 0; y < lines; y++) {
        var a = [];
        for(x = 0; x < cols; x++) {
            switch(path[x][y]) {
                case 1:
                    a.push('path');
                    break;
                case 2:
                    a.push('dirt');
                    break;
                case 3:
                    a.push('grass');
                    decorations.push(new Decoration(
                        sprite,
                        'tree_tall',
                        square_dimension,
                        new Point(x, y),
                        2
                    ));
                    break;
                case 4:
                    a.push('grass');
                    decorations.push(new Decoration(
                        sprite,
                        choose(['tree_ugly', 'tree_short', 'rock']),
                        square_dimension,
                        new Point(x, y)
                    ));
                    break;
                default:
                    a.push('grass');
            }
        }
        terrain.push(a);
    }

    game.register(new Terrain(sprite, terrain, square_dimension));

    decorations.forEach(function(d) {
        game.register(d);
    });

    game
        .register(new Monster(path, new Point(0, Math.floor(lines / 2)), square_dimension))
        .register(new LifeCounter(3, new Point(10, 10), 40, 10, 1))
        ;

    game.start();
});
