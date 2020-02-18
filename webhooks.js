let http = require('http');
let crypto = require('crypto');
const exec = require('child_process').exec;
require('dotenv').config;

module.exports = {
    runWebhook: function() {
        http.createServer(function(req, res) {
            req.on('data', function(chunk) {
                let sig = "sha1=" + crypto.createHmac('sha1', process.env.WEBHOOK_SECRET).update(chunk.toString()).digest('hex');

                if (req.headers['x-hub-signature'] == sig) {
                    exec('cd' + '/home/pi/plgbot');
                }
            });
            res.end();
        }).listen(8080);
    }
}