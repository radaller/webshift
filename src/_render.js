import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

export default (App, Headers) => ({ clientStats }) => {
    return (req, res) => {
        const context = {};
        const extractor = new ChunkExtractor({ stats: clientStats, namespace: "header" })

        const ServerApp = () =>
            <ChunkExtractorManager extractor={ extractor }>
                <StaticRouter context={ context } location={ req.url } basename="/header">
                    <App/>
                </StaticRouter>
            </ChunkExtractorManager>

        let htmlString = '';
        const esi_enabled = req.header('esi') === 'true';

        if (esi_enabled) {
            htmlString =
                `<div id="${ FRAGMENT_ID }">` +
                    renderToString(<ServerApp />) +
                '</div>' +
                extractor.getScriptTags();
        } else {
            htmlString =
                '<!DOCTYPE html>' +
                '<html lang="en">' +
                    renderToString(<Headers />) +
                    '<body>' +
                        `<div id="${ FRAGMENT_ID }">` +
                            renderToString(<ServerApp />) +
                        '</div>' +
                        extractor.getScriptTags() +
                    '</body>' +
                '</html>';
        }

        console.log(extractor.chunks);

        res.send(htmlString);
    };
};
