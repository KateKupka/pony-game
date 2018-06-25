module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-flexibility': {},
    autoprefixer: {
      browsers: [
        'last 2 versions',
        'iOS >= 8',
        'IE 9',
        'IE 10',
        'IE 11',
      ],
    },
  },
});
