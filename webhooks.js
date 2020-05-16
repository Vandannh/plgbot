let http = require('http');
let crypto = require('crypto');
const exec = require('child_process').exec;
const { RichEmbed } = require('discord.js');
require('dotenv').config;
// Handles webhooks coming from github whenever a push is made to the plgbot repository
module.exports = {
    runWebhook: function(channel) {
        http.createServer(function(req, res) {
            let data=[];
            let sig = "";
            req.on('data', chunk => {
                sig = "sha1=" + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(chunk.toString()).digest('hex');
                
                try {
                    data = JSON.parse(chunk);
                    if (req.headers['x-hub-signature'] === sig && data.repository.full_name && data.ref === 'refs/heads/master') {
                        let type = req.headers['x-github-event'];
                        let commits = "";
                        data.commits.forEach(commit => {
                            commits += "**> Commit message:** " + commit.message + "\n" + commit.url + "\n";
                        });
                        const embed = new RichEmbed()
                        .setFooter('Author: ' + data.pusher.name)
                        .setColor('#ffffff')
                        .addField('New push to ' + data.repository.html_url, commits)
                        .setTimestamp()
                        
                        channel.send(embed);
                        exec('cd /home/pi/plgbot && git pull');
                    }
                } catch (e) {
                    console.error("Webhook error: " + e);
                }
            })
            req.on('error', function(err) {
                console.error(err);
            })
            res.end();
        }).listen(8080);
    }
}