import React from 'react';

export default (props) => {
    const { Headers, App, Scripts, esi_enabled, fragment_id } = props;

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
            <div id={ fragment_id }>
                <App />
            </div>
            <Scripts />
        </Wrapper>
    );
};