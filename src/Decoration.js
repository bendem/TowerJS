var Decoration = function(sprite, id, pos) {
    this.sprite = sprite;
    this.part = sprite.get(id);

    this.position = new Point(
        square_dimension.x * pos.x,
        square_dimension.y * (pos.y - 1)
    );
    this.layer = pos.y + 0.1;
    this.info = {
        name: 'decoration',
        part: this.part,
        position: this.position,
        layer: this.layer
    };
};

Decoration.prototype = {
    drawInfo: function(ctx) {
        return this.info;
    },
};
