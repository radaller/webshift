import fs from 'fs-extra';

export default (argv) => {
    const srcDir = `${__dirname}/templates/react-emotion`;
    const destDir = `${process.cwd()}`;

    try {
        fs.copySync(srcDir, destDir);
        console.log('Successful Initialisation.');
    } catch (err) {
        console.log("There was an expected error during initialising.");
        console.error(err);
    }
};
