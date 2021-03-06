﻿class Server {
	constructor(serverId)
	{
		this.serverId = serverId;
		this.queueClient = null;
	}
}



// context to use for commands
class Context {
	// constructor(options: ContextOptions) {
	constructor(client, message, db, servers) {
		this.folf = client;
		this.self = client.user;
		this.message = message;
		this.channel = message.channel;
		this.user = message.author;
		this.member = message.member;
		this.guild = message.guild;
		this.account = this.getAccount(message.author.id);
		this.db = db;
		this.args = [];
		this.rawArgs = "";
		this.utils = null;
		this.servers = servers ? servers : [];
		//this.accounts = [];
	}

	getAccount(userId) {
		const balanceId = `${userId}.bal`;
		var balance = db.get(balanceId);

		if (balance == null || balance == undefined)
			db.set(balanceId, initialBalance);

		balance = db.get(balanceId);

		return new Account(userId, balance);
	}

	getOrAddServer(guildId) {
		if (this.servers.some(g => g.serverId == guildId))
			return this.servers.find(g => g.serverId == guildId);

		var server = new Server(guildId);
		this.servers.push(server);
		return server;
	}

	saveOrAddServer(server)
	{
		const index = this.servers.findIndex(g => g.serverId == server.serverId);

		if (index == -1)
			return;
		
		if (config.debug)
			console.log(this.servers[index]);

		this.servers[index] = server;
		
		if (config.debug)
			console.log(this.servers[index]);
	}

	sendEmbed(title, description = "", url = "", imageUrl = "") {
		return this.channel.send(utils.createEmbed(title, description, url, imageUrl))
	}

	reply(message, embed = null) {
		return this.channel.send(message, embed);
	}

	error(title = "", reason = "") {
		title = title || "An error has occured.";
		var embed = utils.createEmbed(title, reason);
		embed.setColor(errorColor);
		return this.channel.send(embed);
	}	
}

// base constructor for an account
class Account
{
	constructor(userId, balance) {
		this.userId = userId;
		this.balance = balance;
		this.updated = false;
		this.endpoints = { bal: ".bal" };
	}

	take(amount) {
		this.balance -= amount;
		this.updated = true;

		return this;
	}

	give(amount) {
		this.balance += amount;
		this.updated = true;

		return this;
	}
	
	sync() {
		if (this.updated)
			db.set(this.userId + this.endpoints.bal, this.balance);
	}
}

/* ACTUAL INDEX.JS */

const { Client, MessageEmbed, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");
const config = require("./config.json");

const prefix = config.prefix || '~';
const devId = config.devId || "263443630767734784";
const commandPath = config.commandPath || "./commands/";
const errorColor = "#F92E02";
const embedColor = "#0099FF";
const initialBalance = 400;

const folf = new Client();
folf.commands = new Collection();
folf.aliases = new Collection();
folf.prefix = prefix;

var servers = [];

function exists(obj) {
	return typeof obj == "undefined" || obj === null;
}

function getFiles(path, extension = null) {
	var files = readdirSync(path);
	if (exists(extension)) {
		files = files.filter(d => d.endsWith(extension));
	}

	return files;
}

function getFilesWithName(path, name, extension = null) {
	return getFiles(path, extension).filter(f => f.startsWith(name));
}

// return a boolean stating if the command was successfully deleted or not.
function deleteCommand(commandName) {
	try {
		if (!hasCommand(commandName))
			return false;

		const filePath = `${commandPath}${commandName}`;
		delete require.cache[require.resolve(filePath)];
		folf.commands.delete(commandName);

		return true;
	}
	catch(error) {
		console.log(error);
	}
}

function reloadCommand(commandName) {
	const commandFiles = getFilesWithName(commandPath, commandName, ".js");

	if (commandFiles.length > 1)
		throw new Error(`There are more than one existing files with the name: ${commandName}`);

	try {
			const filePath = `${commandPath}${commandName}`;

			deleteCommand(commandName);
			setCommand(filePath);

			return true;
	}
	catch(error) {
			console.log(error);
			return false;
	}
}

function setCommand(filePath) {
	const commandSource = require(filePath);

	if (!commandSource.info)
		throw new Error("The command source is missing an information export.");

	folf.commands.set(commandSource.info.name, commandSource);
	
	if (commandSource.info.aliases)
	    commandSource.info.aliases.forEach(a => folf.aliases.set(a, commandSource.info.name));
	
	console.log(`Found command: ${commandSource.info.name}`);
}

function setCommands() {
	const files = getFiles(commandPath, ".js");

	for (const file of files) {
		try {
		    //setCommand(`${commandPath}${file}`);
		    const commandSource = require(`${commandPath}${file}`);

		    if (!commandSource.info)
			throw new Error("The command source is missing an information export.");

		    folf.commands.set(commandSource.info.name, commandSource);
	
		    if (commandSource.info.aliases)
	  	        commandSource.info.aliases.forEach(a => folf.aliases.set(a, commandSource.info.name));
	
		    console.log(`Imported command: ${commandSource.info.name}`);
		}
		catch(error) {
			console.log(error);
			console.log(`Could not import command: ${file}`);
			continue;
		    //return false;
		}
	}
}

const utils = {
	escape: function(text) {
		const zeroWidthChar = String.fromCharCode(8203);

		if (text)
			return text
				.replace(/`/g, "`" + zeroWidthChar)
				.replace(/@/g, "@" + zeroWidthChar);
		else
			return text;
	},

	// HelloWorld
	toPascalCase: function(text) {
		if (text)
		{
			var result = text.charAt(0).toUpperCase();

			if (text.length > 1)
				result += text.slice(1);

			return result;
		}
	
		return text;
	},

	getRandNum: function(max, min = 0) {
		const inclusive = min == 0 ? 0 : 1;
		return Math.floor(Math.random() * (max - min + (inclusive * 1))) + (inclusive * 1);
	},

	createEmbed: function(title = "", description = "", url = "", imageUrl = "") {
		var embed = new MessageEmbed().setColor(embedColor);

		if (title)
			embed.setTitle(title);
		
		if (description)
			embed.setDescription(description);

		if (url)
			embed.setURL(url);

		if (imageUrl)
			embed.setImage(imageUrl);

		return embed;
	},

	setAuthor: function(embed, user = null) {
		user = user || folf.user;
		embed.setAuthor(user.username, user.avatarURL);
		
		return embed;
	},
	
	reloadCommand: function(commandName) {
		return reloadCommand(commandName);
	}
};

function getCommandNameFromAlias(commandAlias) {
	console.log("reading commands.");
	folf.commands.forEach(c => console.log(c.info ? c.info.name || "no name" : "empty" + '\n'));

	var commandMatch = folf.commands
	    .find(s => s.info ?
		  s.info.aliases ?
		  s.info.aliases.some(a => a == commandAlias)
		  || (s.info.name ? s.info.name == commandAlias : false)
		  : s.info.name ?
		  s.info.name == commandAlias
		  : false
		  : false);
	
	if (commandMatch)
	{
		console.log("found a matching command.");
		return commandMatch.info.name;
	}
	
	throw new Error("A command could not be matched.");
}

function hasCommand(commandName) {
	var command = folf.commands.get(commandName);
	if (!command)
		command = folf.commands.get(getCommandNameFromAlias(commandName));
	return command;
}

setCommands();

// when the bot is finished getting ready, do this:
folf.once('ready', async () => {
	console.log(`Connected to Discord as ${folf.user.tag} across ${folf.guilds.cache.size} servers.`);

	folf.user.setPresence({
		activity: {
			name: `with a very cute Folf | prefix: ${prefix}`,
			type: 'PLAYING'
		},
		status: 'online'
	});
});

// when a message is sent, do this:
folf.on('message', async message => {
	// Handle all of the possible parsing errors before moving forward
	if(message.author.bot || message.channel.type !== "text") // must be in guild
		return;

	if(!message.content.startsWith(folf.prefix))
  		return;

	var rawArgs = message.content.slice(folf.prefix.length);

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
	
	const command = folf.commands.get(commandName) || folf.commands.get(folf.aliases.get(commandName));

	if (config.debug)
		console.log(command ? command.info ? command.info.name : "null": "null" + ": Command results")

	//var command = folf.commands.get(commandName);
	//if (!command)
	//	command = folf.commands.get(getCommandNameFromAlias(commandName));
	
	if(command)
	{
		const ctx = new Context(folf, message, db, servers);
		ctx.rawArgs = rawArgs; // this is just all of the text as one string.
		ctx.args = args;
		ctx.utils = utils;

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

folf.login(config.token).catch(e => console.log(e));
