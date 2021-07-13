import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from '@app';

import { createBrowserContext } from 'webshift';

const BrowserContext = createBrowserContext();

loadableReady(
    () => {
        ReactDOM.hydrate(
            <React.StrictMode>
                <BrowserContext>
                    <BrowserRouter basename="/header">
                        <App />
                    </BrowserRouter>
                </BrowserContext>
            </React.StrictMode>,
            document.getElementById(FRAGMENT_ID)
        );
    },
    { namespace: "header" }
);
