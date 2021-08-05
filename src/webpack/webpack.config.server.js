import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import LoadablePlugin from "@loadable/webpack-plugin";

import { config } from './webpack.config.common';

const { ifDevelopment, ifProduction } = getIfUtils(process.env.NODE_ENV || 'development');

export default (env) => (
    {
        name: 'server',
        devtool: ifDevelopment('source-map'),
        entry: ifDevelopment(`${__dirname}/server/core.js`, `${__dirname}/server/entry.js`),
        resolve: {
            alias: {
                '@app': `${ process.cwd() }/src/App.js`,
                '@render': `${__dirname}/server/render.js`,
                '@core': `${__dirname}/server/core.js`,
                '@document': `${__dirname}/server/document.js`,
                '@logger': `${__dirname}/server/logger.js`,
            },
        },
        mode: ifDevelopment('development', 'production'),

        target: 'node',

        externalsType: 'umd',
        externals: ifDevelopment([
            nodeExternals({
                allowlist: ['@app', 'webshift']
            })
        ]),

        output: {
            path: path.resolve('build'),
            filename: 'server.js',
            libraryTarget: 'umd',
            publicPath: ifDevelopment(env.PUBLIC_PATH, ''),
            assetModuleFilename: 'img/[name].[contenthash][ext][query]',
        },

        optimization: {
            minimize: false,
            nodeEnv: false
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

            new webpack.DefinePlugin({
                FRAGMENT_ID: JSON.stringify(config.FRAGMENT_ID),
            }),

            new LoadablePlugin({
                outputAsset: false,
                writeToDisk: false,
            }),

            ifProduction(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    reportFilename: path.resolve(`build/analyze/server.html`),
                    openAnalyzer: false,
                })
            ),
        ]),
    }
);
