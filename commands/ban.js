module.exports = {
    // If the message is "ban"
    name: 'ban',
    cooldown: 5,
    aliases: [],
    description: 'Ban a member (Mods Only; Roles need "Ban Members" permission)',
    guildOnly: true,
    usage: '<user>',
    args: false,
    execute(message, args) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            // Assuming we mention someone in the message, this will return the user
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    /**
                    * Ban the member
                    */
                    member
                        .ban({
                            reason: 'They were bad!',
                        })
                        .then(() => {
                            // We let the message author know we were able to ban the person
                            message.reply(`Successfully banned ${user.tag}`);
                        })
                        .catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to ban the member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to ban the member');
                            // Log the error
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this guild!");
                }
            } else {
                // Otherwise, if no user was mentioned
                message.reply("You didn't mention the user to ban!");
            }
        } else {
            message.reply("You cannot ban members.")
        }
    },
};
