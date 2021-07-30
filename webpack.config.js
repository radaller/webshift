import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV || 'development');

export default removeEmpty({
    name: 'scripts',
    devtool: 'source-map',
    entry: {
        'bin': './src/bin/index.js',
        server: './src/_server.js',
        render: './src/_render.js',
        'client/logger': './src/client/logger.js',
        'server/logger': './src/server/logger.js',
        index: './src/index.js',
    },
    mode: 'development',

    target: 'node',

    externalsType: 'umd',
    externals: [
        nodeExternals(),
        'react', 'react-dom', /^react-dom\/.+$/,
        'react-router-dom',
        /^@loadable\/.+$/,
        /^@webshift\/.+$/,
        'webshift',
        '@app',
        '@render',
        '@logger',
    ],

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
    ],
});
