const db = require('quick.db');
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.leave',1);
    if (!message.member.voiceChannel) return embedErr('Error', 'you must be in a voice channel.');
    if (!message.guild.me.voiceChannel) return embedErr('Error', 'bot is not in a VC.');
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return embedtxt('music', 'you are not in the same VC as the bot.');
    message.guild.me.voiceChannel.leave();
  
   embedtxt('music', 'leaving VC.' )
    
   
  };
  
 
  module.exports.help = {
    name: 'leave',
    description: 'leaves vc',
    usage: '',
    category: 'voice',
    accessableby: 'members',
    aliases: ['disconect']
  };