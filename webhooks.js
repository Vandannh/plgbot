let http = require('http');
let crypto = require('crypto');
const exec = require('child_process').exec;
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
require('dotenv').config;

module.exports = {
    runWebhook: function(channel) {
        http.createServer(function(req, res) {
            let data=[];
            let sig = "";
            req.on('data', chunk => {
                sig = "sha1=" + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(chunk.toString()).digest('hex');
                
                data = JSON.parse(chunk);

                if (req.headers['x-hub-signature'] === sig && data.repository.full_name && data.ref === 'refs/heads/master') {
                    let type = req.headers['x-github-event'];
                    let commits = "";
                    data.commits.forEach(commit => {
                        commits += "**> Commit message:** " + commit.message + "\n";
                    });
                    const embed = new RichEmbed()
                    .setFooter('Author: ' + data.pusher.name)
                    .setColor('#ffffff')
                    .addField('New push to ' + data.repository.html_url, commits)
                    .setTimestamp()
                    
                    channel.send(embed);
                    
                    exec('cd /home/pi/plgbot && git pull');
                    
                }
            })
            res.end();
        }).listen(8080);
    }
}