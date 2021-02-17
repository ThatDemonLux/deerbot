// Import & require the discord.js module
const Discord = require('discord.js');

module.exports = {
    // If the message is "what is my avatar"
    name: 'avatar',
    cooldown: 5,
    aliases: ['icon', 'pfp'],
    description: `Send a user to their (or mentioned) user's avatar`,
    guildOnly: false,
    usage: '<user>',
    args: false,
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        if (!message.mentions.users.size) {
            // Set the title of the field
            embed.setTitle(`Your avatar!`);
            embed.setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }));
            // Set the color of the embed
            embed.setColor(`RANDOM`);
            // Send the user's avatar (embed) to the same channel as the message
            return message.channel.send(embed);
        }

        const avatarList = message.mentions.users.map(user => {
            // Set the title of the field
            embed.setTitle(`${user.username}'s avatar!`);
            embed.setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }));
            // Set the color of the embed
            embed.setColor(`RANDOM`);
            // Send the user's avatar (embed) to the same channel as the message
            return message.channel.send(embed);
        });
    },
};
