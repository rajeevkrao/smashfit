const path = require('path');

const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
      app: './webpack/app.jsx',
      workouts: './webpack/workouts.jsx'
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['transform-class-properties'],
                      ["@babel/plugin-proposal-decorators", { "legacy": true }],
                      ["@babel/plugin-transform-runtime",
                          {
                            "regenerator": true
                          }
                      ]]        
        }
      }
      ,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      /*{
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: "file-loader?name=/public/icons/[name].[ext]"
      },*/
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
      /*{
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }*/
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: "source-map",/*,
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
  }*/
};
