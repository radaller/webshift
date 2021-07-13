import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { createServerContext } from 'webshift';

import App from '@app';

import Headers from './_document';

export default ({ clientStats }) => {
    return async (req, res) => {

        const context = {};
        const extractor = new ChunkExtractor({ stats: clientStats, namespace: "header" });

        const { ServerDataContext, resolveData } = createServerContext();

        const ServerApp = () =>
            <ServerDataContext>
                <ChunkExtractorManager extractor={ extractor }>
                    <StaticRouter context={ context } location={ req.url } basename="/header">
                        <App/>
                    </StaticRouter>
                </ChunkExtractorManager>
            </ServerDataContext>;

        renderToString(<ServerApp />);
        const data = await resolveData();

        let htmlString = '';
        const esi_enabled = req.header('esi') === 'true';

        if (esi_enabled) {
            htmlString =
                `<div id="${ FRAGMENT_ID }">` +
                    renderToString(<ServerApp />) +
                '</div>' +
                data.toHtml() +
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
                        data.toHtml() +
                        extractor.getScriptTags() +
                    '</body>' +
                '</html>';
        }

        console.log(extractor.chunks);

        res.send(htmlString);
    };
};
