import BabiliPlugin from 'babili-webpack-plugin';
import webpack from 'webpack';
import path from 'path';

const config = {
  target: 'node',
  entry: {
    'hass-client': './src/hass-client.js',
    'hass-server': './src/hass-server.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.txt$/, loader: 'raw-loader' },
    ],
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '#': path.resolve(__dirname, 'data'),
    }
  },
  plugins: [
    // Add shebang to generated bundles
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node\n',
      raw: true,
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.unshift(new BabiliPlugin({}, {
    test: /./,
  }));
}

export default config;
