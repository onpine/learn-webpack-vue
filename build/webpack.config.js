const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let indexLess = new ExtractTextWebpackPlugin('index.less')
// let indexCss = new ExtractTextWebpackPlugin('index.css')

module.exports = {
  mode: 'development',
  entry: {
    main:path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js',  // 打包后的文件名
    path: path.resolve(__dirname, '../dist')  // 打包后的目录
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:[MiniCssExtractPlugin.loader,'css-loader',{
            loader:'postcss-loader',
            options:{
              postcssOptions:{
                plugins:[require('autoprefixer')]
              },
            }
          },'less-loader']
        }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks:['main']
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname, '../public/header.html'),
      filename:'header.html',
      chunks:['header']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'[name].[hash:8].css',
      chunkFilename:'[id].css'
    })
  ]
}