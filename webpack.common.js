const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

var config = {
  entry: './src/js/main.js',
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  'postcss-preset-env',
                  require('tailwindcss')('./tailwind.config.js'),
                  require('autoprefixer')
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=/fonts/[name].[ext]']
      },
      {
        test: /\.(png|jpe?g)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img'
            }
          },
          {
            loader: 'tinify-loader',
            options: {
              apikey: 'Az7H_NvSjTuDEQ2x8QE9oFU2j7Kno3UT'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name]' + (process.env.NODE_ENV === 'production' || 1==1 ? '.[contenthash]' : '') + '.css',
      chunkFilename: 'chunk-[id].css',
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/fonts',
          to: 'fonts',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: 'src/favicons',
          to: 'favicons',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: 'src/other',
          to: 'other',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        }
      ],
    }),

    new WebpackManifestPlugin({
      fileName: 'manifest.json'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
}

module.exports = config