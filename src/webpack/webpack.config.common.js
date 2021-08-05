import merge from "webpack-merge";

let customConfig;
try {
    customConfig = require(/* webpackIgnore: true */ `${process.cwd()}/webshift.config.js`);
    customConfig.FRAGMENT_ID = customConfig.FRAGMENT_ID || 'main';
    console.log('Loaded custom webshift.config.js');
} catch (e) {
    customConfig = {};
}

export const config = customConfig;
