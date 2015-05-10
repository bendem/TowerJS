var Tower = function(sprite, pos, range) {
    this.sprite = sprite;
    this.position = pos;
    this.range = range;
    this.layer = pos.y;

    this.selected = false;
    this.cooldown = 20;
    this.lastShot = 20;

    // @temp
    this.width = square_dimension.x / 2;
    this.height = square_dimension.y / 2;
    this.positionOnSquare = new Point(
        square_dimension.x / 2 - this.width / 2,
        square_dimension.y / 2 - this.height / 2
    );

    game.eventManager.register('tile_selected', this.handleSelection, this);
    game.eventManager.register('tile_unselected', this.handleUnselection, this);
};

extend(Tower, Entity, {
    handleSelection: function(name, position) {
        if(this.position.equals(position)) {
            this.selected = true;
        }
    },

    handleUnselection: function(name, position) {
        if(this.position.equals(position)) {
            this.selected = false;
        }
    },

    update: function(entities) {
        var target;
        if(++this.lastShot >= this.cooldown) {
            target = this.findTarget(entities);
            if(target) {
                this.shoot(target);
            }
            this.lastShot = 0;
        }
    },

    findTarget: function(entities) {
        // Only look for monsters
        var monsters = entities.filter(function(e) { return e instanceof Monster; });

        var self = this;
        // Find the first in range
        return Arrays.first(monsters, function(e) {
            return e.getBox().squaredDistance(self.getBox().getCenter()) <= square(self.range);
        });
    },

    shoot: function(target) {
        game.register(new Bullet(
            target,
            gridToGlobal(this.position, this.positionOnSquare)
                .addX(this.width / 2)
                .addY(this.height / 2)
        ));
    },

    getBox: function() {
        return new Box(
            gridToGlobal(this.position, this.positionOnSquare),
            this.width,
            this.height
        );
    },

    drawInfo: function(ctx) {
        var parts = [{
            name: 'tower',
            layer: this.layer,
            position: gridToGlobal(this.position, this.positionOnSquare),
            width: this.width,
            height: this.height,
        }];

        if(this.selected) {
            parts.push({
                name: 'tower_range',
                layer: Infinity,
                position:  gridToGlobal(this.position, this.positionOnSquare)
                    .addX(this.width / 2)
                    .addY(this.height / 2),
                range: this.range,
            });
        }

        return parts;
    },
});
