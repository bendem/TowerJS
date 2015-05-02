var Bullet = function(target, pos) {
    this.target = target;
    this.position = pos; // global position
    this.layer = globalToGrid(this.position).y;
    this.damage = 10;
    this.radius = 10;
};

extend(Bullet, Entity, {
    update: function(delta) {
        // Don't let bullets without target running around
        // TODO Maybe they should find a new target?
        if(this.target.remove) {
            this.remove = true;
            return;
        }

        while(delta-- > 0) {
            if(this.touches()) {
                this.remove = true;
                this.target.health -= this.damage;
                return;
            }
            this.move();
        }
        this.layer = globalToGrid(this.position).y;
    },

    touches: function() {
        return this.target.getBox().distance(this.position) <= this.radius;
    },

    move: function() {
        var move = new Vector(0.2, 0.2);
        var rotation = gridToGlobal(
            this.target.position,
            this.target.positionOnSquare
        ).getAngle(this.position);
        this.position = this.position.add(move.setRotation(rotation));
    },

    draw: function(ctx) {
        ctx.beginPath();
        Draw.circle(ctx, this.position, this.radius);
        ctx.fillStyle = 'rgba(255, 100, 80, 0.9)';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }
});
