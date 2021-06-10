import React from 'react';

export default (props) => {
    const scriptTags = props.extractor.getScriptElements();
    return (
        <>
            <div id={ FRAGMENT_ID }>
                { props.children }
            </div>
            { scriptTags }
        </>
    );
};
