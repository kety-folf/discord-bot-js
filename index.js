const config = require("./config.json");
const Discord = require("discord.js");
const db = require("quick.db")
const request = require('request');
const client = new Discord.Client 
const prefix =  config.prefix;
const ytdl = require('ytdl-core');
// rate = 64000;
const ffmpeg = require("ffmpeg")
const search = require('yt-search');
client.on("ready", () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity(`with the best Folf |+help for help`);
client.user.setStatus("online");
});
client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const arg = message.content.substring(1).trim(" ")
    if (!message.content.startsWith(prefix)) return;




    if (message.content.startsWith(prefix + "info")) {
        message.channel.send("bot was made by Kety_the_folf#1470 coded in JS with discord.js");
        return;
    }
    if (message.content.startsWith(prefix + "code")) {
        message.channel.send('if you want to try and make my code better')
        message.channel.send('https://github.com/kety-folf/discord-bot-js')
client.user.setActivity("looking at this chat||prefix is +");
    }
   if (message.content.startsWith(prefix + "leave")) {
        if (!message.member.voiceChannel) return message.channel.send('you must be in a voice channel.');
        if (!message.guild.me.voiceChannel) return message.channel.send('bot is not in a VC.');
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('you are not in the same VC as the bot.');
        message.guild.me.voiceChannel.leave();
       message.channel.send('leaving VC.')
        return;
    }
    if (message.content.startsWith(prefix + "help")) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Bot prefix is +",
                description: "Commands",
                fields: [{
                    name: "Info",
                    value: "Info About the Bot"
                },
				
                {
                    name: "ping",
                    value: "returns pong."
                },


                {
                    name: "leave",
                    value: "stops music and leaves VC"
                },
                {
					name: "search",
					value: "searches youtube"
				},
               
                {
                    name: "code",
                    value: "code for this bot"

                },
               {
                    name: "play ",
                   value: "plays music from youtube needs full url "
               },
                {
                    name: "time",
                    value: "gets time in mutiple timeZones"
                },
				{
					name: "r",
					value: "restarts the bot. (Kety_the_folf#0001 only)"
				},
				{
					name: "pfp",
					value: "gets the users profile pic"
				},
				{
					name: "fox",
					value: "gets a random image of a fox"
				},
				{
					name: "say",
					value: "says message following command"
				}
				
			


                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "©Kety_the_folf#0001"
                }
            }
        });


        return;
    }

    if (message.content.startsWith(prefix + "test")) {
        message.author.send("this is a test");

        return;
    }

    

    if (message.content.startsWith(prefix + "search")) {
       let term = arg;
        search(`${term}`, function (err, r) {
            if (err) return message.channel.send(err);
           var vid = r.videos;

            var first = vid[0];
           let videos = r.videos.slice(1, 11);
            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
                resp += `**[${parseInt(i) + 1}]:** \`https://www.youtube.com` + `${videos[i].url}\`\n`;
            }
           resp += `\n**use url with +play**`;
            message.channel.send(resp);

            resp = ''
        });
    }
    if (message.content.startsWith(prefix + "play")) {
		
		
       if (!message.member.voiceChannel) message.channel.send('you must be in a voice channel.');
       if (message.guild.me.voiceChannel) return message.channel.send('I am already In a voice channel.');
        if (!args[0]) return message.channel.send('please input a url following the command');
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.channel.send("input a **valid** url following the command");
       message.channel.send("downloading/geting info for song/video")
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
       let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' })).on('end', () => message.guild.me.voiceChannel.leave());

       message.channel.send(`Now Playing: ${info.title}`);
	
        return;
    }

    if (message.content.startsWith(prefix + "time")) {
        // List of timezones and locations to be used
        const timezoneList = [
            ["Eastern (Server) Time", "America/New_York"],
            ["UK Time", "Europe/London"],
            ["US Central Time", "America/Chicago"],
            ["US Mountain Time", "America/Denver"],
            ["US Pacific Time", "America/Los_Angeles"],
            ["Central European Time", "Europe/Berlin"],
            ["Hong Kong/Philippines/Western Australia Time", "Asia/Hong_Kong"],
            ["New Zealand Time", "Pacific/Auckland"]
        ];

        // List of settings for time/date formatting
        const settings = {
            hour12: true,
            hour: "numeric",
            minute: "2-digit"
        };

        // Create variables to be used later
        let now = new Date();
        let timeStr = "";

        // Build the time string using the locations and timezones
        for (let [label, location] of timezoneList) {
            let time = now.toLocaleString("en-US", { timeZone: location, ...settings });
            timeStr += `**${label}**: ${time}\n`
        }

        // Send message to the channel in which the command was used
        message.channel.send(timeStr);

    }
    if (message.content.startsWith(prefix + "r")) {
        if (message.author.id = ("263443630767734784")) {
            client.user.setActivity(`RESTARTING`);
            
           process.exit();
        }
	}
	
		if (message.content.startsWith(prefix + "pfp")){
			 var user = message.mentions.users.first();
    let embed = new Discord.RichEmbed()
  .setImage(user.avatarURL)
  .setColor('#275BF0')
    message.channel.send(embed)
	return;
  }
	if (message.content.startsWith(prefix + "fox")){
		
		let embed = new Discord.RichEmbed()
	    .setImage(`https://randomfox.ca/images/${Math.floor(Math.random()*123)}.jpg`)
		.setColor('#ffcc00')
		.setTitle('Fox')
		message.channel.send(embed)
			return;
		}


if (message.content.startsWith(prefix + "say")){
	let term = arg.substring(3).trim(" ");
  message.channel.send(term);
   return;
}
    
      
   
   
});

client.login(config.token);
