module.exports = {
    // If the message is "what is honey"
    name: 'honey',
    cooldown: 5,
    aliases: [],
    description: 'What is Honey?',
    guildOnly: false,
    usage: '',
    args: false,
    execute(message, args) {
        message.channel.send(`**We believe everyone should have the information they need to make the best decisions with their money when they're shopping.**\nIt’s easy to spend money online. But getting the most value out of something is a different story. For example, when you're shopping, finding the best deal takes time, prices change depending on the buyer, and payment methods aren’t always in your best interest.\nWe don’t think that’s fair.\nHoney is here to help. We give everyone the tools it takes to find the best savings, perks, and all around best value on shopping for products. And we make them free and easy-to-use. So you can always shop with confidence.\nIf it involves spending money online, we’ll be there to help.\nHoney is for all to use. Use referral link: https://www.joinhoney.com/ref/zkj4vyu to start saving today, so everyone wins.`);
    },
};
