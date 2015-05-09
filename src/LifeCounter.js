var LifeCounter = function(count, position, size, hPad, vPad) {
    this.count = count;
    this.position = position;
    this.size = size;
    this.hPad = hPad;
    this.vPad = vPad;
    this.layer = game.layerCount - 1;

    game.renderer.register('life_counter', function(ctx, info) {
        ctx.font = info.counter.size + 'px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        var width = ctx.measureText(info.counter.count).width;

        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = '#111';
        ctx.beginPath();
        Draw.roundedRect(
            ctx,
            info.counter.position,
            info.counter.hPad * 2 + width, info.counter.vPad * 2 + info.counter.size,
            3
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#eee';
        ctx.fillText(
            info.counter.count,
            info.counter.position.x + info.counter.hPad + width / 2,
            info.counter.position.y + info.counter.vPad + info.counter.size / 2
        );
    });

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
