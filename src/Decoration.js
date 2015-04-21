var Decoration = function(sprite, id, dim, pos) {
    this.sprite = sprite;
    this.part = sprite.get(id);
    this.position = new Point(dim.x * pos.x, dim.y * (pos.y - 1));
};

extend(Decoration, Entity, {
    draw: function(ctx) {
        this.sprite.drawPart(ctx, this.part, this.position);
    }
});
