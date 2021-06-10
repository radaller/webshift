import DocumentDefault from './_document';
import core from '@webshift/core';

export default (App, Document) => {
    Document = Document || DocumentDefault;

    return core(App, Document);
}