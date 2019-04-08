const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "+";
const opus = require("node-opus");
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-getinfo')
var rate = 64000;

const songPrefixes = ["now playing driving into the sun by pepper coyote", 'now playing reg line by foxes and peppers', "now playing all the single furries", "now playing knock,knock by Niic", "now playing star by pepper coyote", "now playing Fuwwies", "now playing story by foxes and peppers", "now playing suit up by foxes and peppers"]
var encoder = new opus.OpusEncoder(rate);{
    var song = ['\song1.mp3', '\song2.mp3', '\song3.mp3','\song4.mp3','\song5.mp3','\song6.aiff','\song7.mp3','\song8.mp3']  
};
const ffmpeg = require("ffmpeg")
client.on("ready", () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("bot prefix is +");
});
client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
        return;
    }

    if (message.content.startsWith(prefix + "info")) {
        message.channel.send("bot was made by Kety_the_folf#1470 coded in JS with discord.js");
        return;
    }
 if (message.content.startsWith(prefix + "code")) {
        message.channel.send('if you want to try and make my code better')
        message.channel.send('https://github.com/kety-folf/discord-bot-js')
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
                    name: "play",
                    value: "Joins VC and Starts playing a Song. See +songs for command and name"
                },
                {
                    name: "songs",
                    value: "lists song names with command"
                },
                {
                    name: "stop",
                    value: "stops music and leaves VC"
                },
                {
                    name: "playYT",
                    value: "Plays from youtube there is no queue and you need to use the url/video ID."
                },
                         {
                         name: "code",
                         value: "code for this bot"
                         }


                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "©Kety_the_folf#1470"
                }
            }
        });


        return;
    }

    if (message.content.startsWith(prefix + "test")) {
        message.author.send("this is a test");
        return;
    }

    if (message.content.startsWith(prefix + "test2")) {
        return message.reply("test");
        return;


    }
    if (message.content.startsWith(prefix + "play")) {
        let songNum = args[0]
        if (!args[0]) return message.reply('please input a song number following the command');
        if (songNum < 1 || songNum > 7) return;
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send(songPrefixes[songNum - 1])
                const dispatcher = connection.playFile(song[songNum - 1]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished"); });
            })
            .catch(console.error);
        return;
    }
    
    if (message.content.startsWith(prefix + "playYT")) {
        if (!message.member.voiceChannel) return message.channel.send('you must be in a voice channel.');
        if (message.guild.me.voiceChannel) return message.channel.send('I am already In a voice channel.');
        if (!args[0]) return message.channel.send('please input a url following the command');
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.channel.send("input a **valid** url following the command");
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
        let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));
        message.channel.send(`Now Playing: ${info.title}`);
        return;
    }
    
    
        if (message.content.startsWith(prefix + "songs")) {
message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "**Songs you can play**",
    fields: [{
        name: "song 1",
        value: "command to play is +play 1"
      },
    {
      name: "song2",
      value: "command to play is +play 2."  
},
        {
    name: "song 3",
    value: "command to play is +play 3"
        },
{
    name: "song 4",
    value: "command to play is +play 4"
},
{
    name: "song 5",
    value: "command to play is +play 5"
},
{
name: "song 6",
value: "comand to play is +play 6"
},
{
name: "song 7",
value: "command to play is +play 7"
},
 {
name: "song 8",
value: "command to play is +play 8"
}     
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "©Kety_the_folf#1470"
    }
  }
});
            return;
        
    }
   
    if (message.content.startsWith(prefix + "quit")) {
        if (message.member.roles.find("name", admin)) {
            client.destroy()
            message.channel.send("shuting down")
        } else {
            return message.reply("you dont have the perms to run this")
        }
        
        return;
    }
});

client.login("NoT_a_priVaTe_BoT_KeY");
