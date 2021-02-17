module.exports = {
    // If the message is "clear these messages"
    name: 'clear',
    cooldown: 5,
    aliases: ['prune', 'delete'],
    description: 'Deletes messages in the channel (Mods only; Role needs "Manage Messages" permission',
    guildOnly: true,
    usage: '<number of messages>',
    args: false,
    execute(message, args) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            const amount = parseInt(args[0]) + 1;

            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 99.');
            }

            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('There was an error trying to clear messages in this channel!');
            });
        } else {
            message.reply(`You cannot clear other people's messages.`)
        }
    },
};
