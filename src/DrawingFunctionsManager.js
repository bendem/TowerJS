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
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,255,0,0.8)';
            ctx.strokeStyle = 'rgba(0,0,0,0.9)';
            ctx.rect(info.x, info.y, info.width, info.height);
            ctx.stroke();
            ctx.fill();
        });
        game.renderer.register('monster_missing_health', function(ctx, info) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,0,0,0.8)';
            ctx.rect(info.x, info.y, info.width, info.height);
            ctx.fill();
        });
        game.renderer.register('monster_body', function(ctx, info) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.rect(info.x, info.y, info.width, info.height);
            ctx.fill();
        });
    },

    registerTower: function(renderer) {
        renderer.register('tower', function(ctx, info) {
            ctx.beginPath();
            Draw.roundedRect(
                ctx,
                info.position,
                info.width,
                info.height,
                5
            );

            ctx.fillStyle = 'rgba(50,50,150,0.8)';
            ctx.fill();
            this.blur(ctx).stroke();
        }, this);

        renderer.register('tower_range', function(ctx, info) {
            ctx.beginPath();
            Draw.circle(
                ctx,
                info.position,
                info.range
            );
            this.blur(ctx).stroke();
        }, this);
    },

    registerBullet: function(renderer) {
        game.renderer.register('bullet', function(ctx, info) {
            ctx.beginPath();
            Draw.circle(ctx, info.position, info.radius);

            ctx.fillStyle = 'rgba(255, 100, 80, 0.9)';
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#333';
            ctx.stroke();
        });
    },

    registerLifeCounter: function(renderer) {
        renderer.register('life_counter', function(ctx, info) {
            ctx.font = info.counter.size + 'px sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            var width = ctx.measureText(info.counter.count).width;

            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.strokeStyle = '#111';
            ctx.beginPath();
            Draw.roundedRect(
                ctx,
                info.counter.position,
                info.counter.hPad * 2 + width, info.counter.vPad * 2 + info.counter.size,
                3
            );
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#eee';
            ctx.fillText(
                info.counter.count,
                info.counter.position.x + info.counter.hPad + width / 2,
                info.counter.position.y + info.counter.vPad + info.counter.size / 2
            );
        });
    },

    registerSelection: function(renderer) {
        renderer.register('selection', function(ctx, info) {
            ctx.beginPath();
            Draw.roundedRect(
                ctx,
                info.position,
                square_dimension.x,
                square_dimension.y,
                6
            );
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 1;
            ctx.shadowColor = '#111';
            ctx.stroke();
        });
    },

    blur: function(ctx) {
        ctx.lineWidth = 3;
        ctx.shadowBlur = 5;
        ctx.strokeStyle = '#fff';
        ctx.shadowColor = '#111';
        return ctx;
    },

};
