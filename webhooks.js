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
                parseData(chunk);
                if(chunk != null) {
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
                        console.log("Exiting script for Github update");
                        process.exitCode = 1;
                    }
                } else {
                    console.log("JSON parse error.");
                }

            })
            req.on('error', function(err) {
                console.error("Webhook error: \n" + err);
            })
            res.end();
        }).listen(8080);
    }
}

function parseData(json) {
    var data;
    try {
        data = JSON.parse(json);
    } catch(e) {
        console.error(e);
        return null;
    }
    return data;
}