import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';

export default (App, Document) => ({ clientStats }) => {
    return (req, res) => {
        let htmlString = '';
        const context = {};

        const extractor = new ChunkExtractor({ stats: clientStats, namespace: "header" })

        const jsx = extractor.collectChunks(
            <StaticRouter context={ context } location={ req.url } basename="/header">
                <App/>
            </StaticRouter>
        );

        const esi_enabled = req.header('esi') === 'true';
        if (esi_enabled) {
            htmlString =
                `<div id="${ FRAGMENT_ID }">` +
                    renderToString(jsx) +
                '</div>' +
                extractor.getScriptTags();
        } else {
            htmlString =
                '<!DOCTYPE html>' +
                '<html lang="en">' +
                    renderToString(<Document />) +
                    '<body>' +
                        `<div id="${ FRAGMENT_ID }">` +
                            renderToString(jsx) +
                        '</div>' +
                        extractor.getScriptTags() +
                    '</body>' +
                '</html>';
        }

        console.log(extractor.chunks);

        res.send(htmlString);
    };
};
