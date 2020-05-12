const music = require("../services/musicService.js");

module.exports.run = async (ctx) => {
    if (!ctx.message.member.voice.channel)
        return ctx.error('Error', 'you must be in a voice channel.');

    if (!ctx.guild.me.voice.channel)
        return ctx.error('Error', 'bot is not in a VC.');

    if (ctx.guild.me.voice.channelId !== ctx.message.member.voice.channelId)
        return ctx.error('Error', 'you are not in the same VC as the bot.');

    var server = ctx.getOrAddServer(ctx.guild.id);
    music.skip(server);
};
 
module.exports.info = {
  name: 'skip',
  description: 'skips the current song, if any',
  usage: '',
  category: 'voice',
  accessableby: 'members'
};