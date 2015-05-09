var GameDecorator = function(path) {
    this.path = path;
};

GameDecorator.prototype = {
    decorate: function(ids, count, positionTranslation) {
        var i;
        var current;

        var pos = new Point(0, 0);
        positionTranslation = positionTranslation || new Vector(0, 0);

        for(i = 0; i < count; i++) {
            pos.x = randomInt(0, cols);
            pos.y = randomInt(1, lines - 1);
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
        for(x = 0; x < cols; x++) {
            a = [];
            for(y = 0; y < lines; y++) {
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
        for(y = 0; y < lines; y++) {
            for(x = 0; x < cols; x++) {
                if((translation = translations[this.path[x][y]])) {
                    components.push(new Decoration(sprite, translation, new Point(x, y)));
                }
            }
        }

        return components;
    },
};
