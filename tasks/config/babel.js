module.exports = function (grunt) {

  grunt.config.set('babel', {
    dev: {
      options: {
        presets: ['react']
      },
      files: [{
        expand: true,
        cwd: 'assets/js/',
        src: ['**/*.jsx'],
        dest: '.tmp/public/js/',
        ext: '.js'
      }]
    }
  });
  grunt.loadNpmTasks('grunt-babel');
};
