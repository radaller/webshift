import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { RequestExtractor, DataProvider } from 'webshift';

import * as App from '@app';
import logger from '@logger';
import Document from '@document';

export default ({ clientStats }) => {
    return async (req, res, next) => {

        const routerContext = {};
        const chunkExtractor = new ChunkExtractor({ stats: clientStats, namespace: FRAGMENT_ID, publicPath: process.env.PUBLIC_PATH});

        const ServerApp = () =>
            <ChunkExtractorManager extractor={ chunkExtractor }>
                <StaticRouter context={ routerContext } location={ req.url } basename={ process.env.BASE_PATH }>
                    <App.default/>
                </StaticRouter>
            </ChunkExtractorManager>;

        const requests = [];
        renderToString(
            <RequestExtractor requests={ requests }>
                <ServerApp />
            </RequestExtractor>
        );
        const result = await Promise.all(requests);

        const data = {};
        result.map(req => Object.assign(data, req));

        logger.verbose({ message: '[RequestExtractor]', meta: { dataKeys: Object.keys(data)}});

        const ServerAppWithData = () =>
            <DataProvider initialData={ data }>
                <ServerApp />
            </DataProvider>;

        const Scripts = () => [
            ...chunkExtractor.getScriptElements(),
            <script
                id={ `${ FRAGMENT_ID }__INITIAL_DATA` }
                type={ "application/json" }
                dangerouslySetInnerHTML={ { __html: JSON.stringify(data) } }
            />,
        ];

        logger.verbose({ message: '[ChunkExtractor]', meta: { chunks: chunkExtractor.chunks } });

        res.send('<!DOCTYPE html>' + renderToString(
            <Document
                Headers={ App.Headers }
                App={ ServerAppWithData }
                Scripts={ Scripts }
                esi_enabled={ req.header('esi') === 'true' }
                fragment_id={ FRAGMENT_ID }
            />
        ));
        next();
    };
};
