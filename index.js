'use strict';

// Main File

const fs = require('fs');

// Import/require discord.js module
const Discord = require('discord.js');
const client = new Discord.Client();

// Dynamically reading commands files
// Creates list for commands
client.commands = new Discord.Collection();

// Gets command files from "commands" Folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Sort files into command list
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

  /**
   * Puts commands into Collection
   * key = command name
   * value = exucuted values
   */
	client.commands.set(command.name, command);
}

// Command Cooldown
// Creates list for cooldown per command
const cooldowns = new Discord.Collection();

/**
 * Ready event
 * After this, bot will start reacting to data from Discord
 */
client.on('ready', () => {
  client.user.setActivity(`${client.guilds.cache.size} server(s)`, { type: 'Managing' });
  console.log(`Logged in as ${client.user.tag}!`);
});

// Msg event listener
client.on('message', msg => {
  console.log(`**Server:** ${msg.guild} **Author:** ${msg.author.tag} **Msg:** ${msg.content} **Time:** ${msg.createdAt}`);

  // If msg doesn't start w/ prefix, or the msg author is a bot, return
  if (!msg.content.startsWith(process.env.Prefix) || msg.author.bot) return;

  // Argument Splitter
  const args = msg.content.slice(process.env.Prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Dynamically executing commands
  // Defines commands
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  // If not command, return
  if (!command) return;

  // Server Only Error
  if (command.guildOnly && msg.channel.type === 'dm') {
	  return msg.reply('I can\'t execute that command inside DMs!');
  }

  // Command Perms
  if (command.permissions) {
    // Checks if msg author has perms to use command
    const authorPerms = msg.channel.permissionsFor(msg.author);
    // If not, refuse to execute command
    // Ppl w/ "Admin" perms or "owner of server" overwrite refusal
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return msg.reply('You can not do this!');
    }
  }

  // Argument Checker
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${msg.author}!`;

    // Reply with correct command usage
    if (command.usage) {
      reply += `\nThe proper usage would be: \`${process.env.Prefix}${command.name} ${command.usage}\``;
    }

    return msg.channel.send(reply);
  }

  // Command cooldown
  // Searches "cooldown" list for cooldown of used command
  if (!cooldowns.has(command.name)) {
	  cooldowns.set(command.name, new Discord.Collection());
  }

  // Get current time
  const now = Date.now();
  // Gets cooldown for used command
  const timestamps = cooldowns.get(command.name);
  // Calculate/converts cooldown for used command to time
  const cooldownAmount = (command.cooldown || 3) * 1000;

  // For user, inform user of remaining cooldown time
  if (timestamps.has(msg.author.id)) {
	  const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

  // Test commands for errors
  try {
	  command.execute(msg, args);
  } catch (error) {
	  console.error(error);
	  msg.reply('there was an error trying to execute that command!');
  }
});

/**
 * Configuration files
 * Prefix & token are configured in Heroku
 * 
 * Login bot to Discord using app token
 */
client.login(process.env.Token);
