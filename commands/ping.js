module.exports = {
    // If the message is "what is the ping"
    name: 'ping',
    cooldown: 5,
    aliases: [],
    description: 'Whenever you send "ping", it replies "pong" & the bot latency.',
    guildOnly: false,
    usage: '',
    args: false,
    execute(message, args) {
        // send back "Pong." to the same channel the message was sent in
        message.reply('Calculatng ping...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            resultMessage.edit(`Pong. Bot Latency: ${ping} ms`)
        })
    },
};
