import path from 'path';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import config from '../templates/build.config';

const {
    BASE_PATH = '/',
    FRAGMENT_ID = 'root'
} = config;

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default removeEmpty({
    name: 'client',
    entry: {
        main: './src/client.js',
    },
    mode: ifDevelopment('development', 'production'),

    target: 'web',
    //externals: ['react'],

    output: {
        path: path.resolve('build/public'),
        filename: 'js/[name].[chunkhash].js',
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
            },
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin({
            BASE_PATH: JSON.stringify(BASE_PATH),
            FRAGMENT_ID: JSON.stringify(FRAGMENT_ID),
        }),
        new StatsWriterPlugin({
            filename: '../stats.json',
            fields: [
                'publicPath',
                'assetsByChunkName',
            ],
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.resolve(`build/analyze/client.html`),
            openAnalyzer: false,
        }),
    ],
});