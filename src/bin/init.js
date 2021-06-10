import fs from 'fs-extra';
import { execSync } from 'child_process';

export default (argv) => {
    const srcDir = `${__dirname}/templates/react-emotion`;
    const destDir = `${process.cwd()}`;

    try {
        console.log(`Setting up Webshift in ${process.cwd()}`);
        fs.copySync(srcDir, destDir);

        console.log('Installing NPM dependencies...');

        console.log('npm install webshift --save');
        execSync('npm install webshift --save');

        console.log('npm install react react-dom --save');
        execSync('npm install react react-dom --save');

        console.log('npm install @emotion/react @emotion/styled styled-system --save');
        execSync('npm install @emotion/react @emotion/styled styled-system --save');

        console.log('npm install react-router react-router-dom --save');
        execSync('npm install react-router react-router-dom --save');

        console.log('npm install @loadable/babel-plugin @loadable/component @loadable/server --save');
        execSync('npm install @loadable/babel-plugin @loadable/component @loadable/server --save');

        console.log('Dependencies are installed.');

        console.log('npm start - to start');
    } catch (err) {
        console.log("There was an expected error during initialising.");
        console.error(err);
    }
};
