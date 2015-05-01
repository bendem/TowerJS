var SPRITE = 'assets/sprites/PlanetCute.png';

// Game.debug = true;
var game = new Game();
var spriteBuilder = new SpriteBuilder(game.resourceManager, SPRITE).load();
var square_dimension;

game.resourceManager.ready(function() {
    var sprite = spriteBuilder.getSprite();
    var terrain_block = sprite.get('brown_block');
    square_dimension = new Vector(terrain_block.width, 83);

    var cols = Math.floor(game.width / square_dimension.x);
    var lines = Math.floor(game.height / square_dimension.y);

    game
        .setWidth(cols * square_dimension.x)
        .setHeight(lines * square_dimension.y)
        .setLayerCount(lines)
        ;

    // Generate the map with the path
    var path = new Path(
        cols, lines,
        Math.floor(lines / 2),
        Math.floor(lines / 2)
    ).generate();

    // Add decorations
    var squares = lines * cols;
    var large_decorations = squares / 40;
    var small_decorations = squares / 25;

    var decorator = new GameDecorator(path);

    decorator.decorate([3], large_decorations, new Vector(0, 1));
    decorator.decorate([4, 5, 6], small_decorations);

    Arrays2D.debug(path);

    var terrain = decorator.translateGrid({
        1: 'path',
        2: 'dirt'
    }, 'grass');

    var decorations = decorator.collectComponents({
        3: 'tree_tall',
        4: 'tree_ugly',
        5: 'tree_short',
        6: 'rock',
    }, sprite);

    game
        .register(new Terrain(sprite, terrain))
        .register(decorations)
        .register(new Monster(100, path, new Point(0, Math.floor(lines / 2)), square_dimension))
        .register(new LifeCounter(3, new Point(10, 10), 40, 10, 1))
        ;

    game.start();
});
