// Import & require the discord.js module
const Discord = require('discord.js');

module.exports = {
    // If the message is "what is the server info"
    name: 'server-info',
    cooldown: 5,
    aliases: ['server'],
    description: 'Replies with server info',
    guildOnly: true,
    usage: '',
    args: false,
    execute(message, args) {
        const { guild } = message

        const { name, region, memberCount, owner } = guild
        const icon = guild.iconURL()

        // Creating embeds using the MessageEmbed constructor
        const embed = new Discord.MessageEmbed()
            // Set the title of the field
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Total Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
            )

        // Send the embed to the same channel as the message
        message.channel.send(embed)
    },
};
