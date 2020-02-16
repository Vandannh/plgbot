module.exports = {
    name: 'horn',
    category: 'voice',
    description: 'Plays airhorn.mp3 in a voice channel',
    run: async(client, message, args) => {
        if(message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile(require('path').join(__dirname, '../../files/airhorn.mp3'));
                    dispatcher.on('end', end => {
                        message.member.voiceChannel.leave();
                    });
                });
        } else {
            message.channel.send('You need to be in a voice channel.')
        }
    }
}