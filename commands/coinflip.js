// Import & require the discord.js module
const Discord = require('discord.js');

module.exports = {
    // If the message is "coinflip"
    name: 'coinflip',
    cooldown: 5,
    aliases: ['cointoss','coin','flip'],
    description: `flips a coin`,
    guildOnly: false,
    usage: 'coinflip',
    args: false,
    execute(message, args) {
        const n = Math.floor(Math.random() * 2);
        let result;
        if(n === 1) result = 'heads';
        else result = 'tails';
        const embed = new MessageEmbed()
        .setTitle('½  Coinflip  ½')
        .setDescription(`I flipped a coin for you, ${message.member}. It was **${result}**!`)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    },
};
