const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    main: './src/app.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
};
