module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({

        // used by the changelog task
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                node: true
            },
            all: ['*.js']
        },

        shell: {
            publish: {
                command: 'npm publish'
            },

            pubinit: {
                command: 'npm publish --access public'
            }
        },

        // To test: grunt bump --dry-run

        bump: {
            options: {

                commit: true,
                createTag: true,
                push: true,
                pushTo: 'origin',

                updateConfigs: ['pkg'],
                commitFiles: ['package.json']
            }
        },

        browserify: {
            dist: {
                options: {
                    browserifyOptions: {
                        standalone: 'MitchAllen.ConnectionGrid'
                    },
                    transform: [['babelify', {presets: ['@babel/preset-env']}]],
                    plugin: [[ "browserify-derequire" ]]
                },
                files: {
                   // if the source file has an extension of es6 then
                   // we change the name of the source file accordingly.
                   // The result file's extension is always .js
                   "./dist/connection-grid.js": ["./src/index.js"]
                }
            }
        },

        terser: {
            my_target: {
                files: {
                    './dist/connection-grid.min.js': ['./dist/connection-grid.js']
                }
            }
        },

        watch: {
             scripts: {
                files: ["./src/*.js"],
                tasks: ["browserify",'terser']
             }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-terser');
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask('default', ['jshint','browserify','terser']);
    grunt.registerTask('monitor', ['jshint','watch']);
    grunt.registerTask("build", ['browserify','terser']);
    grunt.registerTask('pubinit', ['jshint','browserify','terser','shell:pubinit']);
    grunt.registerTask('publish', ['jshint','browserify','terser','bump','shell:publish']);
};