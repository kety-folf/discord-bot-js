
const Discord = require("discord.js");
const client = new Discord.Client 
const prefix = "+";
const config = require("./config.json");
const opus = require("node-opus");
const ytdl = require('ytdl-core');
const { getInfo } = require('ytdl-getinfo')
var rate = 64000;
const ffmpeg = require("ffmpeg")
const search = require('yt-search');
client.on("ready", () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity(`bot prefix is + `);
client.user.setStatus("online");
});
client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const arg = message.content.substring(1).trim(" ")
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
                    name: "stop",
                    value: "stops music and leaves VC"
                },
                {
                    name: "play",
                    value: "Plays from youtube there is no queue and you need to use the url. to get a url you can use +search"
                },
                {
                    name: "code",
                    value: "code for this bot"

                },
                {
                    name: "search",
                    value: "searches youtube and gets top 10 resuts and url "
                },
                {
                    name: "time",
                    value: "gets time in mutiple timeZones"
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
        if (!message.member.voiceChannel) return message.channel.send('you must be in a voice channel.');
        if (message.guild.me.voiceChannel) return message.channel.send('I am already In a voice channel.');
        if (!args[0]) return message.channel.send('please input a url following the command');
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.channel.send("input a **valid** url following the command");
        message.channel.send("downloading/geting info for song/video")
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
        let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));

        message.channel.send(`Now Playing: ${info.title}`);
        return;
    }

    if (message.content.startsWith(prefix + "time")) 
        const timezoneList = [
            ["Eastern (Server) Time", "America/New_York"],
            ["UK Time", "Europe/London"],
            ["US Central Time", "America/Chicago"],
            ["US Mountain Time", "America/Denver"],
            ["US Pacific Time", "America/Los_Angeles"],
            ["Central European Time", "Europe/Berlin"],
            ["Hong Kong/Philippines/Western Australia Time", "Asia/Hong_Kong"],
            ["New Zealand", "Pacific/Auckland"]
        ];       
        const settings = {
            hour12: true,
            hour: "numeric",
            minute: "2-digit"
        };     
        let now = new Date();
        let timeStr = "";       
        for (let [label, location] of timezoneList) {
            let time = now.toLocaleString("en-US", { timeZone: location, ...settings });
            timeStr += `**${label}**: ${time}\n`
        }      
        message.channel.send(timeStr);
    }   
});

client.login(config.token);

