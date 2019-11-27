const music = require("../services/musicService.js");

module.exports.run = async (ctx) => {
    const term = ctx.rawArgs;
    await music.playAudio(ctx, term);
};

/*module.exports.run = async (ctx) => {
      let url = ctx.args[0];

      if (!ctx.message.member.voiceChannel)
        ctx.error("Error", 'you must be in a voice channel.');

      if (ctx.guild.me.voiceChannel)
        return ctx.error('Error', 'I am already In a voice channel.');

      if (!url)
        return ctx.error('Error', 'please input a url following the command.');

      let validated = await ytdl.validateURL(url);
     
      if (!validated)
        return ctx.error('Error', "input a **valid** url following the command");

      var message = ctx.sendEmbed("Info", "downloading/geting info for song/video");
    
      let connection = await ctx.message.member.voiceChannel.join();

      
      let dispatcher = await connection.playStream(ytdl(url, { filter: 'audioonly' }))
          .on('end', () => ctx.guild.me.voiceChannel.leave());
   
      message.edit(ctx.utils.createEmbed('Music', `Now Playing: ${url}`));
    
     return;
  };*/
 
  module.exports.info = {
    name: 'play',
    description: 'plays music from youtube',
    usage: '<youtube url>',
    category: 'music',
    accessableby: 'members',
   aliases: ['join', "ytplay", 'p']
  };
