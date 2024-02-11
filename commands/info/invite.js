// Returns a discord invite to the server
module.exports = {
    name: 'invite',
    aliases: ['invite'],
    category: 'info',
    description: 'Presents an invite link to the PLG server',
    run: async (client, message, args) => {
        await message.channel.send('https://discord.gg/eNP7SB9GRj');
    }
}