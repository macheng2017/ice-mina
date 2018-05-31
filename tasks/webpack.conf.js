const { resolve } = require('path')
const r = url => resolve(__dirname, url)
const config = require('../config')
const webpack = require('webpack')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const progressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({
  filename: '[name].wxss'
})
module.exports = {
  devtool: false,
  output: {
    path: config.assetsPath,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      utils: r('../utils/util.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        options: {
          presets: ['latest']
        }
      },
      {
        test: /\.sass$/,
        // 使用插件
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              // stylus 和 postcss loader 可以相互组合使用
              loader: 'postcss-loader',
              // 可选功能
              options: {
                plugins: loader => [
                  // 自动加前缀
                  require('autoprefixer')({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              // 可选功能
              options: {
                // 缩进
                indentedSyntax: true
              }
            }
          ],
          // 兜底
          fallback: 'style-loader'
        })
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          dist: './mina'
        }
      }
    ]
  },
  plugins: [
    extractSass,
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json',
          to: ''
        }
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    // webpack 内部插件
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new progressBarPlugin()
  ]
}
