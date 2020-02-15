module.exports = {
    name: 'ping',
    aliases: ['ping', 'ms'],
    category: 'info',
    description: 'Returns latency to the API',
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Discord ping: ${client.ping}ms`);
    }
}