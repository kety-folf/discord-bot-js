const music = require("../services/musicService.js");

module.exports.run = async (ctx) => {
    const term = ctx.rawArgs;
    music.playAudio(ctx, term);
};
 
  module.exports.info = {
    name: 'play',
    description: 'plays music from youtube',
    usage: '<youtube url>',
    category: 'music',
    accessableby: 'members',
   aliases: ['join', "ytplay", 'p']
  };
