const ytdl = require('ytdl-core');
const ffmpeg = require("ffmpeg");
const db = require('quick.db')
//const { Player } = require("discord-player");
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg, ytKey) => {
	const player = new Player(folf, ytKey);
 var URL = arg.substring(4)
 /* const URL = message.content.slice(settings.prefix.length).trim().split(/ +/g);
serverID= message.guild.id
		if(message.author.id !== "263443630767734784") db.add('count.play',1);
		if(folf.player.isPlaying(serverID)){
			client.player.addToQueue(serverID, URL[0]);
		embedtxt('queue added', `added ${URL[0]} to queue`)
		}
		else{
			let song = await client.player.play(message.member.voice.channel, URL[0])
        message.channel.send(`Currently playing ${song.name}!`);
		} */
		
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