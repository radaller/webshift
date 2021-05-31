import path from 'path';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { config } from './init';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

console.log(`[Client Mode] ifDevelopment:${ifDevelopment()} ifProduction:${ifProduction()}`);

export default removeEmpty({
    name: 'client',
    entry: {
        main: `${process.cwd()}/src/App.js`,
    },
    resolve: {
        alias: {
            //'fs': false,
            //'express': false,
            //'path': false,
            '@webshift/core': `./client.js`,
        },
    },
    mode: ifDevelopment('development', 'production'),

    target: 'web',
    externalsType: 'umd',
    //externals: ['react'],

    output: {
        path: path.resolve('build/public'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: config.BASE_PATH,
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
            PRODUCTION: JSON.stringify(ifProduction()),
            BASE_PATH: JSON.stringify(config.BASE_PATH),
            FRAGMENT_ID: JSON.stringify(config.FRAGMENT_ID),
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