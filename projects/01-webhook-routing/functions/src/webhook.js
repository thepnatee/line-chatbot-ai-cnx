const { onRequest } = require("firebase-functions/v2/https");

exports.receive_1 = onRequest({ invoker: "public" },async (request, response) => {

    const events = request.body.events
    for (const event of events) {

        console.log(JSON.stringify(event));

    }

    return response.end();

});
