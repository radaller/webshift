import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

export default {
    name: 'scripts',
    devtool: 'source-map',
    entry: {
        'bin': './src/bin/entry.js',
    },
    mode: 'development',

    target: 'node',

    externalsType: 'umd',
    externals: [ nodeExternals() ],

    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        parser: {
            javascript: {
                commonjsMagicComments: true,
            },
        },
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ],
    },

    optimization: {
        minimize: false,
        nodeEnv: false
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/client", to: "client" },
                { from: "src/server", to: "server" },
                { from: "src/index.js", to: "index.js" },
            ],
        }),
        new webpack.BannerPlugin({
            include: 'bin',
            banner: "#!/usr/bin/env node",
            raw: true
        }),
    ],
};
