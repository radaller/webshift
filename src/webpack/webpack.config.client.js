import path from 'path';
import webpack from 'webpack';
import merge from "webpack-merge";
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';

import { config } from './webpack.config.common';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

export default {
    name: 'client',
    entry: {
        main: `${__dirname}/client/entry.js`,
    },
    resolve: {
        alias: {
            '@app': `${ process.cwd() }/src/App.js`,
            '@logger': `${__dirname}/client/logger.js`,
        },
    },
    mode: ifDevelopment('development', 'production'),

    target: 'web',
    externalsType: 'umd',

    output: {
        path: path.resolve('build/public'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: '',
        assetModuleFilename: 'img/[name].[contenthash][ext][query]',
        chunkLoadingGlobal: '__LOADABLE_LOADED_CHUNKS__',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!webshift)/,
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
};