
const { Client, Collection, RichEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const { token, prefix } = require('./config.json');

const folf = new Client();
folf.commands = new Collection();
folf.aliases = new Collection();
folf.prefix = prefix;


const load = dirs => {
	const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
	for (const file of commands) {
	  const pull = require(`./commands/${dirs}/${file}`);
	  folf.commands.set(pull.help.name, pull);
	  if (pull.help.aliases) pull.help.aliases.forEach(a => folf.aliases.set(a, pull.help.name));
	}
  };
  const commandsDir = readdirSync('./commands/');
  commandsDir.forEach(x => load(x));

folf.on('ready', async () => {

	console.log("Connected as " + folf.user.tag + " in "+ `${folf.guilds.size}` + " servers")
   folf.user.setActivity(`with a very cute Folf | prefix: ${prefix}`);
folf.user.setStatus("online");

});

folf.on('message', async message => {
	const arg = message.content.substring(1).trim(" ");
	function embedErr(title, decrption){// embed function for errors
		let embed = new RichEmbed()
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
	function embedtxt(title, decrption){// embed text
		let embed = new RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		message.channel.send(embed)
	};
	function embedlink(title, decrption, url){// embed url
		let embed = new RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		.setURL(url)
		message.channel.send(embed)
	};
	function embedimg(title, decrption, img){ //embed image
		let embed = new RichEmbed()
		.setColor('#0099ff')
		.setTitle(title)
		.setDescription(decrption)
		.setImage(img)
		message.channel.send(embed)
	};
  
  if(message.author.bot || message.channel.type !== 'text') return;

  const args = message.content.slice(folf.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(!message.content.startsWith(folf.prefix)) return;
  const commandfile = folf.commands.get(cmd) || folf.commands.get(folf.aliases.get(cmd));
  if(commandfile) commandfile.run(folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg, clean);

});

folf.login(token).catch(e => console.log(e));