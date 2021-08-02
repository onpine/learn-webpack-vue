const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { loader } = require('mini-css-extract-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// let indexLess = new ExtractTextWebpackPlugin('index.less')
// let indexCss = new ExtractTextWebpackPlugin('index.css')
const { VueLoaderPlugin } = require('vue-loader')
const Wbpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = {
  mode: 'development',
  entry: {
    main:['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
    header: path.resolve(__dirname, '../src/header.js'),
  },
  output: {
    filename: '[name].[hash:8].js',  // 打包后的文件名
    path: path.resolve(__dirname, '../dist')  // 打包后的目录
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        use:['vue-loader']
      },
      {
        test: /\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
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
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type:"asset",
        parser:{
          dataUrlCondition:{
            maxSize: 25 * 1024,
          }
        },
        generator:{
          filename:'img/[name].[hash:8].[ext]',
          publicPath:'./'
        }
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      '@':path.resolve(__dirname, '../src')
    },
    extensions:['*',".js",".json",'.vue']
  },
  devServer:{
    port:3000,
    hot: true,
    contentBase:'../dist'
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
    }),
    new VueLoaderPlugin()
  ]
}