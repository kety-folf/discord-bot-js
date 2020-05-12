module.exports.run = async (ctx) =>
{
    ctx.channel.startTyping();
    var message = await ctx.channel.send("Checking Ping..");
    message.edit("Ping Calculated!")
    .then((msg) =>
    {
        const ping = msg.editedTimestamp - msg.createdTimestamp;
        ctx.channel.stopTyping();
        return msg.edit(` this is my ping, ${ctx.user.username}.\n${msg.editedTimestamp}\n${message.createdTimestamp}\nBot Ping: ${(ping)}ms`);
    });
};

module.exports.info = {
    name: 'ping',
    description: 'sends bots ping',
    usage: '',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };
