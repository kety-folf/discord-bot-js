const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports.run = async (ctx) =>
{
    let term = args[0]; //get text after command
    search(`${term}`, function (error, result)
    {
        if (error)
          return ctx.error("Error", error);
       
        let videos = result.videos.slice(1, 11); //get first 10 results
        
        let response = "";

        for (var i = 0; i < videos.length; i++)
        {
            response += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\` - \`https://www.youtube.com${videos[i].url}\``;
        }

        response += `\n**use url with ~play**`;
      
        return ctx.sendEmbed('search', resp);
    });
  
  };
  
 
module.exports.info = {
  name: 'search',
  description: 'searches youtube',
  usage: '',
  category: 'music',
  accessableby: 'members',
  aliases: ['ytSearch']
};