import DocumentDefault from './_document';
import FragmentDefault from './_fragment';
import core from '@webshift/core';
import chunk from '@webshift/chunk';

export { chunk };

export default (App, Document, Fragment) => {
    Document = Document || DocumentDefault;
    Fragment = Fragment || FragmentDefault;

    return core(App, Document, Fragment);
}