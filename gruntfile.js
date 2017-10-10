// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
grunt.initConfig({

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Grunfile.js', 'src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      build: {
        files: {
          'main.js': ['src/js/vendor/doubleclick.js']
        },
        options: {
          sourceMap : true,
          sourceMapIncludeSources: false,
          preserveComments: false,
        }
      }
    },

    // compile sass stylesheets to css -----------------------------------------
    sass: {
      build: {
        files: {
          'style.css': 'src/sass/style.scss'
        }
      },
      options: {
        noCache: true
      }
    },

    autoprefixer: {
      options: {
          map : true,
          browsers: ['last 2 versions','> 1%', 'ie 8', 'ie 9']
      },
      dist: {
         src : "*.css"
      }
    },

    browserSync: {
        bsFiles : {
            src : ["*.js", "*.css", "images/**", './*.html']
        },
        options: {
            watchTask: true,
            server: {
                baseDir: "./"
            }
        }
      
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      build: {
        files: {
          'style.min.css': 'style.css'
        },
        options : {
          'sourceMap' : true
        }
      }
    },

    // configure watch to auto update ----------------
    watch: {
      
      // for stylesheets, watch css and less files 
      // only run less and cssmin stylesheets: { 
      files: ['style.css', 'src/**/*.scss'], 
      tasks: ['sass', 'cssmin', 'autoprefixer'],

      // for scripts, run jshint and uglify 
      scripts: { 
        files: 'src/**/*.js', tasks: ['jshint', 'uglify'] 
      } 
    }

});

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.config('watch-orig', grunt.config('watch'));
  grunt.renameTask('watch', 'watch-orig');

  grunt.registerTask('watch', ['browserSync', 'watch-orig']);
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'sass']); 

};
