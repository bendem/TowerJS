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
            src: {
                src: [
                    'src/*.js',
                    'app.js'
                ],
                dest: 'dist/tmp.js'
            },
            dist: {
                banner: '/* <%= pkg.name %> - <%= pkg.version %> */\n"use strict";\n',
                // Replace all 'use strict'; with one on top
                process: function(src, filepath) {
                    return src.replace(
                        /(^|\n)[ \t]*('use strict'|"use strict");?\s*/g,
                        '$1'
                    );
                },
                src: [
                    'JsGameLib/dist/JsGameLib.js',
                    'dist/tmp.js'
                ],
                dest: 'dist/built.js'
            }
        },

        // A bit of checking just to be sure
        jshint: {
            options: {
                dirname: '.',
                prereq: ['JsGameLib/dist/JsGameLib.js'],
                curly: true,
                globalstrict: true,
                freeze: true,
                futurehostile: true,
                undef: true,
                browser: true,
                laxbreak: true,
                devel: true,
                esnext: true,
            },
            all: ['dist/tmp.js']
        },

        watch: {
            libs: {
                files: [
                    'JsGameLib/src/*.js'
                ],
                tasks: [
                    'subgrunt:concat',
                    'concat'
                ],
            },
            app: {
                files: [
                    'src/*.js',
                    'app.js'
                ],
                tasks: [
                    'concat'
                ],
            },
        },

    });

    grunt.registerTask('default', [
        'subgrunt:default',
        'concat:src',
        'jshint',
        'concat:dist'
    ]);
};
