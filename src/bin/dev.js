import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import serverConfig from '../webpack/webpack.config.server';
import clientConfig from '../webpack/webpack.config.client';

export default (argv) => {
    const HOST = process.env.HOST || 'localhost';
    const PORT = process.env.PORT || 3040;

    const app = express();

    const compiler = webpack([clientConfig, serverConfig]);

    const options = {
        publicPath: process.env.PUBLIC_PATH,
        serverSideRender: true,
        stats: {
            colors: true,
            assets: true,
            ids: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
            entrypoints: false,
        },
        writeToDisk: false,
    };
    app.set('etag', false);
    app.set('cacheControl', false);

    app.use((req,res,next) => {
        console.log(`[DevServer][Asset] ${req.method} ${req.get('Host')} ${req.originalUrl}`);
        next();
    });

    app.use('/', webpackDevMiddleware(compiler, options));
    app.use('/', webpackHotMiddleware(compiler.compilers.find(cmp => cmp.name === 'client')));
    app.use('/', webpackHotServerMiddleware(compiler));
    app.listen(PORT, HOST, () => {
        console.log(`[DevServer] Started: http://${HOST}:${PORT}`);
    });
}
