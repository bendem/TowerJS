var Decoration = function(sprite, id, line, column) {
    this.sprite = sprite;
    this.part = sprite.get(id);
    this.position = new Point(this.part.width * column, 83 * line);
    this.line = line;
    this.column = column;
};

extend(Decoration, Entity, {
    draw: function(ctx) {
        this.sprite.drawPart(ctx, this.part, this.position);
    }
})
