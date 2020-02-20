const fs = require('fs');
const { convertSeconds } = require('../../functions.js');
// Returns the uptime of the raspberry pi
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
            
            message.channel.send(convertSeconds(time));
        })
    }

    
}