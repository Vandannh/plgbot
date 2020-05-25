//Sends the current destiny picture from the website
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.niris.tv/blog/weekly-reset';
module.exports = {
    name: 'destiny',
    aliases: ['destiny', 'destiny'],
    category: 'info',
    description: 'Returns destiny weekly',
    run: destiny (client, message, args) => {
        rp(url)
            .then(function(html) {
                const pic = $('.thumb-image loaded', html).src;
                console.log(pic);
            })
    
    }
}