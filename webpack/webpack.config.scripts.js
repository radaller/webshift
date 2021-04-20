import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const { ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default removeEmpty({
    name: 'scripts',
    devtool: ifDevelopment('source-map'),
    entry: {
        index: './scripts/index.js',
    },
    mode: ifDevelopment('development', 'production'),

    target: 'node',

    externals: [nodeExternals()],

    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
        ]
    },

    optimization: {
        minimize: false,
    },

    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    ],
});
