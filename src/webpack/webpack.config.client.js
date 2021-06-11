import path from 'path';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';

import { config } from './webpack.config.common';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

export default removeEmpty({
    name: 'client',
    entry: {
        main: `${process.cwd()}/src/App.js`,
    },
    resolve: {
        alias: {
            '@webshift/core': `./client.js`,
        },
    },
    mode: ifDevelopment('development', 'production'),

    target: 'web',
    externalsType: 'umd',
    //externals: [CLIENT_EXTERNALS],

    output: {
        path: path.resolve('build/public'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: config.BASE_PATH,
        assetModuleFilename: 'img/[name].[contenthash][ext][query]',
        chunkLoadingGlobal: '__LOADABLE_LOADED_CHUNKS__',
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
        chunkIds: 'named',
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
    plugins: removeEmpty([
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(ifProduction()),
            BASE_PATH: JSON.stringify(config.BASE_PATH),
            FRAGMENT_ID: JSON.stringify(config.FRAGMENT_ID),
        }),
        ifProduction(
            new LoadablePlugin({
                filename: '../stats.json'
            })
        ),
        ifProduction(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.resolve(`build/analyze/client.html`),
                openAnalyzer: false,
            })
        ),
    ]),
});