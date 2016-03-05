var path = require('path');

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
    }
};