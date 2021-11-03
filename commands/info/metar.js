// Prints METAR in chat
const https = require('https');
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
            hostname: 'avwx.rest',
            path: `/api/metar/${ap}?options=&airport=true&reporting=true&format=json&onfail=cache`,
            method: 'GET'
        };
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
                f = JSON.parse(d);
            });
        });
        req.on('error', error => {
            console.error(error);
        });
        req.end();
        
        await message.channel.send(f.sanitized);
    }
}
