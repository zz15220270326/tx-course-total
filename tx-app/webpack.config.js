const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const mode = 'development'; // 'development' | 'production'

const isProduction = mode !== 'development';

module.exports = {
  mode,
  // devtool: 'source-map',
  entry: {
    'index': './src/js/index.js',
    'search': './src/js/search.js',
    'cate': './src/js/cate.js',
    'plan': './src/js/plan.js',
    'mine': './src/js/mine.js',
    'jquery': './src/js/jquery.min.js',
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, './dist')
  },
  plugins: [
    new UglifyjsPlugin({
      sourceMap: false,
      extractComments: isProduction,
      exclude: /node_modules/,
      uglifyOptions: {
        compress: isProduction,
        warnings: false,
        cache: !isProduction,
        output: {
          comments: !isProduction,
        },
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name]-[hash:8].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'public/index.html'),
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        collapseInlineTagWhitespace: isProduction,
      },
      excludeChunks: ['node_modules'],
      chunks: ['index'],
      // jscdn
      js: [],
      // csscdn
      css: [],
      // title
      title: '首页',
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: resolve(__dirname, 'public/search.html'),
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        collapseInlineTagWhitespace: isProduction,
      },
      excludeChunks: ['node_modules'],
      chunks: ['search'],
      // jscdn
      js: [],
      // csscdn
      css: [],
      // title
      title: '搜索页',
    }),
    new HtmlWebpackPlugin({
      filename: 'cate.html',
      template: resolve(__dirname, 'public/cate.html'),
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        collapseInlineTagWhitespace: isProduction,
      },
      excludeChunks: ['node_modules'],
      chunks: ['cate'],
      // jscdn
      js: [],
      // csscdn
      css: [],
      // title
      title: '找课',
    }),
    new HtmlWebpackPlugin({
      filename: 'plan.html',
      template: resolve(__dirname, 'public/plan.html'),
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        collapseInlineTagWhitespace: isProduction,
      },
      excludeChunks: ['node_modules'],
      chunks: ['plan'],
      // jscdn
      js: [],
      // csscdn
      css: [],
      // title
      title: '课程表',
    }),
    new HtmlWebpackPlugin({
      filename: 'mine.html',
      template: resolve(__dirname, 'public/mine.html'),
      minify: {
        removeComments: isProduction,
        collapseWhitespace: isProduction,
        collapseInlineTagWhitespace: isProduction,
      },
      excludeChunks: ['node_modules'],
      chunks: ['mine'],
      // jscdn
      js: [],
      // csscdn
      css: [],
      // title
      title: '我的',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          },
        },
      },
      {
        test: /\.tpl$/,
        use: {
          loader: 'tpl-loader',
          options: {},
        },
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader',

          {
            loader: MiniCssExtractPlugin.loader,
          },

          'css-loader',
          {
            loader: 'postcss-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(sass|scss)$/i,
        use: [
          // 'style-loader',

          {
            loader: MiniCssExtractPlugin.loader,
          },

          'css-loader',
          {
            loader: 'postcss-loader',
            options: {},
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 8,
          },
          // type: 'javascript/auto'
        },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.tpl'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@modules': resolve(__dirname, 'modules'),
    },
  },
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'modules/loaders'),
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      })
    ],
    concatenateModules: true,
  },
  target: ['web', 'es5'],
  devServer: {
    host: '0.0.0.0',
    port: 3503,
    proxy: {
      '/api': {
        target: 'http://localhost:3504',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        },
      }
    },
  },
};
