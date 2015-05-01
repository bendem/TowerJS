var Decoration = function(sprite, id, pos) {
    this.sprite = sprite;
    this.part = sprite.get(id);

    this.position = new Point(
        square_dimension.x * pos.x,
        square_dimension.y * (pos.y - 1)
    );
    this.layer = pos.y;
};

extend(Decoration, Entity, {
    draw: function(ctx) {
        this.sprite.drawPart(ctx, this.part, this.position);
    }
});
