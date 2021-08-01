import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default {
    name: 'scripts',
    devtool: 'source-map',
    entry: {
        'bin': './src/bin/index.js',

        'client/index': './src/client/index.js',
        'client/logger': './src/client/logger.js',

        'server/index': './src/server/index.js',
        'server/core': './src/server/core.js',
        'server/render': './src/server/render.js',
        'server/document': './src/server/document.js',
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
        '@document',
        '@core'
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
        new webpack.BannerPlugin({
            include: 'bin',
            banner: "#!/usr/bin/env node",
            raw: true
        }),
    ],
};
