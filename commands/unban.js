'use strict';

/**
 * Unban Command
 * Replies w/ "member unbanned"
 */

module.exports = {
	name: 'unban',
  aliases: [],
  cooldown: 5,
	description: 'Unbans',
  args: true,
  usage: '<Banned User ID>',
  guildOnly: true,
  permissions: '',
  // If msg = "unban member"
	execute(msg, args) {
    // Unban user
    const id = args[0];
    guild.members.unban(id);

    // Let msg author know member was unbanned
    msg.reply(`Member unbanned. Unbanned member ID: ${id}`)
	},
};