import defaultConfig from "./webshift.config.constants";
import merge from "webpack-merge";

let customConfig;
try {
    customConfig = require(/* webpackIgnore: true */ `${process.cwd()}/webshift.config.js`);
    console.log('Using custom webshift.config.js');
} catch (e) {
    customConfig = {};
}

export const config = merge(defaultConfig, customConfig);

export const resolve = {
    alias: {
        'react': 'react',
        'react-dom': 'react-dom',
        'webshift/app': `${process.cwd()}/src/App.js`,
        'webshift/render': `${__dirname}/_render.js`,
        'webshift/server': `${__dirname}/_server.js`,
        'webshift/document': `${__dirname}/_document.js`,
        'webshift/fragment': `${__dirname}/_fragment.js`,
    }
};