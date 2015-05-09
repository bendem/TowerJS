var Monster = function(health, map, pos) {
    this.health = health;
    this.maxhealth = health;
    this.map = map;
    this.position = pos;
    this.positionOnSquare = new Point(0, square_dimension.y/2); // that represents the center of the monster
    this.width = square_dimension.x/1.5; // @temp
    this.height = square_dimension.y/1.5; // @temp

    this.direction = Direction.Right;
    this.layer = pos.y;

    this.healthBarWidth = 70;
    this.healthBarHeight = 5;
};

extend(Monster, Entity, {
    update: function() {
        if(this.health <= 0) {
            this.remove = true;
            return;
        }

        this.move(2);
        this.layer = this.position.y;
    },

    move: function(dist) {
        var sameDirection;

        if(this.position.x >= this.map.length - 1 && this.direction == Direction.Right) {
            sameDirection = false;
        } else {
            sameDirection = isOneOf(Arrays2D.get(
                this.map,
                this.applyDirection(this.position, this.direction)
            ), 1, 2);
        }

        switch(this.direction) {
            case Direction.Right:
                var maxX = sameDirection
                    ? square_dimension.x + square_dimension.x / 2
                    : square_dimension.x / 2;

                if(this.positionOnSquare.x + dist > maxX) {
                    this.positionOnSquare.x = maxX;
                    this.moveToNextSquare();
                } else {
                    this.positionOnSquare.x += dist;
                }
                break;
            case Direction.Up:
                var minY = sameDirection
                    ? -square_dimension.y / 2
                    : square_dimension.y / 2;

                if(this.positionOnSquare.y - dist < minY) {
                    this.positionOnSquare.y = minY;
                    this.moveToNextSquare();
                } else {
                    this.positionOnSquare.y -= dist;
                }
                break;
            case Direction.Down:
                var maxY = sameDirection
                    ? square_dimension.y + square_dimension.y / 2
                    : square_dimension.y / 2;

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
        if(this.prev && Arrays2D.get(this.map, this.position) == 2) {
            game.eventManager.handleEvent('life_lost');
            this.remove = true;
            return;
        }
        this.prev = this.position;

        switch(this.direction) {
            case Direction.Right:
                this.position.x += 1;
                this.positionOnSquare.x = square_dimension.x / 2;
                break;
            case Direction.Up:
                this.position.y -= 1;
                this.positionOnSquare.y = square_dimension.y / 2;
                break;
            case Direction.Down:
                this.position.y += 1;
                this.positionOnSquare.y = square_dimension.y / 2;
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
                && isOneOf(Arrays2D.get(this.map, this.position.addY(1)), 1, 2)) {
            return Direction.Down;
        }
        if(this.direction !== Direction.Down
                && isOneOf(Arrays2D.get(this.map, this.position.addY(-1)), 1, 2)) {
            return Direction.Up;
        }
        return Direction.Right;
    },

    getBox: function() {
        return new Box(
            gridToGlobal(this.position, this.positionOnSquare)
                .addX(-this.width / 2)
                .addY(-this.height / 2),
            this.width,
            this.height
        );
    },

    drawInfo: function(ctx) {
        if(this.health <= 0) {
            return;
        }

        var centerX = this.position.x * square_dimension.x + this.positionOnSquare.x;
        var centerY = this.position.y * square_dimension.y + this.positionOnSquare.y;

        var size = this.health / this.maxhealth * this.healthBarWidth;
        var healthY = centerY - this.height / 2 - this.healthBarHeight - 5;

        var parts = [{
            name: 'monster_health',
            layer: this.layer + 0.5,
            x: centerX - this.healthBarWidth / 2,
            y: healthY,
            width: this.healthBarWidth,
            height: this.healthBarHeight,
        }, {
            name: 'monster_body',
            layer: this.layer,
            x: centerX - this.width / 2,
            y: centerY - this.height / 2,
            width: this.width,
            height: this.height,
        }];

        if(this.health < this.maxhealth) {
            parts.push({
                name: 'monster_missing_health',
                layer: this.layer + 0.6,
                x: centerX - this.healthBarWidth / 2 + size,
                y: healthY,
                width: this.healthBarWidth - size,
                height: this.healthBarHeight,
            });
        }
        return parts;
    },
});
