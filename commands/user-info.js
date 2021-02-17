// Import & require the discord.js module
const Discord = require('discord.js');

module.exports = {
    name: 'user-info',
    cooldown: 5,
    aliases: ['user'],
    description: `Replies with user's (or mentioned user's) info`,
    guildOnly: false,
    usage: '',
    args: false,
    execute(message, args) {
        const { guild } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        console.log(member)

        const embed = new Discord.MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields(
                {
                    name: 'User tag',
                    value: user.tag,
                },
                {
                    name: 'Is bot',
                    value: user.bot,
                },
                {
                    name: 'Nickname',
                    value: member.nickname || 'None',
                },
                {
                    name: 'Joined Discord',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                },
                {
                    name: 'User ID',
                    value: user.id,
                }
            )

            message.channel.send(embed);
    },
};
