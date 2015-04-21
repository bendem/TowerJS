var Decoration = function(sprite, id, dim, pos, height) {
    this.sprite = sprite;
    this.part = sprite.get(id);
    height = height ? height - 1 : 1;
    this.position = new Point(dim.x * pos.x, dim.y * (pos.y - height));
};

extend(Decoration, Entity, {
    draw: function(ctx) {
        this.sprite.drawPart(ctx, this.part, this.position);
    }
});
