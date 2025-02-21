
const axios = require("axios");
/*
#Get profile
https://developers.line.biz/en/reference/messaging-api/#get-profile
*/

exports.getProfile = async (userId) => {

    try {

        const url = `${process.env.LINE_MESSAGING_API}/profile/${userId}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Failed to fetch user profile. API responded with status: ${response.status}`);

        }

    } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/*Reply Long Live Token*/
exports.reply = async (token, payload) => {
    const url = `${process.env.LINE_MESSAGING_API}/message/reply`;
    const response = await axios.post(url, {
        replyToken: token,
        messages: payload
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(`Failed to send reply. API responded with status: ${response.status}`);
    }
};