var Selection = function(grid) {
    this.grid = grid;
    this.selected = null;
    this.layer = null;
    game.eventManager.register('button_left_up', this.handleClick, this);
};

Selection.prototype = {
    handleClick: function(name, arg) {
        var position = globalToGrid(arg);
        var cancelled;

        if(this.selected) {
            cancelled = game.eventManager.handleEvent('tile_unselected', this.selected);
            if(cancelled) {
                return;
            }
        }

        if(Arrays2D.get(this.grid, position) !== 0) {
            this.selected = null;
            return;
        }

        if(this.selected && this.selected.equals(position)) {
            this.selected = null;
        } else {
            cancelled = game.eventManager.handleEvent('tile_selected', position);
            if(!cancelled) {
                this.selected = position;
                this.layer = position.y;
            }
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
