import React from 'react';

export default (props) => {
    const { Headers, App, Scripts, esi_enabled, FRAGMENT_ID } = props;

    const Wrapper = (props) => {
        return esi_enabled ? props.children : (
            <html lang="en">
                <Headers />
                <body>
                    { props.children }
                </body>
            </html>
        );
    };

    return (
        <Wrapper>
            <div id={ FRAGMENT_ID }>
                <App />
            </div>
            <Scripts />
        </Wrapper>
    );
};