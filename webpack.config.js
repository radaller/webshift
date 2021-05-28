import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import CopyPlugin from "copy-webpack-plugin";

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV);

console.log(ifDevelopment());
console.log(ifProduction());

export default removeEmpty({
    name: 'scripts',
    devtool: ifDevelopment('source-map'),
    entry: {
        index: './src/index.js',
        bin: './src/bin/index.js',
    },
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    externalsType: 'umd',
    externals: [nodeExternals(), 'react', 'react-dom', /^react-dom\/.+$/],
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
        new webpack.ProvidePlugin({
            "React": "react",
        }),
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
