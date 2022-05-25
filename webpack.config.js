const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        adminApp: './src/adminApp.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }, ],
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    experiments: {
        asyncWebAssembly: true,
        // WebAssembly as async module (Proposal)       
        outputModule: true,
        // Allow to output ESM
        topLevelAwait: true,
        // Allow to use await on module evaluation (Proposal)
    }
};