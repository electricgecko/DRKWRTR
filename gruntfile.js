module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
    	options: {
    	  separator: '\n',
    	},
    	dist: {
    	  src: ['src/js/wrt.js', 'src/js/jquery.autosize.min.js', 'src/js/markdown.min.js', 'src/js/idle-timer.min.js'],
    	  dest: 'j/wrt.min.js'
    	}
		},

    uglify: {
      options: {
        banner: '/*\n\n<%= pkg.name %> v<%= pkg.version %> — an @electricgecko joint\nhttp://electricgecko.de\n*/\n\n'
      },
      build: {
        src: 'j/wrt.min.js',
        dest: 'j/wrt.min.js'
      }
    },

    compass: {
		  dist: {
		    options: {
		      sassDir: 'src/sass',
		      cssDir: './',
		      outputStyle: 'compressed'
		    }
		  }
		},

		watch: {
		  css: {
		    files: 'src/sass/*.scss',
		    tasks: ['compass'],
		    options: {
		      livereload: true,
		    },
		  },
		  js: {
		    files: 'src/js/*.js',
		    tasks: ['concat', 'uglify'],
		    options: {
		      livereload: true,
		    },
		  },
		},

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
          'dist/*'
          ]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '../DRKWRTR/',
          dest: 'dist/',
          src: [
          '*.{ico,png,txt,html}',
          '.htaccess',
          'images/{,*/}*.{webp,gif}',
          'j/**/*.*',
          'screen.css',
          'bower_components/**/*.*'
          ]
        }]
      },
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    }

  });

	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-gh-pages');

	grunt.registerTask('default', ['concat','uglify','compass']);
  grunt.registerTask('deploy', ['clean', 'concat','uglify','compass', 'copy', 'gh-pages']);

};
