import webpack from 'webpack';
import serverConfig from '../webpack/webpack.config.server';
import clientConfig from '../webpack/webpack.config.client';

const compiler = webpack([clientConfig, serverConfig]);

compiler.run((error, stats) => {
    if (stats) {
        process.stdout.write(`${stats.toString({
            timings: true,
            hash: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            entrypoints: false,
            warnings: false,
            assets: false,
        })}\n`);
        if (stats.hasErrors()) {
            process.exit(1);
        }
    }
    if (error) {
        process.stderr.write(error);
    }
});
