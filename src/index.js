import DocumentDefault from './_document';
import FragmentDefault from './_fragment';

export default (App, Document, Fragment) => {
    Document = Document || DocumentDefault;
    Fragment = Fragment || FragmentDefault;

    if (SERVER) {
        const server = require('./_server').default;
        return server(App, Document, Fragment);
    }

    if (CLIENT) {
        const client = require('./_client').default;
        client(App, Document, Fragment);
    }
}