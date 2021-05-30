import DocumentDefault from './_document';
import FragmentDefault from './_fragment';
import core from '@webshift/core';

export default (App, Document, Fragment) => {
    Document = Document || DocumentDefault;
    Fragment = Fragment || FragmentDefault;

    return core(App, Document, Fragment);
}