module.exports = {
    // If the message is "start a poll"
    name: 'poll',
    cooldown: 5,
    aliases: ['vote'],
    description: `Starts a poll (Admins/Owners only; Must have "Administarator" permissions or be the server's owner)`,
    guildOnly: true,
    usage: '',
    args: false,
    execute(message, args) {
        if (message.member.hasPermission('ADMINISTRATOR' || { checkOwner: true })) {
            const addReactions = (message) => {
                message.react('👍')
                    .then(() => message.react('👎'))
                    .catch(() => console.error('One of the emojis failed to react.'));
            }

            message.channel.bulkDelete('1', true).catch(err => {
                console.error(err);
                message.channel.send('there was an error trying to prune messages in this channel!');
            });

            message.channel.send(args.join(" "))
                .then((addReactions));
        } else {
            message.reply(`You cannot start a poll. You need to have "Admin" perms or be the server's owner.`)
        }
    },
};
