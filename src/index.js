import DocumentDefault from './_document';
import FragmentDefault from './_fragment';

export default (App, Document, Fragment) => {
    Document = Document || DocumentDefault;
    Fragment = Fragment || FragmentDefault;

    if (SERVER) {
        const Renderer = require('./_render');
        return Renderer(App, Document, Fragment);
    }

    if (CLIENT) {
        const client = require('./_client');
        client(App, Document, Fragment);
    }
}