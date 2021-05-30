import React from 'react';
import ReactDOM from 'react-dom';

export default (App) => {
    ReactDOM.hydrate(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById(FRAGMENT_ID)
    );
}
