const config = require("./config.json");
const db = require('quick.db')
const fs = require('fs')
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Folf-Bot-Discord', 'kety-folf', config.e621Key, 50);
const Discord = require("discord.js");
const si = require('systeminformation')
const client = new Discord.Client; 
const ytdl = require('ytdl-core');
const ffmpeg = require("ffmpeg")
const search = require('yt-search');
client.on("ready", () => {
    console.log("Connected as " + client.user.tag + " in "+ `${client.guilds.size}` + " servers")
    client.user.setActivity(`with a very cute Folf | prefix: ${config.prefix}`);
client.user.setStatus("online");
});
client.on('message', async message => {
	var prefix =  config.prefix;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
   
    const arg = message.content.substring(1).trim(" ");
    	

      
    
	if (message.content.startsWith("prefix")) return message.channel.send("my prefix is ~");
	if (message.content.startsWith("Prefix")) return message.channel.send("my prefix is ~");
    if (message.content.startsWith(prefix + "code")) {
        
		embedlink('GitHub', 'if you want to  make my code better', 'https://github.com/kety-folf/discord-bot-js')
    }
   if (message.content.startsWith(prefix + "leave")) {
        if (!message.member.voiceChannel) return embedErr('Error', 'you must be in a voice channel.');
        if (!message.guild.me.voiceChannel) return embedErr('Error', 'bot is not in a VC.');
        if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return embedtxt('music', 'you are not in the same VC as the bot.');
        message.guild.me.voiceChannel.leave();
      
	   embedtxt('music', 'leaving VC.' )
        return;
    }
	function embedErr(title, decrption){
		let embed = new Discord.RichEmbed()
		.setColor('#f92e02')
		.setTitle(title)
		.setDescription(decrption)
		message.channel.send(embed)
	};
	function clean(text) {
		if (typeof(text) === "string")
		  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
			return text;
	  };
	function embedtxt(title, decrption){
		let embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		message.channel.send(embed)
	};
	function embedlink(title, decrption, url){
		let embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		.setURL(url)
		message.channel.send(embed)
	};
	function embedimg(title, decrption, img){
		let embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		.setImage(img)
		message.channel.send(embed)
	};
    if (message.content.startsWith(prefix + "help")) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Bot prefix is ~",
                description: "Commands",
                fields: [{
                    name: "Info",
                    value: "Info About the Bot and server"
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
				},
				{
					name: "boop",
					value: "boop a user"
				},
				{
					name: "e621",
					value: "gets a image from e621 (must be in NSFW channel)"
					
				},
				{
					name: 'commandAdd',
					value: 'suggest a new command give a decrption of what you want the command to be'
				},
				{
					name: 'commands',
					value: 'see suggested commands '
				},
				{
					name: 'createBank',
					value: 'get started with the money system' 
				},
				{
					name: 'bal or balance',
					value: 'see your balance' 
				},
				{
					name: 'slots',
					value: 'play some slots '
				},
				{
					name: 'coinFlip',
					value: 'flip a coin for some money cost 5' 
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
	if (message.content.startsWith(prefix + 'e621')){
		if (message.channel.nsfw){
		wrapper.posts.getPopularPosts(enums.e621PopularityStrings.daily)
.then((data) => {
    embedimg('e621', '', data[Math.floor(Math.random()*20)].file_url);
})
}
else{
	embedErr('Error', 'not nsfw channel')
}
	}

	if (message.content.startsWith(prefix + "eval")) {
		if(message.author.id !== "263443630767734784") return;
		try {
		  const code = arg.substring(4).trim(" ");
		  let evaled = eval(code);
	 
		  if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
			let embed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('eval')
		.addField('IN', clean(code))
		.addField('OUT', clean(evaled))
		message.channel.send(embed)
		  //message.channel.send(clean(evaled), {code:"xl"});
		} catch (err) {
		  message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		  
		}
	  }


    if (message.content.startsWith(prefix + "info")) {
        embedtxt('Info', "bot was made by Kety_the_folf#0001 coded in JS with discord.js");
        si.cpu()
    .then(data => {
        embedtxt('CPU Information:', '- manufucturer: ' + data.manufacturer + ' - brand: ' + data.brand +' - speed: ' + data.speed + ' - cores: ' + data.cores + ' - physical cores: ' + data.physicalCores);
         
    })
    .catch(error => embedErr('error', error));
	
        si.mem()
		.then(data1 => {
        embedtxt('RAM Information:',
        '  - free: ' + data1.free +
        '  - used: ' + data1.used +
        '  - total: ' + data1.total);
        
    })
	
    .catch(error =>    embedErr('error', error));
	si.cpuCurrentspeed()
	.then(data2 => {
        embedtxt('CPU Speed Information:',
        '  - avg: ' + data2.avg +
        '  - min: ' + data2.min +
        '  - max: ' + data2.max);
        
    })
	
    .catch(error =>    embedErr('error', error));
	si.cpuTemperature()
	.then(temp => {
	embedtxt('CPU temp:', temp.main);
	})
	
	
	
    .catch(error =>    embedErr('error', error));
    
	si.osInfo()
	 .then(os => {
        embedtxt('OS Information:', ' - platform: ' + os.platform +' - release: ' + os.release + ' -build: ' + os.build + ' - distro: ' + os.distro);
         
    })
    .catch(error => embedErr('error', error))

}



	

    if (message.content.startsWith(prefix + "search")) {
       let term = arg;
        search(`${term}`, function (err, r) {
            if (err) return embedErr("Error", err);
           var vid = r.videos;

            var first = vid[0];
           let videos = r.videos.slice(1, 11);
            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
                resp += `**[${parseInt(i) + 1}]:** \`https://www.youtube.com` + `${videos[i].url}\`\n`;
            }
           resp += `\n**use url with ~play**`;
          
			embedtxt('search', resp);
            resp = ''
        });
    }
    if (message.content.startsWith(prefix + "play")) {
		
		
       if (!message.member.voiceChannel) embedErr("Error", 'you must be in a voice channel.');
       if (message.guild.me.voiceChannel) return embedErr('Error', 'I am already In a voice channel.');
        if (!args[0]) return embedErr('Error', 'please input a url following the command.');
        let validate = await ytdl.validateURL(args[0]);
        if (!validate) return embedErr('Error', "input a **valid** url following the command");
       embedtxt("Info","downloading/geting info for song/video")
        let info = await ytdl.getInfo(args[0]);
        let connection = await message.member.voiceChannel.join();
       let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' })).on('end', () => message.guild.me.voiceChannel.leave());
embedtxt('Music', `Now Playing: ${info.title}` );
       
	
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
		let embed = new Discord.RichEmbed()
		.setTitle("Time")
        .setDescription(timeStr)
		message.channel.send(embed)

    }
    if (message.content.startsWith(prefix + "r" || prefix + 'restart')) {
        if (message.author.id == ("263443630767734784")) {
            client.user.setActivity(`RESTARTING`);
          
           process.exit();
        }
		else {
			embedErr("Error", "you dont have perms to run this command ")
			return;
		}
	}
	if (message.content.startsWith(prefix + 'setupAccount')){
		  if (message.author.id == ("263443630767734784")) {
			  var user = message.mentions.users.first()
 if(!user) {
	 user = message.author
 }
 db.set(`${user.id}.bal`, 300)
  embedtxt('bank', 'account created')
	}
	}
		if (message.content.startsWith(prefix + "pfp")){
			 var user = message.mentions.users.first() ;
			 if(!user){
				 user = message.author
			 }
			  embedimg('', user, user.avatarURL);
	return;
  }
	if (message.content.startsWith(prefix + "fox")){
		embedimg('Fox', 'Powered by randomfox.ca', `https://randomfox.ca/images/${Math.floor(Math.random()*123)}.jpg`);
			return;
		}


if (message.content.startsWith(prefix + "say")){
	let term = arg.substring(3).trim(" ");
  message.channel.send(term);
   return;
}
if (message.content.startsWith(prefix + 'commandAdd')){
	var data = arg.substring(3);

fs.appendFile("C:/Users/Administrator/Desktop/discord-bot-js/data/commands-to-add.txt",`\r\n ${arg.substring(10)}\r\n`, (err) => {
  if (err) embedErr('Error',err);
  embedtxt('file edit',"Successfully Written to File.");
});
	
}
if (message.content.startsWith(prefix + 'commands')){
	fs.readFile("C:/Users/Administrator/Desktop/discord-bot-js/data/commands-to-add.txt", function(err, buf) {
  embedtxt('', buf);
  
});
	
}
if (message.content.startsWith(prefix + 'createBank' )){
	db.set(`${message.author.id}.bal`, 100)
  
  embedtxt('bank', 'account created')
}

if(message.content.startsWith(prefix + 'balance') || message.content.startsWith(prefix + 'bal')){
 var user = message.mentions.users.first()
 if(!user) {
	 user = message.author
 }
var bal = db.get(`${user.id}.bal`)
 embedtxt('bal',`${user} ${bal}`) 
}
if (message.content.startsWith(prefix + 'slots')){
	
	var bet = arg.substring(5);
	var win = bet*Math.floor(Math.random()*10)
	var bal = db.get(`${message.author.id}.bal`)
	if(isNaN(bet)) return embedErr('Error', `${bet} is not a number, are you trying to brake something.`)
	if(bet < 0) return embedErr('ERROR', 'Stop Trying To Get Unlimited Money. yes i know you would try to do this')
	if (bet > bal) return embedErr('error', `bet ${bet} > bal ${bal}`);
	db.subtract(`${message.author.id}.bal`, bet)
	var num1 = Math.floor(Math.random()*5)
	var num2 = Math.floor(Math.random()*5)
	var num3 = Math.floor(Math.random()*5)
	embedtxt('slots', `${num1}|${num2}|${num3}`)
	if (num1 == num2 && num2 == num3 && num1 == num3){
		db.add(`${message.author.id}.bal`, win)
		embedtxt('slots', `you won ${win}`)
	} 
	
}

if(message.content.startsWith(prefix + 'coinFlip' )){
	var bal = db.get(`${message.author.id}.bal`);
	
	var flip = arg.substring(8);
	db.subtract(`${message.author.id}.bal`, 5)
	flipvalue = Math.floor(Math.random()*2);
	if (!flip) return embedtxt('error', 'you must pick heads or tails');
	if (flip === ' heads' && flipvalue === 0){
		db.add(`${message.author.id}.bal`, bal*.5);
		embedtxt('heads',`you won ${bal*.5}`);
	}
	if (flip === ' heads' && flipvalue === 1){
	embedtxt('tails ', 'you lost')	;
}
if (flip == ' tails' && flipvalue === 1){
	db.add(`${message.author.id}.bal`, bal*.5);
		embedtxt(' tails',`you won ${bal*.5}`);
	}
	if (flip === ' tails' && flipvalue === 0){
	embedtxt('heads ', 'you lost');
}
}
 if (message.content.startsWith(prefix + "boop")){
	 			 var user1 = message.mentions.users.first();
				 var user2 = message.mentions.users.last();
				 if (!user1) return embedtxt('Error', "@ a user you want to boop");
				 var user = message.author;
				 if(user == user1 || user == user2) return embedimg('boop', `${user} has booped them self`, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg')
				 if (user1 != user2){
					 embedimg('Boop', ` ${user} has booped ${user1} and ${user2} `, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg');
				 }
				 else{
				embedimg('Boop', ` ${user} has booped ${user1}`, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg' );	 
				 }
				
				
				 return;
 };  
      
   
   
});

client.login(config.token);
