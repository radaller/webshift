import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { config } from './webpack.config.common';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

export default removeEmpty({
    name: 'server',
    devtool: ifDevelopment('source-map'),
    entry: `${process.cwd()}/src/App.js`,
    resolve: {
        alias: {
            '@webshift/core': `./server.js`,
        },
    },
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    externalsType: 'umd',
    externals: ifDevelopment([
        nodeExternals({
            allowlist: ['webshift', '@webshift/core']
        })
    ]),
    //externals: [SERVER_EXTERNALS],

    output: {
        path: path.resolve('build'),
        filename: 'server.js',
        libraryTarget: 'umd',
        publicPath: config.BASE_PATH,
        assetModuleFilename: 'img/[name].[contenthash][ext][query]',
    },

    optimization: {
        minimize: false,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
                generator: {
                    emit: false,
                },
            },
        ]
    },
    plugins: removeEmpty([
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.DefinePlugin(removeEmpty({
            PRODUCTION: JSON.stringify(ifProduction()),
            BASE_PATH: JSON.stringify(config.BASE_PATH),
            FRAGMENT_ID: JSON.stringify(config.FRAGMENT_ID),
        })),
        new CopyPlugin({
            patterns: [
                { from: "src/*.png", to: "public/img/[name].[contenthash][ext]" },
                { from: "src/*.ico", to: "public/img/[name].[contenthash][ext]" },
            ],
        }),
        ifProduction(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.resolve(`build/analyze/server.html`),
                openAnalyzer: false,
            })
        ),
    ]),
});
