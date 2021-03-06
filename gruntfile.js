module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
    	options: {
    	  separator: '\n',
    	},
    	dist: {
    	  src: ['src/js/autosize.min.js', 'src/js/jquery.markitup.js', 'miu/sets/markdown/set.js', 'src/js/idle-timer.min.js', 'src/js/wrt.js'],
    	  dest: 'j/wrt.min.js'
    	}
		},

    uglify: {
      options: {
        banner: '/*\n\n<%= pkg.name %> v<%= pkg.version %> — an @electricgecko joint\nhttp://drkwrtr.co/about\nhttps://github.com/electricgecko/DRKWRTR\n\n*/\n\n'
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

  grunt.registerTask('default', ['concat','uglify','compass']);


};
