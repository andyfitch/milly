const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

var config = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js'
  },
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'chunk-[id].css',
    }),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          globOptions: {
            ignore: ['**/*/.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: 'src/fonts',
          to: 'fonts',
          globOptions: {
            ignore: ['**/*/.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: 'src/favicons',
          to: 'favicons',
          globOptions: {
            ignore: ['**/*/.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: 'src/other',
          to: 'other',
          globOptions: {
            ignore: ['**/*/.DS_Store'],
          },
          noErrorOnMissing: true,
        }
      ],
    }),

    new WebpackManifestPlugin({
      fileName: 'manifest.json'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: './webpack_cache/'
            }
          }
        ]
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
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import'),
                  require('postcss-url')({
                    url: 'rebase',
                    from: 'src/css/main.css',
                    to: 'dist/css/main.[contenthash].css'
                  }),
                  require('tailwindcss'),
                  require('postcss-nested'),
                  require('postcss-preset-env')({
                    stage: 0,
                    features: {
                      'focus-within-pseudo-class': false,
                    },
                  }),
                ],
              },
            },
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
      },
    ]
  },
  stats: {
    children: true
  },
  resolve: {
    alias: {
      Hybrid: path.resolve(__dirname, 'node_modules/@parallaxagency/hybrid/dist/js/')
    }
  }
}

module.exports = config