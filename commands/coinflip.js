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
        var rand = ['Heads','Tails'];
        message.reply('Flipping coin...').then((resultMessage) => {

            resultMessage.edit(rand[Math.floor(Math.random()*rand.length)])
        })
    },
};
