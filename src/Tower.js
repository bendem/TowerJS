var Tower = function(img) {
    this.sprite = new Sprite(img);
    // name="crystals_1.png" x="1720" y="198" width="132" height="112"
    this.sprite.registerId('crystals_1', new Point(1720, 198), 132, 112);
};

extend(Tower, Entity, {
    draw: function(ctx) {
        this.sprite.draw(ctx, 'crystals_1', new Point(0, 0));
    }
});
