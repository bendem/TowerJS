var DrawingFunctionsManager = function() {};

DrawingFunctionsManager.prototype = {

    register: function(renderer) {
        this.registerTile(renderer);
        this.registerDecoration(renderer);
        this.registerMonster(renderer);
        this.registerTower(renderer);
        this.registerBullet(renderer);
        this.registerLifeCounter(renderer);
        this.registerSelection(renderer);
    },

    registerTile: function(renderer) {
        renderer.register('tile', function(ctx, info) {
            info.spritePart.draw(ctx, info.position);
        });
    },

    registerDecoration: function(renderer) {
        game.renderer.register('decoration', function(ctx, info) {
            info.part.draw(ctx, info.position);
        });
    },

    registerMonster: function(renderer) {
        game.renderer.register('monster_health', function(ctx, info) {
            ctx
                .beginPath()
                .set('fillStyle', 'rgba(0,255,0,0.8)')
                .set('strokeStyle', 'rgba(0,0,0,0.9)')
                .rect(info.x, info.y, info.width, info.height)
                .stroke()
                .fill();
        });
        game.renderer.register('monster_missing_health', function(ctx, info) {
            ctx
                .beginPath()
                .set('fillStyle', 'rgba(255,0,0,0.8)')
                .rect(info.x, info.y, info.width, info.height)
                .fill();
        });
        game.renderer.register('monster_body', function(ctx, info) {
            ctx
                .beginPath()
                .set('fillStyle', 'rgba(0,0,0,0.7)')
                .rect(info.x, info.y, info.width, info.height)
                .fill();
        });
    },

    registerTower: function(renderer) {
        renderer.register('tower', function(ctx, info) {
            ctx
                .beginPath()
                .roundedRect(
                    info.position,
                    info.width,
                    info.height,
                    5
                )
                .set('fillStyle', 'rgba(50,50,150,0.8)')
                .fill();
            this.blur(ctx).stroke();
        }, this);

        renderer.register('tower_range', function(ctx, info) {
            ctx
                .beginPath()
                .circle(
                    info.position,
                    info.range
                );
            this.blur(ctx).stroke();
        }, this);
    },

    registerBullet: function(renderer) {
        game.renderer.register('bullet', function(ctx, info) {
            ctx
                .beginPath()
                .circle(info.position, info.radius)

                .set('fillStyle', 'rgba(255, 100, 80, 0.9)')
                .fill()

                .set('lineWidth', 2)
                .set('strokeStyle', '#333')
                .stroke();
        });
    },

    registerLifeCounter: function(renderer) {
        renderer.register('life_counter', function(ctx, info) {
            ctx
                .set('font', info.counter.size + 'px sans-serif')
                .set('textBaseline', 'middle')
                .set('textAlign', 'center');
            var width = ctx.measureText(info.counter.count).width;

            ctx
                .set('fillStyle', 'rgba(0,0,0,0.5)')
                .set('strokeStyle', '#111')
                .beginPath()
                .roundedRect(
                    info.counter.position,
                    info.counter.hPad * 2 + width, info.counter.vPad * 2 + info.counter.size,
                    3
                )
                .fill()
                .stroke()

                .set('fillStyle', '#eee')
                .fillText(
                    info.counter.count,
                    info.counter.position.x + info.counter.hPad + width / 2,
                    info.counter.position.y + info.counter.vPad + info.counter.size / 2
                );
        });
    },

    registerSelection: function(renderer) {
        renderer.register('selection', function(ctx, info) {
            ctx
                .beginPath()
                .roundedRect(
                    info.position,
                    square_dimension.x,
                    square_dimension.y,
                    6
                )
                .set('strokeStyle', '#eee')
                .set('lineWidth', 2)
                .set('shadowBlur', 1)
                .set('shadowColor', '#111')
                .stroke();
        });
    },

    blur: function(ctx) {
        return ctx
            .set('lineWidth', 3)
            .set('shadowBlur', 5)
            .set('strokeStyle', '#fff')
            .set('shadowColor', '#111');
    },

};
