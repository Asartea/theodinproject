const { webpackConfig, merge } = require('shakapacker');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');;

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const customConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = merge(webpackConfig, customConfig)
