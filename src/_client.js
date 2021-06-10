import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

export default (App) => {
    loadableReady(
        () => {
            ReactDOM.hydrate(
                <React.StrictMode>
                    <BrowserRouter basename="/header">
                        <App />
                    </BrowserRouter>
                </React.StrictMode>,
                document.getElementById(FRAGMENT_ID)
            );
        },
        { namespace: "header" }
    );
}
