import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import config from '../templates/build.config';

const {
    BASE_PATH = '/',
    FRAGMENT_ID = 'root'
} = config;

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default removeEmpty({
    name: 'server',
    devtool: ifDevelopment('source-map'),
    entry: ifDevelopment('./src/_render.js', './src/server.js'),
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    externals: ifDevelopment([nodeExternals()]),

    output: {
        path: path.resolve('build'),
        filename: 'server.js',
        libraryTarget: 'umd',
        publicPath: BASE_PATH,
        assetModuleFilename: 'img/[name].[contenthash][ext][query]',
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
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin(removeEmpty({
            BASE_PATH: JSON.stringify(BASE_PATH),
            FRAGMENT_ID: JSON.stringify(FRAGMENT_ID),
        })),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "public/img/[name].[contenthash][ext]" },
            ],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.resolve(`build/analyze/server.html`),
            openAnalyzer: false,
        }),
    ],
});
