'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
        server:{
            options: {
                port: 9001,
                keepalive: true,
                open: {
                  target: 'http://localhost:9001',
                },
                base: {
                  path: '.',
                  options: {
                    index: 'index.html',
                    maxAge: 300000
                  }
                }
            }
        }
    },

    concat: {
      basic: {
        src: ['public/bem/**/*.css'],
        dest: 'public/style.css',
      }
    },

    autoprefixer: {
      options: {
        cascade: true
      },
      'public/style.css': 'public/style.css'
    },

    watch: {
      styles: {
        files: ['**/*.css'],
        tasks: ['css']
      },
    },

  });
  
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('css', ['concat', 'autoprefixer']);
  grunt.registerTask('server', ['css', 'connect:server:keepalive']);
};
