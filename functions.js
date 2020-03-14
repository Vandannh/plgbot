module.exports = {
    // Finds a member in the discord server via a mention or by name
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);

        if(!target && message.mentions.members) {
            target = message.mentions.members.first();
        }
        if(!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if(!target) {
            target = message.member;
        }
        return target;
    },
    formatDate: function(date) {
        return new Intl.DateTimeFormat('sv-SE').format(date);
    },
    convertSeconds: function(seconds) {
        let time = Number(seconds);
        let h = Math.floor(time / 3600);
        let m = Math.floor(time % 3600 / 60);
        let s = Math.floor(time % 3600 % 60);

        h = h > 0 ? h + (h == 1 ? " hour: " : " hours, ") : "";
        m = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        s = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return h + m + s; 
    }
}