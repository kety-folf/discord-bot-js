const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports.run = async (ctx) => {
    const term = ctx.args.join(" ");
    search(term, function (error, result)
    {
        if (error)
            return ctx.error("Error", error);
       
        const videos = result.videos.slice(1, 11); //get first 10 results
        
        var resp = "";
        for (var i = 0; i < videos.length; i++)
        {
            resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\` - \`https://www.youtube.com${videos[i].url}\`\n`;
        }
        resp += `\n**use url with ~play**`;
      
        return ctx.sendEmbed('search', resp);
    });
};
 
module.exports.info = {
  name: 'search',
  description: 'searches youtube',
  usage: '',
  category: 'music',
  accessableby: 'members',
  aliases: ['ytsearch']
};
