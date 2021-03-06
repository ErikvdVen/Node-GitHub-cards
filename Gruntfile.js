module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/assets/js/<%= pkg.name %>.js',
                dest: 'public/assets/js/<%= pkg.name %>.min.js'
            }
        },
        sass: {
            options: {
                sourceMap: true,
                require: 'susy',
                includePaths: [
                  './bower_components/normalize-css',
                  './bower_components/susy/sass'
                ]
            },
            dist: {
                files: {
                    'public/assets/css/main.css': 'resources/assets/sass/main.scss'
                }
            }
        },
        copy: {
            files: {
                cwd: './bower_components/font-awesome/fonts',  
                src: ['*.*'],           
                dest: './public/assets/fonts',    
                expand: true           
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/assets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/assets/css',
                    ext: '.min.css'
                }]
            }
        },
        browserify: {
            dist: {
                files: {
                    'public/assets/js/<%= pkg.name %>.js': ['app/**/*.js']
                }
            }
        },
        watch: {
            js: {
                files: ['app/**/*.js'],
                tasks: ['browserify', 'uglify']
            },
            sass: {
                files: ['resources/assets/sass/**/*.scss'],
                tasks: ['sass']
            },
            css: {
                files: ['public/**/*.css', '!public/**/*.min.css'],
                tasks: ['cssmin']
            },
            html: {
                files: ['public/**/*.html','public/**/*.css', 'public/**/*.js'],
                options: { livereload: true }
            }
        },
        nodemon: {
          dev: {
            script: 'app.js'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['browserify', 'nodemon', 'watch']);
    grunt.registerTask('build', ['uglify', 'sass', 'cssmin', 'copy']);
};