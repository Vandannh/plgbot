const { Client, RichEmbed, Collection } = require('discord.js');
const { runWebhook } = require('./webhooks.js');
const fs = require('fs');
require('dotenv').config();

// Initialize Discord Bot
var client = new Client({
    disableEveryone : true
});

// Collections for loading commands to the bot
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');


// Import each command as a file
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

// Executed when bot is logged in
client.on('ready', function (evt) {
    console.log(`Logged in as ${client.user.username}`);
    client.user.setPresence({
        status: 'online',
        game: {
            name: ' .help',
            type: 'LISTENING'
        }
    })

    runWebhook(client.channels.get('679405765768904731'));
});

// Message handler
client.on('message', async msg => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith('.')) return;
    if(!msg.guild) return;
    if(!msg.member) msg.member = await msg.guild.fetchMember(msg);
    
    var args = msg.content.substring(1).split(/ +/);
    var cmd = args.shift().toLowerCase();
    
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if(command) {
        command.run(client, msg, args);
    }
});

client.login(process.env.DISCORD_TOKEN);