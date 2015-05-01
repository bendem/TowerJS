var Bullet = function(target, pos) {
    this.target = target;
    this.position = pos; // global position
    this.layer = Math.floor(pos.y / square_dimension.y);
    this.damage = 1;
};

extend(Bullet, Entity, {
    update: function(delta) {
        // Don't let bullets without target running around
        if(this.target.remove) {
            this.remove = true;
            return;
        }

        while(delta-- > 0) {
            if(this.touches()) {
                this.remove = true;
                this.target.health -= this.damage;
            }
            this.move();
        }
        this.layer = Math.floor(this.position.y / square_dimension.y);
    },

    touches: function() {
        // TODO Refine this to check if touching any part of the entity,
        // not just one point.
        return gridToGlobal(
            this.target.position,
            this.target.positionOnSquare
        ).distance(this.position) < 10;
    },

    move: function() {
        var move = new Vector(0.5, 0.5);
        var rotation = gridToGlobal(
            this.target.position,
            this.target.positionOnSquare
        ).getAngle(this.position);
        this.position = this.position.add(move.setRotation(rotation));
    },

    draw: function(ctx) {
        ctx.beginPath();
        Draw.circle(ctx, this.position, 10);
        ctx.fillStyle = 'rgba(255, 100, 80, 0.9)';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }
});
