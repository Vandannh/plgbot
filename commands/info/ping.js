module.exports = {
    name: 'ping',
    aliases: ['ping', 'ms'],
    category: 'info',
    description: 'Returns latency to the API',
    run: async (client, message, args) => {
        message.channel.send(`Discord ping: ${client.ping}ms`);
    }
}