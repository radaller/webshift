import path from 'path';
import express from 'express';

import render from "@render";
import logger from "@logger";

export default ({ clientStats }) => {
    const app = express();

    logger.info({
        message: '[Express]',
        meta: {
            env: {
                HOST: process.env.HOST,
                PORT: process.env.PORT,
                BASE_PATH: process.env.BASE_PATH || '/',
                NAMESPACE: process.env.NAMESPACE || 'fragment',
                LOG_LEVEL: process.env.LOG_LEVEL || 'http',
            }
        }
    });

    app.set('etag', false);
    app.set('cacheControl', false);

    app.use((req,res,next) => {
        logger.http({
            message: `[Express] ${req.method} ${req.get('Host')} ${req.originalUrl}`,
            meta: {
                method: req.method,
                host: req.get('Host'),
                url: req.originalUrl
            }
        });
        next();
    });

    app.use(BASE_PATH, express.static(path.resolve(__dirname, './public')));
    app.use(BASE_PATH, render({ clientStats }));

    return app;
};
