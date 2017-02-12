const path = require('path');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
    entry: path.resolve(__dirname, "client/application", 'index.js'), // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "public"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "bundle.js", // string
        // the filename template for entry chunks
        sourceMapFilename: '[name].map'

    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                eslint: {
                    configFile: path.join(__dirname, 'client', 'application', '.eslintrc')
                }
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        // Moves files
        new TransferWebpackPlugin([
            {from: 'src'},
        ], path.resolve(__dirname, 'client')),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify('false'),
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'client', 'application')
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                enforce: "post",
                loader: "babel-loader"
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.js?$/,
                include: path.join(__dirname, 'client', 'application'),
                loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader']
            }
        ]
    }
};

module.exports = config;