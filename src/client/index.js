import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from '@app';

import { BrowserDataProvider } from 'webshift';

loadableReady(
    () => {
        ReactDOM.hydrate(
            <React.StrictMode>
                <BrowserDataProvider>
                    <BrowserRouter basename="/header">
                        <App />
                    </BrowserRouter>
                </BrowserDataProvider>
            </React.StrictMode>,
            document.getElementById(FRAGMENT_ID)
        );
    },
    { namespace: "header" }
);
