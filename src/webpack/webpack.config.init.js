import CopyPlugin from "copy-webpack-plugin";

export default {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: `${__dirname}/templates/react-emotion`, to: `${process.cwd()}` },
            ],
        }),
    ],
};