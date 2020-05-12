const music = require("../services/musicService.js");

module.exports.run = async (ctx) => {
    var server = ctx.getOrAddServer(ctx.guild.id);
    return await ctx.sendEmbed("Queue Data", music.getQueuePreview(server));
};
 
module.exports.info = {
  name: 'queue',
  description: 'shows the current queue for this server, if any',
  usage: '',
  category: 'voice',
  accessableby: 'members',
  aliases: ['nowplaying', 'np', 'q']
};