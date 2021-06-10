import React from 'react';
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';

export default (App, Document, Fragment) => ({ clientStats }) => {
    return (req, res) => {

        let htmlString = '';
        const context = {};

        const extractor = new ChunkExtractor({ stats: clientStats, namespace: "header" })

        const jsx = extractor.collectChunks(
            <StaticRouter context={ context } location={ req.url } basename="/header">
                <App/>
            </StaticRouter>
        );
        // const test = renderToString(
        //     <Fragment clientStats={ clientStats } extractor={ extractor }>
        //         { jsx }
        //     </Fragment>
        // );
        console.log(extractor.chunks);

        const esi_enabled = req.header('esi') === 'true';
        if (esi_enabled) {
            htmlString = renderToString(
                <Fragment clientStats={ clientStats } extractor={ extractor }>
                    { jsx }
                </Fragment>
            );
        } else {
            htmlString = '<!DOCTYPE html>' +
                renderToString(
                    <Document>
                        <Fragment clientStats={ clientStats } extractor={ extractor }>
                            { jsx }
                        </Fragment>
                    </Document>
                );
        }

        res.send(htmlString);
    };
};
