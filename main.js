const { Client, RichEmbed, Collection } = require('discord.js');
require('dotenv').config();

// Initialize Discord Bot
var client = new Client({
    disableEveryone : true
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on('ready', function (evt) {
    console.log(`Logged in as ${client.user.username}`);
    client.user.setPresence({
        status: 'online',
        game: {
            name: ' .help',
            type: 'LISTENING'
        }
    })
});

client.on('message', async msg => {
    if (msg.content.startsWith('.')) {
        var args = msg.content.substring(1).split(/ +/);
        var cmd = args.shift().toLowerCase();
       
        if(cmd.length === 0) return;
        let command = client.commands.get(client.aliases.get(cmd));

        if(command) {
            command.run(client, msg, args);
        }
     }
});

client.login(process.env.DISCORD_TOKEN);