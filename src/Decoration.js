var Decoration = function(sprite, id, pos, height) {
    this.sprite = sprite;
    this.part = sprite.get(id);
    height = height ? height - 1 : 1;
    this.position = new Point(
        square_dimension.x * pos.x,
        square_dimension.y * (pos.y - height)
    );
    this.layer = pos.y;
};

extend(Decoration, Entity, {
    draw: function(ctx) {
        this.sprite.drawPart(ctx, this.part, this.position);
    }
});
