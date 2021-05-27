import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import CopyPlugin from "copy-webpack-plugin";

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default removeEmpty({
    name: 'scripts',
    devtool: ifDevelopment('source-map'),
    entry: {
        index: './scripts/index.js',
        // _client: './scripts/src/_client.js',
        // _document: './scripts/src/_document.js',
        // _fragment: './scripts/src/_fragment.js',
        // _render: './scripts/src/_render.js',
        // _server: './scripts/src/_server.js'
    },
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    //externalsType: 'umd',
    externals: [nodeExternals()],
    //externals: [nodeExternals(), /^webshift\/.+$/,],

    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ],
        parser: {
            javascript: {
                commonjsMagicComments: true,
            },
        },
    },

    optimization: {
        minimize: false,
    },

    plugins: [
        // new webpack.ProvidePlugin({
        //     "React": "react",
        // }),
        new webpack.BannerPlugin({
            include: 'index',
            banner: "#!/usr/bin/env node",
            raw: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "scripts/src", to: "./" },
            ],
        }),
    ],
});
