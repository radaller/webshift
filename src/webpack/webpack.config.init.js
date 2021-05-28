import CopyPlugin from "copy-webpack-plugin";

export default {
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: `${__dirname}/templates/react-emotion`, to: `${process.cwd()}` },
            ],
        }),
    ],
};