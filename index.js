// prerequisites
const { Client, Collection, RichEmbed, Util } = require("discord.js");
const { readdirSync } = require("fs");
const { token, prefix } = require("./config.json");
const db = require("quick.db");
const DEV_ID = "263443630767734784";

if (prefix.length == 0)
{
	prefix = "~"; // Default prefix.
}

const folf = new Client();
folf.commands = new Collection();
folf.aliases = new Collection();
folf.prefix = prefix;

// base constructor for a server account
class Server
{
	constructor(serverId)
	{
		this.serverId = serverId;
		this.songs = [];
		this.voiceClient = null;
	}
}

// base constructor for an account
class Account
{
	constructor(userId, balance)
	{
		this.userId = userId;
		this.balance = balance; // .bal
		this.updated = false;
		this.endpoints = 
		{
			bal: ".bal"
		};
	}

	take(amount)
	{
		if (typeof(amount) == "number")
		{
			this.balance -= amount;
			this.updated = true;
		}
	}

	give(amount)
	{
		if (typeof(amount == "number"))
		{
			this.balance += amount;
			this.updated = true;
		}
	}
	
	sync()
	{
		if (this.updated)
		{
			db.set(userId + this.endpoints.bal, this.balance);
		}
	}
}

const commandPath = "./commands/";

function getCommands(path)
{
	const commandFiles = readdirSync(path).filter(d => d.endsWith(".js"));

	for (const file of commandFiles)
	{
		// grab the command location.
		const commandSource = require(`${path}${file}`);
		  
		folf.commands.set(commandSource.info.name, commandSource);
		  
		// if there are any aliases set, append all aliases to the main command name.

	  	if (commandSource.info.aliases)
			commandSource.info.aliases.forEach(c => folf.aliases.set(c, commandSource.info.name));
	}
};

function reloadCommand(commandName)
{
	const commandFiles = readdirSync(commandPath).filter(f => f.endsWith(".js"));

	for (const file of commandFiles)
	{
		if (file == commandName)
		{
			try
			{
				const filePath = `${commandPath}${file}.js`;
				delete require.cache[require.resolve(filePath)];
				folf.commands.delete(commandName);

				const commandSource = require(filePath);
				folf.commands.set(commandName, commandSource);

				if (commandSource.info.aliases)
					commandSource.info.aliases.forEach(a => folf.aliases.set(a, commandSource.info.name));
				
				return true;
			}
			catch(error)
			{
				console.log(error);
				return false;
			}
		}
	}
}

// gets the commands at a specified directory.
getCommands(commandPath);

// when the bot is finished getting ready, do this:
folf.on('ready', async () =>
{
	console.log(`Connected to Discord as ${folf.user.tag} across ${folf.guilds.size} servers.`);
   	folf.user.setActivity(`with a very cute Folf | prefix: ${prefix}`);
	folf.user.setStatus("online");
});

// when a message is sent, do this:
folf.on('message', async message =>
{
	const initialBalance = 400;
	const errorColor = "#F92E02";
	const embedColor = "#0099FF";

	const utils =
	{
		isType: function(obj, typeName)
		{
			return typeof(obj) === typeName;
		},

		escape: function(text)
		{
			const zeroWidthChar = String.fromCharCode(8203);

			if (this.isType(text, "string"))
				return text
					.replace(/`/g, "`" + zeroWidthChar)
					.replace(/@/g, "@" + zeroWidthChar);
			else
				return text;
		},
		
		toPascalCase: function(text)
		{
			if (text)
			{
				var result = text.slice(0, 1).toUpperCase();
				
				if (text.Length > 1)
				{
					result += text.slice(1);
				}
			
				return result;
			}
		
			return text;
		},

		getRandNum: function(max, min = 0)
		{
			var inclusive = 1;

			if (min == 0)
				inclusive = 0;

			return Math.floor(Math.random() * (max - min + (inclusive * 1))) + (inclusive * 1);
		},

		// creates an embed, and still allows you to customize it.
		createEmbed: function(title = "", description = "", url = "", imageUrl = "")
		{
			let embed = new RichEmbed().setColor(embedColor);

			if (title.length > 0)
				embed.setTitle(title);
			
			if (description.length > 0)
				embed.setDescription(description);

			if (url.length > 0)
				embed.setURL(url);

			if (imageUrl.length > 0)
				embed.setImage(imageUrl);

			return embed;
		},
		// creates the author reference for a user.
		setAuthor: function(embed, user = null)
		{
			if (!user)
			{
				user = folf.user;
			}
			
			embed.setAuthor(user.username, user.avatarURL);
			
			return embed;
		},
		
		reloadCommand: function(commandName)
		{
			return reloadCommand(commandName);
		}
	};

	// Handle all of the possible parsing errors before moving forward
	if(message.author.bot || message.channel.type !== "text") // must be in guild
		return;

	if(!message.content.startsWith(folf.prefix))
  		return;

	const args = message.content.slice(folf.prefix.length).trim().split(/ +/g);
  	const commandName = args.shift().toLowerCase();

	const command = folf.commands.get(commandName) || folf.commands.get(folf.aliases.get(commandName));
	
	if(command)
	{
		// a generic container that easily stores everything you need.
		const ctx =
		{
			/*client*/folf: folf,
			self: folf.user, // dont know if this takes up much space
			message: message,
			channel: message.channel,
			guild: message.guild,
			user: message.author,
			args: args,
			db: db,
			utils: utils,
			getAccount: function(userId)
			{
				var balanceId = `${userId}.bal`;
				var balance = db.get(balanceId);
				if (balance == null || balance == undefined)
				{
					db.set(balanceId, initialBalance);
				}
				balance = db.get(balanceId);

				return new Account(userId, balance);
			},
			getServer: function(serverId)
			{
				// Set up server stuff here.
				return new Server(serverId);
			},
			sendEmbed: function(title = "", description = "", url = "", imageUrl = "")
			{
				let embed = utils.createEmbed(title, description, url, imageUrl);
				return message.channel.sendEmbed(embed);
			},
			error: function(title, description = "")
			{
				let embed = utils.createEmbed(title, description);
				embed.setColor(errorColor);
				return message.channel.sendEmbed(embed);
			}
		};

		try
		{
			if (command.info.accessableby == 'dev')
			{
				if (message.author.id != DEV_ID)
				{
					ctx.error("Error", "you dont have perms to run this command ");
					return;
				}
			}

			command.run(ctx);
			// db.add('count.fox',1)
			// db.add('count.help',1)
			// handle db increment here.
			if (message.author.id !== DEV_ID)
			{
				// db.add('count.leave',1);
				// db.add('count.play',1);
				// db.add('count.info',1);
				// db.add('count.pfp',1);
				// db.add('count.furry',1);
				// db.add('count.fursuit',1);
				// db.add(`count.coinflip`,1)
				// db.add('count.belp',1);
				// db.add(`count.boop`,1)
				// db.add("count.code", 1);
				// db.add(`count.bal`,1)
				// db.add('count.8ball',1)
				// db.add('count.say',  1);
				// db.add('count.search',1)
				// db.add('count.yiff',  1)
				// db.add('count.ping',  1)
				// db.add('count.slots', 1)
				// db.add('count.time',  1)
				// db.add('count.furry', 1);
				db.add(`count.${command.info.name}`, 1);
			}
			else
			{
				// db.add(`count.eval`,1)
			}
		}
		catch(error)
		{
			console.log(error);
			ctx.error("bot broke");
		}
	}
});

folf.login(token).catch(e => console.log(e));
// log bot here, catch errors that occur.
