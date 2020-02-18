let http = require('http');
let crypto = require('crypto');
const exec = require('child_process').exec;
const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
require('dotenv').config;

module.exports = {
    runWebhook: function(channel) {
        http.createServer(function(req, res) {
            req.on('data', function(chunk) {
                let sig = "sha1=" + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(chunk.toString()).digest('hex');
                if (req.headers['x-hub-signature'] == sig) {
                    exec('cd /home/pi/plgbot && git pull');
                    console.log(req.headers['x-github-event']);

                    let type = req.headers['x-github-event'];
                    if(type == "push") {
                        let commits = "**Commits:**\n";
                        chunk.commits.forEach(commit => {
                            commits += "**Commit message: **" + commit.message + "\n";
                        });
                        const embed = new RichEmbed()
                            .setFooter(chunk.pusher)
                            .setColor('#000000')
                            .addField('New push to ' + chunk.repository.html_url, commits)
                            .setTimestamp()
                        
                        channel.send(embed);
                    }
                }
            });
            res.end();
        }).listen(8080);
    }

}