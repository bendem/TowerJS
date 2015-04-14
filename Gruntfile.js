module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-subgrunt');

    grunt.initConfig({

        // Run JsGameLib grunt first
        subgrunt: {
            projects: {
                JsGameLib: 'default'
            }
        },

        pkg: grunt.file.readJSON('package.json'),

        // Concat everything
        concat: {
            options: {
                banner: '/* <%= pkg.name %> - <%= pkg.version %> */\n"use strict";\n',
                // Replace all 'use strict'; with one on top
                process: function(src, filepath) {
                    return src.replace(
                        /(^|\n)[ \t]*('use strict'|"use strict");?\s*/g,
                        '$1'
                    );
                },
            },
            dist: {
                src: [
                    'JsGameLib/dist/built.js',
                    'src/*.js',
                    'app.js'
                ],
                dest: 'dist/built.js'
            }
        },

        // A bit of checking just to be sure
        jshint: {
            options: {
                curly: true,
                globalstrict: true,
                freeze: true,
                futurehostile: true,
                undef: true,
                latedef: true,
                browser: true,
            },
            all: ['dist/built.js']
        },

    });

    grunt.registerTask('default', ['subgrunt', 'concat', 'jshint']);
};
