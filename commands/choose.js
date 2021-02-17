module.exports = {
    // If the message is "choose out of choices"
    name: 'choose',
    cooldown: 5,
    aliases: ['random'],
    description: 'Returns a random choice from choices you provide',
    guildOnly: false,
    usage: '<your choices>',
    args: true,
    execute(message, args) {
        let replies = args
        let result = Math.floor(Math.random() * args.length);

        message.reply('Choosing...').then((resultMessage) => {
            resultMessage.edit(replies[result])
        })
    },
};
