import fs from 'fs-extra';

export default (argv) => {
    const srcDir = `${__dirname}/templates/react-emotion`;
    const destDir = `${process.cwd()}`;

    try {
        fs.copySync(srcDir, destDir);
        console.log('success!');
    } catch (err) {
        console.log(srcDir);
        console.log(destDir);
        console.log("error!");
        console.error(err);
    }
};
