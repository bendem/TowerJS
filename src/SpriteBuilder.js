var SpriteBuilder = function(resourceManager, url) {
    this.resourceManager = resourceManager;
    this.url = url;
};

SpriteBuilder.prototype = {
    load: function() {
        this.resourceManager.load(this.url);
        return this;
    },

    getSprite: function() {
        return new Sprite(this.resourceManager.get(SPRITE)).registerIds([
            {id: 'brown_block', position: new Point(0, 0), 'width': 101, 'height': 171},
            {id: 'dirt_block', position: new Point(101, 0), 'width': 101, 'height': 171},
            {id: 'grass_block', position: new Point(202, 0), 'width': 101, 'height': 171},
            {id: 'plain_block', position: new Point(303, 0), 'width': 101, 'height': 171},
            {id: 'stone_block', position: new Point(404, 0), 'width': 101, 'height': 171},
            {id: 'wall_block', position: new Point(505, 0), 'width': 101, 'height': 171},
            {id: 'water_block', position: new Point(0, 171), 'width': 101, 'height': 171},
            {id: 'wood_block', position: new Point(101, 171), 'width': 101, 'height': 171},
            {id: 'tree_short', position: new Point(202, 171), 'width': 101, 'height': 171},
            {id: 'tree_tall', position: new Point(303, 171), 'width': 101, 'height': 171},
            {id: 'tree_ugly', position: new Point(404, 171), 'width': 101, 'height': 171},
            {id: 'rock', position: new Point(505, 171), 'width': 101, 'height': 171},
            {id: 'selector', position: new Point(0, 342), 'width': 101, 'height': 171},
            {id: 'wall_block_tall', position: new Point(101, 342), 'width': 101, 'height': 171},
            {id: 'ramp_east', position: new Point(202, 342), 'width': 101, 'height': 171},
            {id: 'ramp_north', position: new Point(303, 342), 'width': 101, 'height': 171},
            {id: 'ramp_south', position: new Point(404, 342), 'width': 101, 'height': 171},
            {id: 'ramp_west', position: new Point(505, 342), 'width': 101, 'height': 171}
        ]);
    },
};
