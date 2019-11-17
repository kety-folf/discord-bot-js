module.exports.run = async (ctx) =>
{
    ctx.channel.startTyping();
    var message = await ctx.channel.send("Checking Ping..");
    await message.edit("Ping Calculated!");
    
    const ping = message.editedTimestamp - message.createdTimestamp;
    
    ctx.channel.stopTyping();
    return message.edit(` this is my ping, ${ctx.user.username}.\nBot Ping: ${(ping)}ms`);
};

module.exports.info = {
    name: 'ping',
    description: 'sends bots ping',
    usage: '',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };
