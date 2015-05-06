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

    draw: function(ctx) {
        if(!this.selected) {
            return;
        }
        ctx.beginPath();
        Draw.roundedRect(
            ctx,
            gridToGlobal(this.selected),
            square_dimension.x,
            square_dimension.y,
            6
        );
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 1;
        ctx.shadowColor = '#111';
        ctx.stroke();
    }
};
