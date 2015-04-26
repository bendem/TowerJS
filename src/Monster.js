var Monster = function(health, map, pos, square_dimension) {
    this.health = health;
    this.maxhealth = health;
    this.map = map;
    this.position = pos;
    this.square_dimension = square_dimension;
    this.positionOnSquare = new Point(0, square_dimension.y/2); // anchor is the center
    this.width = square_dimension.x/1.5; // @temp
    this.height = square_dimension.y/1.5; // @temp

    this.direction = Direction.Right;

    this.healthBarWidth = 70;
    this.healthBarHeight = 5;
};

extend(Monster, Entity, {
    update: function(delta) {
        while(delta-- > 0 && !this.remove) {
            this.move(0.2);
        }
    },

    move: function(dist) {
        var sameDirection;

        if(this.position.x >= this.map.length - 1 && this.direction == Direction.Right) {
            sameDirection = false;
        } else {
            sameDirection = isOneOf(arrayGet(
                this.map,
                this.applyDirection(this.position, this.direction)
            ), 1, 2);
        }

        switch(this.direction) {
            case Direction.Right:
                var maxX = sameDirection
                    ? this.square_dimension.x + this.square_dimension.x / 2
                    : this.square_dimension.x / 2;

                if(this.positionOnSquare.x + dist > maxX) {
                    this.positionOnSquare.x = maxX;
                    this.moveToNextSquare();
                } else {
                    this.positionOnSquare.x += dist;
                }
                break;
            case Direction.Up:
                var minY = sameDirection
                    ? -this.square_dimension.y / 2
                    : this.square_dimension.y / 2;

                if(this.positionOnSquare.y - dist < minY) {
                    this.positionOnSquare.y = minY;
                    this.moveToNextSquare();
                } else {
                    this.positionOnSquare.y -= dist;
                }
                break;
            case Direction.Down:
                var maxY = sameDirection
                    ? this.square_dimension.y + this.square_dimension.y / 2
                    : this.square_dimension.y / 2;

                if(this.positionOnSquare.y + dist > maxY) {
                    this.positionOnSquare.y = maxY;
                    this.moveToNextSquare();
                } else {
                    this.positionOnSquare.y += dist;
                }
                break;
        }
    },

    moveToNextSquare: function() {
        if(this.prev && arrayGet(this.map, this.position) == 2) {
            game.eventManager.handleEvent('life_lost');
            this.remove = true;
            return;
        }
        this.prev = this.position;

        switch(this.direction) {
            case Direction.Right:
                this.position = this.position.addX(1);
                this.positionOnSquare.x = this.square_dimension.x / 2;
                break;
            case Direction.Up:
                this.position = this.position.addY(-1);
                this.positionOnSquare.y = this.square_dimension.y / 2;
                break;
            case Direction.Down:
                this.position = this.position.addY(1);
                this.positionOnSquare.y = this.square_dimension.y / 2;
                break;
        }
        this.direction = this.checkDirection();
    },

    applyDirection: function(position, direction) {
        switch(direction) {
            case Direction.Right:
                return position.addX(1);
            case Direction.Up:
                return position.addY(-1);
            case Direction.Down:
                return position.addY(1);
        }
    },

    checkDirection: function() {
        if(this.direction !== Direction.Up
                && isOneOf(arrayGet(this.map, this.position.addY(1)), 1, 2)) {
            return Direction.Down;
        }
        if(this.direction !== Direction.Down
                && isOneOf(arrayGet(this.map, this.position.addY(-1)), 1, 2)) {
            return Direction.Up;
        }
        return Direction.Right;
    },

    draw: function(ctx) {
        var centerX = this.position.x * this.square_dimension.x + this.positionOnSquare.x;
        var centerY = this.position.y * this.square_dimension.y + this.positionOnSquare.y;

        var size = this.health / this.maxhealth * this.healthBarWidth;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,255,0,0.8)';
        ctx.strokeStyle = 'rgba(0,0,0,0.9)';
        ctx.rect(
            centerX - this.healthBarWidth/2,
            centerY - this.height/2 - this.healthBarHeight - 5,
            this.healthBarWidth, this.healthBarHeight
        );
        ctx.stroke();
        ctx.fill();

        if(this.health < this.maxhealth) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,0,0,0.8)';
            ctx.rect(
                centerX + this.healthBarWidth - size,
                centerY - this.height/2 - this.healthBarHeight - 5,
                this.healthBarWidth - size, this.healthBarHeight
            );
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.rect(
            centerX - this.width/2,
            centerY - this.height/2,
            this.width, this.height
        );
        ctx.fill();
    },
});
