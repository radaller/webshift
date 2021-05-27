export default (props) => {
    const clientStats = props.clientStats;
    return (
        <>
            <div id={ FRAGMENT_ID }>
                { props.children }
            </div>
            <script src={`${clientStats.publicPath}${clientStats.assetsByChunkName.vendor[0]}`} async/>
            <script src={`${clientStats.publicPath}${clientStats.assetsByChunkName.main[0]}`} async/>
        </>
    );
};
