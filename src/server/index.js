import fs from 'fs';
import dotenv from 'dotenv';

import core from "@core";

dotenv.config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3040;

const clientStats = JSON.parse(fs.readFileSync('./stats.json', 'utf8'));

const app = core({ clientStats });

app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});
