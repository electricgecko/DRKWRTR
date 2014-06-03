module.exports = function(grunt) {

  grunt.initConfig({
  
    pkg: grunt.file.readJSON('package.json'),
    
    concat: {
    	options: {
    	  separator: '\n',
    	},
    	dist: {
    	  src: ['src/wrt.js', 'src/jquery.autosize.min.js', 'src/markdown.min.js', 'src/idle-timer.min.js'],
    	  dest: 'j/wrt.min.js'
    	}
		},
		
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <% pkg.version %> — an @electricgecko joint */\n'
      },
      build: {
        src: 'j/wrt.min.js',
        dest: 'j/wrt.min.js'
      }
    },
    
    compass: {              
			  dist: {
			    options: {
			      sassDir: 'sass',
			      cssDir: './',
			      outputStyle: 'compressed'
			    }
			  }
			},

		watch: {
		  css: {
		    files: 'sass/*.scss',
		    tasks: ['compass'],
		    options: {
		      livereload: true,
		    },
		  },
		  js: {
		    files: 'src/*.js',
		    tasks: ['concat', 'uglify'],
		    options: {
		      livereload: true,
		    },
		  },
		}

  });

	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat'); 
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-compass'); 
 	    
	grunt.registerTask('default', ['concat','uglify','compass']);

};