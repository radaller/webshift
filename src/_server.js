import path from 'path';
import fs from 'fs';
import express from 'express';

import Renderer from "./_render";

export default (App, Document, Fragment) => {

    const render = Renderer(App, Document, Fragment);

    if (PRODUCTION) {
        const HOST = process.env.HOST || 'localhost';
        const PORT = process.env.PORT || 3040;

        const clientStats = JSON.parse(fs.readFileSync('./stats.json', 'utf8'));

        const app = express();

        app.set('etag', false);
        app.set('cacheControl', false);
        app.use(BASE_PATH, express.static(path.resolve(__dirname, './public')));

        app.use(BASE_PATH, render({ clientStats }));

        app.listen(PORT, HOST, () => {
            console.log(`Server started: http://${HOST}:${PORT}`);
        });
    } else {
        return render;
    }
}