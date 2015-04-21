var generateHorizontalPath = function(cols, lines, from, to) {
    var path = filledArray(
        filledArray(0, lines),
        cols
    );
    path[from.x][from.y] = 1;

    debugArray2D(path);

    var i = 0;

    var current = new Point(from.x + 1, from.y);
    var directions;
    var previousWasVert = false;

    while(!current.equals(to)) {
        path[current.x][current.y] = 1;

        directions = [Direction.Up, Direction.Down, Direction.Right];

        if(previousWasVert && current.y !== 0 && current.y !== lines - 1) {
            arrayRemove(directions, Direction.Up);
            arrayRemove(directions, Direction.Down);
        } else if(current.y === 0 || path[current.x][current.y - 1] === 1) {
            arrayRemove(directions, Direction.Up);
        } else if(current.y === lines - 1 || path[current.x][current.y + 1] === 1) {
            arrayRemove(directions, Direction.Down);
        }

        if(current.x === cols - 1) {
            arrayRemove(directions, Direction.Right);
        }

        switch(choose(directions)) {
            case Direction.Up:
                current = current.addY(-1);
                previousWasVert = true;
                break;
            case Direction.Down:
                current = current.addY(1);
                previousWasVert = true;
                break;
            case Direction.Right:
                current = current.addX(1);
                previousWasVert = false;
                break;
        }

        if(i++ > 1000) {
            // Testing security
            break;
        }
    }
    path[current.x][current.y] = 1;

    debugArray2D(path);

    return path;
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
