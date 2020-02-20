// Prints watch2gether link in chat
module.exports = {
    name: 'watch',
    aliases: ['watch', 'watch2gether'],
    category: 'info',
    description: 'Presents a link to a watch2gether.com room',
    run: async (client, message, args) => {
        await message.channel.send("https://www.watch2gether.com/rooms/forfunz-wfwuj0h0rho6v60fgk");
    }
}