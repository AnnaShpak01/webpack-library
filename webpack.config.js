const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (env) => {
  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateContent: '<div id="root"></div>',
        filename: 'index.html',
        inject: true,
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'styles.[contenthash].css',
        }),
      process.env.BUNDLE_ANALYZER &&
        new BundleAnalyzerPlugin({
          analyzerPort: 9999, // Попробуйте другой порт, если 8888 не работает
        }),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 244 * 1024,
        minChunks: 2,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          main: {
            test: /[\\/]src[\\/]/,
            priority: -20,
            reuseExistingChunk: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    devServer: {
      historyApiFallback: true,
    },
    performance: {
      hints: false,
    },
  };

  if (env.BUNDLE_ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
