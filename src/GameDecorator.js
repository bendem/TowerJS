var GameDecorator = function(path) {
    this.path = path;
    this.cols = this.path.length;
    this.lines = this.path[0].length;
};

GameDecorator.prototype = {
    decorate: function(ids, count, positionTranslation) {
        var i;
        var current;

        var pos = new Point(0, 0);
        positionTranslation = positionTranslation || new Vector(0, 0);

        for(i = 0; i < count; i++) {
            pos.x = randomInt(0, this.cols);
            pos.y = randomInt(1, this.lines - 1);
            pos = pos.add(positionTranslation);
            current = Arrays2D.get(this.path, pos);
            if(current === 0) {
                Arrays2D.set(this.path, pos, Arrays.choose(ids));
            }
        }
    },

    translateGrid: function(translations, def) {
        var translated = [];

        var x, y, a, translation;
        for(y = 0; y < this.lines; y++) {
            a = [];
            for(x = 0; x < this.cols; x++) {
                if((translation = translations[this.path[x][y]])) {
                    a.push(translation);
                } else {
                    a.push(def);
                }
            }
            translated.push(a);
        }

        return translated;
    },

    collectComponents: function(translations, sprite) {
        var components = [];

        var x, y, translation;
        for(y = 0; y < this.lines; y++) {
            for(x = 0; x < this.cols; x++) {
                if((translation = translations[this.path[x][y]])) {
                    components.push(new Decoration(sprite, translation, new Point(x, y)));
                }
            }
        }

        return components;
    },
};
