
const { Client, Collection } = require("discord.js");
const { DefaultPrefix, DefaultActivity, DefaultDeveloperID } = require('./Constants');
const Context = require('./Context');
const CommandLoader = require('./CommandLoader');

const db = require("quick.db");
const config = require("./config.json");

const prefix = config.prefix || DefaultPrefix;
const devId = config.devId || DefaultDeveloperID;

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.prefix = prefix;

var servers = [];

CommandLoader.setCommands(client);

// when the bot is finished getting ready, do this:
client.once('ready', async () => {
	console.log(`Connected to Discord as ${client.user.tag} across ${client.guilds.cache.size} servers.`);

	client.user.setPresence({
		activity: {
			name: `${DefaultActivity} | prefix: ${prefix}`,
			type: 'PLAYING'
		},
		status: 'online'
	});
});

// when a message is sent, do this:
client.on('message', async message => {
	// Handle all of the possible parsing errors before moving forward
	if(message.author.bot || message.channel.type !== "text") // must be in guild
		return;

	if(!message.content.startsWith(client.prefix))
  		return;

	var rawArgs = message.content.slice(client.prefix.length);

	if(rawArgs.length == 0)
		return;
	
	var args = rawArgs.trimLeft().match(/((?:[\w\d])+)(?: *)/gi);
	
	for (var i = 0; i < args.length; i++)
		args[i] = args[i].trim();
	
	const commandName = args.shift().trim().toLowerCase();
	
	rawArgs = rawArgs.slice(commandName.length).trimLeft();
	
	if (config.debug)
	{
		console.log(`\'${commandName}\': Parsed Command`);
		console.log(args.join("\n") + ": Parsed Args");
		console.log(rawArgs + ": Raw Args");
	}
	
	const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

	if (config.debug)
		console.log(command ? command.info ? command.info.name : "null": "null" + ": Command results")

	//var command = folf.commands.get(commandName);
	//if (!command)
	//	command = folf.commands.get(getCommandNameFromAlias(commandName));
	
	if(command)
	{
		const ctx = new Context(client, message, db, servers);
		ctx.rawArgs = rawArgs; // this is just all of the text as one string.
		ctx.args = args;

		try {
			if (command.info.accessableby == 'dev') {
				if (message.author.id != devId)
					return ctx.error("Error", "you dont have perms to run this command ");
			}

			await command.run(ctx);
			// DB commands that counted regardless of dev
			// count.fox count.help

			if (message.author.id !== devId) {
				// DB commands that counted due to dev
				// count.leave count.play count.info count.pfp
				// count.furry count.fursuit count.coinflip count.belp
				// count.boop count.code count.bal count.8ball count.say
				// count.search count.yiff count.ping count.slots count.time
				db.add(`count.${command.info.name}`, 1);
			}
			// DB commands counted only for dev
			// count.eval
		}
		catch(error) {
			console.log(error);
			return ctx.error("bot broke");
		}

		servers = ctx.servers;
	}
	else
	{
		if (config.debug)
			console.log(`Could not find a command of name \'${commandName}\'`);
	}
});

client.login(config.token).catch(e => console.log(e));
