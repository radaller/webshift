import { renderToString } from "react-dom/server";

export default (App, Document, Fragment) => ({ clientStats }) => {
    return (req, res) => {
        let htmlString = '';

        const esi_enabled = req.header('esi') === 'true';
        if (esi_enabled) {
            htmlString = renderToString(
                <Fragment clientStats={ clientStats } >
                    <App/>
                </Fragment>
            );
        } else {
            htmlString = '<!DOCTYPE html>' +
                renderToString(
                    <Document>
                        <Fragment clientStats={ clientStats } >
                            <App/>
                        </Fragment>
                    </Document>
                );
        }

        res.send(htmlString);
    };
};
