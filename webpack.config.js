import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import CopyPlugin from "copy-webpack-plugin";

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV || 'development');

export default removeEmpty({
    name: 'scripts',
    devtool: ifDevelopment('source-map'),
    entry: {
        index: './src/index.js',
        bin: './src/bin/index.js',
        server: './src/_server.js',
        client: './src/_client.js',
    },
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    externalsType: 'umd',
    externals: [nodeExternals(), 'react', 'react-dom', /^react-dom\/.+$/, /^@webshift\/.+$/],

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
        nodeEnv: false
    },

    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        // }),
        new webpack.BannerPlugin({
            include: 'bin',
            banner: "#!/usr/bin/env node",
            raw: true
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/templates", to: "templates" },
            ],
        }),
    ],
});
