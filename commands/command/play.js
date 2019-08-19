const ytdl = require('ytdl-core');
const ffmpeg = require("ffmpeg");
const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {
    let URL = arg.substring(4)
		if(message.author.id !== "263443630767734784") db.add('count.play',1)
    if (!message.member.voiceChannel) embedErr("Error", 'you must be in a voice channel.');
    if (message.guild.me.voiceChannel) return embedErr('Error', 'I am already In a voice channel.');
     if (!URL) return embedErr('Error', 'please input a url following the command.');
     let validate = await ytdl.validateURL(URL);
     if (!validate) return embedErr('Error', "input a **valid** url following the command");
    embedtxt("Info","downloading/geting info for song/video")
    
     let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(URL, { filter: 'audioonly' })).on('end', () => message.guild.me.voiceChannel.leave());
   
      embedtxt('Music', `Now Playing: ${URL}`);
   
     return;
  };
  
 
  module.exports.help = {
    name: 'play',
    description: 'plays music from youtube',
    usage: '<youtube url>',
    category: 'music',
    accessableby: 'members',
   aliases: ['join', "ytplay", 'p']
  };