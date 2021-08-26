import path from 'path';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import merge from "webpack-merge";
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';

import { config } from './webpack.config.common';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

const babelPlugins = [];
ifDevelopment() && babelPlugins.push('react-refresh/babel');

export default {
    name: 'client',
    devtool: ifDevelopment('source-map'),
    entry: {
        main: removeEmpty([ifDevelopment('webpack-hot-middleware/client'), `${__dirname}/client/entry.js`]),
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: babelPlugins
                        },
                    }
                ]
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
        new webpack.DefinePlugin({
            FRAGMENT_ID: JSON.stringify(config.FRAGMENT_ID),
        }),
        ifDevelopment(
            new webpack.HotModuleReplacementPlugin()
        ),
        ifDevelopment(
            new ReactRefreshWebpackPlugin({
                overlay: {
                    sockIntegration: 'whm',
                },
            }),
        ),
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