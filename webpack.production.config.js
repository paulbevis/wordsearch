var path = require('path'),
  webpack = require('webpack');

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "./public/[name].min.js",
        chunkFilename: "[id].js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname}
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    ]
};