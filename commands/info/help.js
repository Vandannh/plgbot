const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports= {
    name: 'help',
    aliases: ['commands'],
    category: 'info',
    description: 'Presents info about all the commands',
    run: async(client, message, args) => {
        getAll(client, message);
    }
}
// Sends all commands as a RichEmbed to the discord textchannel
function getAll(client, message) {
    const embed = new RichEmbed()
        .setColor("YELLOW")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \'${cmd.name}'`)
            .join('\n');
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + '\n' + category);

    return message.channel.send(embed.setDescription(info));
}