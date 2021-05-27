import Renderer from "./_render";

export default (App, Document, Fragment) => {

    const render = Renderer(App, Document, Fragment);

    if (PRODUCTION) {
        const HOST = process.env.HOST || 'localhost';
        const PORT = process.env.PORT || 3040;

        const fs = require('fs');
        const clientStats = JSON.parse(fs.readFileSync('./stats.json', 'utf8'));

        const express = require('express');
        const app = express();

        app.set('etag', false);
        app.set('cacheControl', false);
        const path = require('path');
        app.use(BASE_PATH, express.static(path.resolve(__dirname, './public')));

        app.use(BASE_PATH, render({ clientStats }));

        app.listen(PORT, HOST, () => {
            console.log(`Server started: http://${HOST}:${PORT}`);
        });
    } else {
        return render;
    }
}