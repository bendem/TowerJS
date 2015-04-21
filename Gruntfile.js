module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        // Run JsGameLib grunt first
        subgrunt: {
            options: {
                npmInstall: false
            },
            default: {
                projects: {
                    JsGameLib: 'default',
                },
            },
            concat: {
                projects: {
                    JsGameLib: 'concat'
                }
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
                    'JsGameLib/dist/*.js',
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
                browser: true,
                laxbreak: true,
                devel: true,
            },
            all: ['dist/built.js']
        },
        watch: {
            scripts: {
                files: [
                    'JsGameLib/src/*.js',
                    'src/*.js',
                    'app.js'
                ],
                tasks: [
                    'subgrunt:concat',
                    'concat'
                ],
            },
        },

    });

    grunt.registerTask('default', ['subgrunt:default', 'concat', 'jshint']);
};
