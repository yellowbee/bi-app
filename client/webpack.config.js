var path = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

/*var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];*/

var CopyWebpackPlugin = require('copy-webpack-plugin');

var commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

module.exports = [
    {
        context: __dirname,
        entry: './src/browser.js',
        output: {
            path: __dirname,
            filename: './dist/bundle.js'
        },
        //watch: true,
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react', 'stage-3']
                    }
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.scss$/,
                    loaders: "style-loader!css-loader!sass-loader"
                },
                /*{
                    test: /\.css$/,
                    loader: "css-loader",
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                },*/
                {
                    test: /\.less$/,
                    loader: "style-loader!css-loader!less-loader"
                },
                {
                    test: /\.(jpe?g|png|gif|svg|mp3)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/, // url-loader needed to import css files,
                    loader: 'url-loader?limit=100000'    // excluding png from test to load png via file-loader
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({ // auto load specified module wherever specified identifiers are encountered
                $: 'jquery',
                jQuery: 'jquery',
                jquery: 'jquery'
            }),
            new webpack.DefinePlugin({ // <-- key to reducing React's size
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
        ],
        resolve: {
            alias: {
                jquery: "jquery/src/jquery" // use unminified over dist
            }
        },
        //devtool: '#inline-source-map',
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, './'),
            host: '0.0.0.0',
            port: process.env.PORT || 8001,
            //public: 'https://whenty-test.herokuapp.com' // That solved it
        }
    }
];
