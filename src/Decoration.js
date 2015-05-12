var Decoration = function(sprite, id, pos) {
    this.sprite = sprite;
    this.part = sprite.get(id);

    this.position = new Point(
        square_dimension.x * pos.x,
        square_dimension.y * (pos.y - 1)
    );
    this.layer = pos.y + 0.1;
};

extend(Decoration, Entity, {
    drawInfo: function(ctx) {
        return {
            name: 'decoration',
            part: this.part,
            position: this.position,
            layer: this.layer
        };
    },
});
