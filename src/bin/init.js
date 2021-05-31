import fs from 'fs-extra';
import { execSync } from 'child_process';

export default (argv) => {
    const srcDir = `${__dirname}/templates/react-emotion`;
    const destDir = `${process.cwd()}`;

    try {
        console.log('Copying template...');
        fs.copySync(srcDir, destDir);
        console.log('Installing dependencies...');
        execSync('npm install webshift react react-dom @emotion/react @emotion/styled styled-system --save');
        console.log('Successful Initialisation.');
    } catch (err) {
        console.log("There was an expected error during initialising.");
        console.error(err);
    }
};
