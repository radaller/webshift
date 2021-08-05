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
                PUBLIC_PATH: process.env.PUBLIC_PATH,
                BASE_PATH: process.env.BASE_PATH,
                LOG_LEVEL: process.env.LOG_LEVEL,
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

    app.use(process.env.PUBLIC_PATH, express.static(path.resolve(__dirname, './public')));
    app.use('/', render({ clientStats }));

    return app;
};
