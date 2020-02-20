const fs = require('fs');
module.exports = {
    name: "uptime",
    category: "info",
    description: "Returns the uptime of Vandanns Raspberry Pi",
    run: async (client, message, args) => {
        fs.readFile('/proc/uptime', 'utf8', function(err,data) {
            if(err) {
                return console.log(err);
            }
            let time = parseFloat(data.split()[0]);
            time = new Date(time*1000);
            message.channel.send(time.getUTCHours() + ':' + time.getUTCMinutes() + ':' + time.getUTCSeconds());
        })
    }
}