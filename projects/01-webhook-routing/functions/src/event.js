const { onRequest } = require("firebase-functions/v2/https");
const line = require('../util/line.util');
const messages = require('../message/messages');
const crypto = require('crypto');

exports.receive = onRequest({ invoker: "public" },async (request, response) => {


    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }

    const events = request.body.events

    for (const event of events) {

        console.log(JSON.stringify(event));

        switch (event.type) {

            case "message":

                if (event.message.type === "text") {
                    const profile = await line.getProfile(event.source.userId)
                    await line.reply(event.replyToken, [messages.welcomeMessage(profile)])
                }

                break;

        }


    }

    return response.end();

});


exports.signature = onRequest({ invoker: "public" },async (request, response) => {


    if (request.method !== "POST") {
        return response.status(200).send("Method Not Allowed");
    }

    // TODO:Uncommentt this line to enable signature verification
    const signature = crypto.createHmac('SHA256', process.env.LINE_MESSAGING_CHANNEL_SECRET).update(request.rawBody).digest('base64').toString();
    if (request.headers['x-line-signature'] !== signature) {
        return res.status(401).send('Unauthorized');
    }

    const events = request.body.events

    for (const event of events) {

        console.log(JSON.stringify(event));

        switch (event.type) {

            case "message":

                if (event.message.type === "text") {
                    const profile = await line.getProfile(event.source.userId)
                    await line.reply(event.replyToken, [messages.welcomeMessage(profile)])
                }

                break;

        }


    }

    return response.end();

});
