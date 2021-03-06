var SPRITE = 'assets/sprites/PlanetCute.png';
var square_dimension, cols, lines;
var gridToGlobal = function(point, offset) {
    var glob = point.scale(square_dimension);
    if(offset) {
        glob = glob.add(offset);
    }
    return glob;
};

var globalToGrid = function(point) {
    return new Point(
        Math.floor(point.x / square_dimension.x),
        Math.floor(point.y / square_dimension.y)
    );
};

// Game.debug = true;
var game = new Game();
var spriteBuilder = new SpriteBuilder(game.resourceManager, SPRITE).load();

game.resourceManager.ready(function() {
    var sprite = spriteBuilder.getSprite();
    var terrain_block = sprite.get('brown_block');
    square_dimension = new Vector(terrain_block.width, 83);

    cols = Math.floor(game.width / square_dimension.x);
    lines = Math.floor(game.height / square_dimension.y);

    Utils.assert(cols > 0 && cols < Infinity);
    Utils.assert(lines > 0 && lines < Infinity);

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

    new DrawingFunctionsManager().register(game.renderer);

    game
        .register(new Terrain(sprite, terrain))
        .register(new Tower(sprite, new Point(2, 5), square_dimension.x / 2 * 3))
        .register(decorations)
        .register(new Monster(100, path, new Point(0, Math.floor(lines / 2)), square_dimension))
        .register(new LifeCounter(3, new Point(10, 10), 40, 10, 1))
        .register(new Selection(path))
        ;

    game.start();
});
