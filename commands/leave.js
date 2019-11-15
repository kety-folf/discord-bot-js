module.exports.run = async (ctx) => {
    if (!ctx.message.member.voiceChannel)
        return ctx.error('Error', 'you must be in a voice channel.');

    if (!ctx.guild.me.voiceChannel)
        return ctx.error('Error', 'bot is not in a VC.');

    if (ctx.guild.me.voiceChannelID !== ctx.message.member.voiceChannelID)
        return ctx.error('Error', 'you are not in the same VC as the bot.');

    ctx.guild.me.voiceChannel.leave();
    ctx.sendEmbed('music', 'leaving VC.');
  
    if (!ctx.message.member.voiceChannel)
        return ctx.channel.send('You have to be in a voice channel to stop the music!');
  
    var server = ctx.getServer(ctx.guild.id);
    server.songs = [];
    
    if (server.voiceClient)
        server.voiceClient.dispatcher.end();
};
 
module.exports.info = {
  name: 'leave',
  description: 'leaves vc',
  usage: '',
  category: 'voice',
  accessableby: 'members',
  aliases: ['disconect']
};
