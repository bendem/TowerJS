var Path = function(cols, lines, startY, endY) {
    this.cols = cols;
    this.lines = lines;
    this.startY = startY;
    this.endY = endY;
};

Path.prototype = {
    generate: function() {
        var cols = this.cols;
        var lines = this.lines;
        var path = Arrays2D.of(cols, lines, 0);

        path[0][this.startY] = 2;

        var current = new Point(1, this.startY);
        var directions;

        while(current.x < cols - 1 || current.y !== this.endY) {
            Arrays2D.set(path, current, 1);

            // Last col, go to exit
            if(current.x === cols - 1) {
                current = this.move(current, [current.y > this.endY ? Direction.Up : Direction.Down]);
                continue;
            }
            // One before last col, move to right (prevents path to be going up/down
            // next to each other)
            if(current.x === cols - 2) {
                current = this.move(current, [Direction.Right]);
                continue;
            }

            directions = [Direction.Up, Direction.Down, Direction.Right];
            if(current.y <= 1 || path[current.x][current.y - 1] === 1) {
                // Don't go above the map or backward
                Arrays.remove(directions, Direction.Up);
            }
            if(current.y >= lines - 2 || path[current.x][current.y + 1] === 1) {
                // Don't go below the map or backward
                Arrays.remove(directions, Direction.Down);
            }

            if(path[current.x - 1][current.y - 1] === 1) {
                // Don't make a vertical path right next to another one
                // while going up
                Arrays.remove(directions, Direction.Up);
            }
            if(path[current.x - 1][current.y + 1] === 1) {
                // Don't make a vertical path right next to another one
                // while going down
                Arrays.remove(directions, Direction.Down);
            }

            current = this.move(current, directions);
        }
        Arrays2D.set(path, current, 2);

        return path;
    },

    move: function(current, directions) {
        switch(Arrays.choose(directions)) {
            case Direction.Up:
                return current.addY(-1);
            case Direction.Down:
                return current.addY(1);
            case Direction.Right:
                return current.addX(1);
        }
    }
};
