import webpack from 'webpack';
import config from '../webpack/webpack.config.init';

export default (argv) => {
    console.log("init");
    const compiler = webpack(config);
    compiler.run((error, stats) => {
        if (stats) {
            process.stdout.write(`${stats.toString({})}\n`);
            if (stats.hasErrors()) {
                process.exit(1);
            }
        }
        if (error) {
            process.stderr.write(error);
        }
    });
};
