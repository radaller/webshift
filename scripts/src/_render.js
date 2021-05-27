import { renderToString } from "react-dom/server";

import Document from "webshift/document";
import Fragment from "webshift/fragment";

export default ({ clientStats }) => {
    return (req, res) => {
        let htmlString = '';

        const esi_enabled = req.header('esi') === 'true';
        if (esi_enabled) {
            htmlString = renderToString(
                <Fragment clientStats={ clientStats } />
            );
        } else {
            htmlString = '<!DOCTYPE html>' +
                renderToString(
                    <Document>
                        <Fragment clientStats={ clientStats } />
                    </Document>
                );
        }

        res.send(htmlString);
    };
};
