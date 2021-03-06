var Bullet = function(target, pos) {
    this.target = target;
    this.position = pos; // global position
    this.layer = globalToGrid(this.position).y;
    this.damage = 10;
    this.radius = 7;
    this.velocity = new Vector(3, 3);
};

Bullet.prototype = {
    update: function() {
        // Don't let bullets without target running around
        // TODO Maybe they should find a new target?
        if(this.target.remove) {
            this.remove = true;
            return;
        }

        if(this.touches()) {
            this.explode();
            return;
        }
        this.move();
        this.layer = globalToGrid(this.position).y;
    },

    explode: function() {
        this.remove = true;
        this.target.health -= this.damage;
    },

    touches: function() {
        return this.target.getBox().squaredDistance(this.position) <= Utils.square(this.radius);
    },

    move: function() {
        var rotation = gridToGlobal(
            this.target.position,
            this.target.positionOnSquare
        ).getAngle(this.position);
        this.position = this.position.add(this.velocity.setRotation(rotation));
    },

    drawInfo: function() {
        return {
            name: 'bullet',
            layer: this.layer + 0.5,
            position: this.position,
            radius: this.radius,
        };
    }
};
