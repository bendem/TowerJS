var LifeCounter = function(count, position, size, hPad, vPad) {
    this.count = count;
    this.position = position;
    this.size = size;
    this.hPad = hPad;
    this.vPad = vPad;
    this.layer = game.layerCount - 1;

    game.eventManager.register('life_lost', this.dec, this);
};

extend(LifeCounter, Entity, {
    drawInfo: function(ctx) {
        return {
            name: 'life_counter',
            layer: Infinity,
            counter: this,
        };
    },

    dec: function() {
        if(--this.count === 0) {
            game.eventManager.handleEvent('game_lost');
        }
    },
});
