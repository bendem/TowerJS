var SPRITE_URL = 'assets/sprites/landscape_sheet.png';

var game = new Game();
game.resourceManager.load(SPRITE_URL);
game.resourceManager.ready(function() {
    game.register(new Tower(game.resourceManager.get(SPRITE_URL)));
    game.start();
});
