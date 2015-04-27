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
        roundRect(
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

// TODO Move that to JsGameLib
var roundRect = function(ctx, pos, w, h, rad) {
    ctx.beginPath();

    // start after top left
    ctx.moveTo(pos.x + rad, pos.y);

    // top right
    ctx.lineTo(pos.x + w - rad, pos.y);
    ctx.arcTo(pos.x + w, pos.y, pos.x + w, pos.y + rad, rad);
    // bottom right
    ctx.lineTo(pos.x + w, pos.y + h - rad);
    ctx.arcTo(pos.x + w, pos.y + h, pos.x + w - rad, pos.y + h, rad);

    // bottom left
    ctx.lineTo(pos.x + rad, pos.y + h);
    ctx.arcTo(pos.x, pos.y + h, pos.x, pos.y + h - rad, rad);

    // top left
    ctx.lineTo(pos.x, pos.y + rad);
    ctx.arcTo(pos.x, pos.y, pos.x + rad, pos.y, rad);
};
