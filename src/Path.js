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
        var path = filledArray(
            filledArray(0, lines),
            cols
        );
        var i = 0;

        path[0][this.startY] = 2;

        var current = new Point(1, this.startY);
        var directions;

        while(current.x < cols - 1 || current.y !== this.endY) {
            path[current.x][current.y] = 1;

            directions = [Direction.Up, Direction.Down, Direction.Right];

            if(current.x === cols - 1) {
                // Go to the exit if on last col
                directions = [current.y > this.endY ? Direction.Up : Direction.Down];
            } else if(current.y === 0 || path[current.x][current.y - 1] === 1) {
                // Don't go above the map or backward
                arrayRemove(directions, Direction.Up);
            } else if(current.y === lines - 1 || path[current.x][current.y + 1] === 1) {
                // Don't go below the map or backward
                arrayRemove(directions, Direction.Down);
            }

            if(path[current.x - 1][current.y - 1] === 1) {
                // Don't make a vertical path right next to another one
                // while going up
                arrayRemove(directions, Direction.Up);
            }
            if(path[current.x - 1][current.y + 1] === 1) {
                // Don't make a vertical path right next to another one
                // while going down
                arrayRemove(directions, Direction.Down);
            }

            if(directions.length === 0) {
                console.log(directions);
                console.error("Can't move");
                break;
            }

            current = this.move(current, directions);

            if(i++ > 1000) {
                // Let's make sure we don't fuck up
                console.error('100 iterations, breaking');
                break;
            }
        }
        path[current.x][current.y] = 2;

        return path;
    },

    move: function(current, directions) {
        switch(choose(directions)) {
            case Direction.Up:
                return current.addY(-1);
            case Direction.Down:
                return current.addY(1);
            case Direction.Right:
                return current.addX(1);
        }
    }
};

var debugArray2D = function(arr) {
    var a = '';
    for (var i = 0; i < arr[0].length; i++) {
        for (var j = 0; j < arr.length; j++) {
            a += arr[j][i] + ' ';
        }
        a += '\n';
    }
    console.log(a);
};
