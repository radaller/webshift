import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import serverConfig from '../webpack/webpack.config.server';
import clientConfig from '../webpack/webpack.config.client';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3040;

const app = express();

const compiler = webpack([clientConfig, serverConfig]);

const options = {
    publicPath: '/',
    serverSideRender: true,
    stats: {
        colors: true,
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

app.use(serverConfig.output.publicPath, webpackDevMiddleware(compiler, options));
app.use(serverConfig.output.publicPath, webpackHotMiddleware(compiler.compilers.find(cmp => cmp.name === 'client')));
app.use(serverConfig.output.publicPath, webpackHotServerMiddleware(compiler));

app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
