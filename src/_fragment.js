import React from 'react';

export default (props) => {
    return (
        <>
            <div id={ FRAGMENT_ID }>
                { props.children }
            </div>
        </>
    );
};
