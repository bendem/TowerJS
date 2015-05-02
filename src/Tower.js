var Tower = function(sprite, pos, range) {
    this.sprite = sprite;
    this.position = pos;
    this.range = range;
    this.layer = pos.y;

    this.selected = true;
    this.cooldown = 300;
    this.lastShot = 300;

    // @temp
    this.width = square_dimension.x / 2;
    this.height = square_dimension.y / 2;
    this.positionOnSquare = new Point(
        square_dimension.x / 2 - this.width / 2,
        square_dimension.y / 2 - this.height / 2
    );
};

extend(Tower, Entity, {
    update: function(delta, entities) {
        var target;
        while(delta-- > 0) {
            if(++this.lastShot >= this.cooldown) {
                target = this.findTarget(entities);
                if(target) {
                    this.shoot(target);
                }
                this.lastShot = 0;
            }
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

    draw: function(ctx) {
        ctx.beginPath();
        Draw.roundedRect(
            ctx,
            gridToGlobal(this.position, this.positionOnSquare),
            this.width,
            this.height,
            5
        );

        ctx.fillStyle = 'rgba(50,50,150,0.8)';
        ctx.fill();
        this.blur(ctx).stroke();

        if(this.selected) {
            // TODO Range should be displayed above everything else except the ui
            ctx.beginPath();
            Draw.circle(
                ctx,
                gridToGlobal(this.position, this.positionOnSquare)
                    .addX(this.width / 2)
                    .addY(this.height / 2),
                this.range
            );
            ctx.stroke();
        }
    },

    blur: function(ctx) {
        ctx.lineWidth = 3;
        ctx.shadowBlur = 5;
        ctx.strokeStyle = '#fff';
        ctx.shadowColor = '#111';
        return ctx;
    }
});
