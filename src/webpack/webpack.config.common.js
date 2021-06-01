import defaultConfig from "./webshift.config.constants";
import merge from "webpack-merge";

let customConfig;
try {
    customConfig = require(/* webpackIgnore: true */ `${process.cwd()}/webshift.config.js`);
    console.log('Loaded custom webshift.config.js');
} catch (e) {
    customConfig = {};
}

export const config = merge(defaultConfig, customConfig);
