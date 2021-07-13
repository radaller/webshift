import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { RequestExtractor, DataProvider } from 'webshift';

import * as App from '@app';

import Headers from './_document';

const variableName = '_initialData';

export default ({ clientStats }) => {
    return async (req, res) => {

        const routerContext = {};
        const extractor = new ChunkExtractor({ stats: clientStats, namespace: "header" });
        const requests = [];

        const ServerApp = () =>
            <ChunkExtractorManager extractor={ extractor }>
                <StaticRouter context={ routerContext } location={ req.url } basename="/header">
                    <App.default/>
                </StaticRouter>
            </ChunkExtractorManager>;

        renderToString(
            <RequestExtractor requests={ requests }>
                <ServerApp />
            </RequestExtractor>
        );
        const result = await Promise.all(requests);
        const data = {};
        result.map(req => Object.assign(data, req));
        console.log('[Data Keys]', Object.keys(data));

        const ServerAppWithData = () =>
            <DataProvider initialData={ data }>
                <ServerApp />
            </DataProvider>;

        let htmlString = '';
        const esi_enabled = req.header('esi') === 'true';

        if (esi_enabled) {
            htmlString =
                `<div id="${ FRAGMENT_ID }">` +
                    renderToString(<ServerAppWithData />) +
                '</div>' +
                `<script id="${variableName}" type="application/json">${ JSON.stringify(data) }</script>` +
                extractor.getScriptTags();
        } else {
            htmlString =
                '<!DOCTYPE html>' +
                '<html lang="en">' +
                    renderToString(<Headers />) +
                    '<body>' +
                        `<div id="${ FRAGMENT_ID }">` +
                            renderToString(<ServerAppWithData />) +
                        '</div>' +
                        `<script id="${variableName}" type="application/json">${ JSON.stringify(data) }</script>` +
                        extractor.getScriptTags() +
                    '</body>' +
                '</html>';
        }

        console.log('[Chunks]', extractor.chunks);

        res.send(htmlString);
    };
};
