import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from '@app';

import { BrowserDataProvider } from 'webshift';

const BASE_PATH = document.getElementById(`${FRAGMENT_ID}__BASE_PATH`).textContent;
const LOADABLE_NAMESPACE = FRAGMENT_ID;
const ROOT_ELEMENT_ID = FRAGMENT_ID;

loadableReady(
    () => {
        ReactDOM.hydrate(
            <React.StrictMode>
                <BrowserDataProvider namespace={ LOADABLE_NAMESPACE }>
                    <BrowserRouter basename={ BASE_PATH }>
                        <App />
                    </BrowserRouter>
                </BrowserDataProvider>
            </React.StrictMode>,
            document.getElementById(ROOT_ELEMENT_ID)
        );
    },
    { namespace: LOADABLE_NAMESPACE }
);
