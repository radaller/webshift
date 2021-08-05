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
                <BrowserDataProvider namespace={ FRAGMENT_ID }>
                    <BrowserRouter basename={ document.getElementById(`${FRAGMENT_ID}__BASE_PATH`).textContent }>
                        <App />
                    </BrowserRouter>
                </BrowserDataProvider>
            </React.StrictMode>,
            document.getElementById(FRAGMENT_ID)
        );
    },
    { namespace: FRAGMENT_ID }
);
