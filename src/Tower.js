var Tower = function(sprite) {
    this.sprite = sprite;
};

extend(Tower, Entity, {
    draw: function(ctx) {
        this.sprite.draw(ctx, 'crystals_1', new Point(0, 0));
    }
});
