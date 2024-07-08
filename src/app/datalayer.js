const datalayerEvent = (event, eventName, payload) => {
    let datalayerHead = {
        event: event,
        event_name: eventName
    };
    let datalayerObject = {...datalayerHead, ...payload};

    if( window.datalayer === undefined) window.datalayer = [];
    window.datalayer.push(datalayerObject)
};

export default datalayerEvent;