module.exports = {
    name: 'roll',
    aliases: ['random', 'number', 'rng'],
    category: 'info',
    description: 'Returns a random number between 1-100 or 1-[args]',
    run: async (client, message, args) => {
        let max = (!args[0]) ? 100 : ((args[0] > 999999999) ? 999999999 : args[0]);
        message.channel.send(Math.floor(Math.random() * Math.floor(max)));
    }
}