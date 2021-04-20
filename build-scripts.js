import webpack from 'webpack';
import config from './webpack/webpack.config.scripts';

const compiler = webpack(config);

compiler.run((error, stats) => {
    if (stats) {
        process.stdout.write(`${stats.toString({
            timings: true,
            hash: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            entrypoints: true,
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
