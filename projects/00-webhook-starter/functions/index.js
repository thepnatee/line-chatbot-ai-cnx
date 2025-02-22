const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");

setGlobalOptions({
    region: "asia-northeast1",
    memory: "1GB",
    concurrency: 40
})


exports.receive = onRequest({ invoker: "public" }, async (request, response) => {


    const events = request.body.events
    
    for (const event of events) {

        console.log(JSON.stringify(event));
    
    }

    return response.end();

});