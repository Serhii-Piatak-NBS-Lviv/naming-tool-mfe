const datalayerEvent = (event, eventName, payload) => {
    let datalayerHead = {
        event: event,
        event_name: eventName
    };
    let datalayerObject = {...datalayerHead, ...payload};

    if( window.dataLayer === undefined) window.dataLayer = [];
    // console.log(datalayerObject)
    window.dataLayer.push(datalayerObject)
};

export default datalayerEvent;