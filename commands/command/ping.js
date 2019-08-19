const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.ping',1)
    message.channel.startTyping();
    var m = await message.channel.send("Checking Ping..");
    m.edit("Ping Calculated!");
    m.delete().catch(noerr=>{});
    message.channel.send(`If you want to know my ping, ${message.author.username}...\nBot Ping: ${(m.createdTimestamp - message.createdTimestamp)}ms`);
     message.channel.stopTyping();
     return;
   
  
  };
  
 
  module.exports.help = {
    name: 'ping',
    description: 'sends bots ping',
    usage: '',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };