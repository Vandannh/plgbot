//Sends the current destiny picture from the website
const r = require('request');
const $ = require('cheerio');
const url = 'https://www.niris.tv/blog/weekly-reset';
module.exports = {
    name: 'destiny',
    aliases: ['destiny'],
    category: 'info',
    description: 'Returns destiny weekly',
    run: async (client, message, args) => {

        r(url, function(err, resp, body) {
            if(err)
                throw err;
            $ = cheerio.load(body);
            var pic = $('.thumb-image loaded').html().src;
            console.log(pic);
        })
    }
}