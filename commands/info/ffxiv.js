// Returns a discord invite to the server
module.exports = {
    name: 'ffxiv',
    aliases: ['ffxiv', 'finalfantasy', 'heavensward', 'hw'],
    category: 'infi',
    description: 'FFXIV',
    run: async (client, message, args) => {
        await message.channel.send('Did you know that the critically acclaimed MMORPG Final Fantasy XIV has a free trial, and includes the entirety of A Realm Reborn AND the award-winning Heavensward expansion up to level 60 with no restrictions on playtime? Sign up, and enjoy Eorzea today! https://secure.square-enix.com/account/app/svc/ffxivregister?lng=en-gb');
    }
}
