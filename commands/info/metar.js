// Prints METAR in chat
const axios = require('axios');
module.exports = {
    name: 'metar',
    aliases: ['metar'],
    category: 'info',
    description: 'Prints METAR from given airport',
    run: async (client, message, args) => {
        let ap = args[0];
        let f;
        const options = {
            headers: {
                'Authorization': 'ZOU1hW49udPsua96Vw7NJUCUCbRe1cFMtcTrHJtPFnM',
            },
            url: `avwx.rest/api/metar/${ap}`,
            method: 'GET'
        };

        await axios.get(`https://avwx.rest/api/metar/${ap}`, options)
        .then(function (response) {
            f = response.data.sanitized;
        })
        .catch(function(err) {
            console.error(err);
            f = "request error or something idk";
        });
        // const req = https.request(options, res => {
        //     console.log(`statusCode: ${res.statusCode}`);
        //     res.on('data', d => {
        //         f = JSON.parse(d);
        //     });
        // });
        // req.on('error', error => {
        //     console.error(error);
        // });
        // req.end();
        
        await message.channel.send(f);
    }
}
