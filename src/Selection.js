var Selection = function(grid) {
    this.grid = grid;
    this.selected = null;
    this.layer = null;
    game.eventManager.register('button_left_up', this.handleClick, this);
};

Selection.prototype = {
    handleClick: function(name, arg) {
        var position = globalToGrid(arg);
        if(Arrays2D.get(this.grid, position) !== 0) {
            this.selected = null;
            return;
        }

        if(this.selected && this.selected.equals(position)) {
            this.selected = null;
        } else {
            this.selected = position;
            this.layer = position.y;
        }
    },

    drawInfo: function(ctx) {
        if(this.selected) {
            return {
                name: 'selection',
                layer: this.layer,
                position: gridToGlobal(this.selected),
            };
        }
    }
};
