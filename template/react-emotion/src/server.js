import path from 'path';
import fs from 'fs';
import express from 'express';

import render from "./_render";

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
