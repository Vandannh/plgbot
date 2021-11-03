const fs = require('fs');
// Plays an airhorn sound in the voicechannel
module.exports = {
    name: 'ip',
    aliases: ['moan', 'moanip'],
    category: 'voice',
    description: 'Plays ip.mp3 in a voice channel',
    run: async(client, message, args) => {
        /*if(message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile(require('path').join(__dirname, '../../files/ip.mp3'));
                    dispatcher.on('start', start => {
                        dispatcher.setVolume(0.5);
                    })
                    dispatcher.on('end', end => {
                        message.member.voiceChannel.leave();
                    });
                });
        } else {
	    message.channel.send(message.member.voiceChannel)
            message.channel.send('You need to be in a voice channel.')
        }*/
	message.channel.send('Your IP is: \\*\\*.\\*\\*.\\*\\*\\*.*** \nDiscord hides your IP when posted in a chat channel. Try it out with your credit card number!')
    }
}
