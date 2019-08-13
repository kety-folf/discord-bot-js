const ytdl = require('ytdl-core');
const search = require('yt-search');
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {

    let term = arg;//get text after command
    search(`${term}`, function (err, r) {// search youtube
        if (err) return embedErr("Error", err);
       var vid = r.videos;

        var first = vid[0];
       let videos = r.videos.slice(1, 11);//get first 10 resuts
        let resp = '';
        for (var i in videos) {
            resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
            resp += `**[${parseInt(i) + 1}]:** \`https://www.youtube.com` + `${videos[i].url}\`\n`;
        }
       resp += `\n**use url with ~play**`;
      
        embedtxt('search', resp);
        resp = ''
    });
  
  };
  
 
  module.exports.help = {
    name: 'search',
    description: 'searches youtube',
    usage: '',
    category: 'music',
    accessableby: 'members',
    aliases: ['ytSearch']
  };