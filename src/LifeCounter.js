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
    draw: function(ctx) {
        ctx.font = this.size + 'px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        var width = ctx.measureText(this.count).width;

        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.strokeStyle = '#111';
        ctx.beginPath();
        Draw.roundedRect(
            ctx,
            this.position,
            this.hPad * 2 + width, this.vPad * 2 + this.size,
            3
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#eee';
        ctx.fillText(
            this.count,
            this.position.x + this.hPad + width / 2,
            this.position.y + this.vPad + this.size / 2
        );
    },

    dec: function() {
        if(--this.count === 0) {
            game.eventManager.handleEvent('game_lost');
        }
    },
});
