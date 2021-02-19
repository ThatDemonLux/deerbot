module.exports.run = async (bot, message, args) => 
{
    const music = args.join(" ");

    bot.distube.play(message, music)
}

module.exports.config = 
{
    name: "play",
    aliases: ['p']
}