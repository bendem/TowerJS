var Tower = function(sprite, pos, range) {
    this.sprite = sprite;
    this.position = pos;
    this.range = range;
    this.layer = pos.y;

    this.selected = true;
    this.cooldown = 350;
    this.lastShot = 350;

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
        var self = this;
        return Arrays.first(entities.filter(function(e) {
            return e instanceof Monster;
        }), function(e) {
            return gridToGlobal(
                e.position,
                e.positionOnSquare
            ).distance(gridToGlobal(
                self.position,
                self.positionOnSquare
            )) < self.range;
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
