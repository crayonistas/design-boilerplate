module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-push-release');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      options: {
          paths: ["bower_components/bootstrap/less", "less"],
      },
      development: {
        files: {
          "css/less-example.css": "less/less-example.less"
        }
      }, // development
      production: {
        options: {
          paths: ["bower_components/bootstrap/less", "less"],
          cleancss: true
        },
        files: {
          "css/dist/less-example.min.css": "less/less-example.less"
        }
      } // production
    }, // less

    compass: {

      development: {
        options: {
          config: 'config.rb',
          cssDir: 'css',
        } // options
      }, // development

      production: {
        options: {
          config: 'config_prod.rb',
          cssDir: 'css/dist',
        }, // options
      } // production

    }, //compass

    rename: {
      main: {
        files: [
            {src: ['css/dist/sass-example.css'], dest: 'css/dist/sass-example.min.css'},
            ]
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    }, // jshint

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'bower_components/bootstrap/js/*.js',
          'js/scripts.js'
        ],
        dest: 'js/scripts.expanded.js',
      }
    },

    uglify: {
      build: {
        src: 'js/scripts.expanded.js',
        dest: 'js/scripts.min.js' // for some reason this places scripts.js before jquery
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    watch: {
      
      options: {
        livereload: true,
      }, //options

      // Add the following script to your HTML for livereload.
      // <script src="http://localhost:35729/livereload.js"></script>

      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,
        }
      }, // scripts

      css: {
        files: ['less/*.less'],
        tasks: ['less'],
      }, // css

      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass:development','compass:production' ]
      }, // sass

      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    },


   push: {
    options: {
      files: ['package.json'],
      updateConfigs: [],
      releaseBranch: false,
      add: true,
      addFiles: ['.'], // '.' for all files except ingored files in .gitignore
      commit: true,
      commitMessage: 'Release v%VERSION%',
      commitFiles: ['-a'], // '-a' for all files
      createTag: true,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: true,
      pushTo: 'origin',
      npm: false,
      npmTag: 'Release v%VERSION%',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
    } //options
  }



  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'less', 'compass','rename', 'imagemin', 'watch']);

  grunt.registerTask('dev', ['connect', 'watch']);

};
