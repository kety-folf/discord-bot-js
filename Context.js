const Utils = require('./Utils');
const Server = require('./Server');
const Account = require('./Account');
const { DefaultBalance, EmbedColors } = require('./Constants');
const db = require("quick.db");

/**
 * Represents a generic command context.
 */
class Context {
	constructor(client, message, db, servers) {
		this.client = client;
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
		this.servers = servers ? servers : [];
	}

    /**
     * Attempts to get a user's account from their specified ID.
     * @param {string} userId The ID of the user.
     */
	getAccount(userId) {
		const balanceId = `${userId}.bal`;
		var balance = db.get(balanceId);

		if (balance == null || balance == undefined)
			db.set(balanceId, DefaultBalance);

		balance = db.get(balanceId);

		return new Account(userId, balance);
	}

    /**
     * Attempts to get or add a guild's account with their specified ID.
     * @param {string} guildId 
     */
	getOrAddServer(guildId) {
		if (this.servers.some(g => g.serverId == guildId))
			return this.servers.find(g => g.serverId == guildId);

		var server = new Server(guildId);
		this.servers.push(server);
		return server;
	}

    /**
     * Attempts to save or add a guild's account with their specified ID.
     * @param {string} guildId 
     */
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

    /**
     * Sends an embed preset to the channel specified in this context.
     * @param {string} title The title of this embed.
     * @param {string} description The description of this embed.
     * @param {string} url The title URL of this embed.
     * @param {string} imageUrl The image URL of this embed.
     */
	sendEmbed(title, description = "", url = "", imageUrl = "") {
		return this.channel.send(Utils.createEmbed(title, description, url, imageUrl))
	}

    /**
     * Sends a message to the channel specified in this context.
     * @param {string} text The text to send.
     * @param {MessageEmbed} embed The embed to send. Can be left empty.
     */
	reply(text, embed = null) {
		return this.channel.send(text, embed);
	}

    /**
     * Sends an error preset to the channel specified in this context.
     * @param {string} title The title for this error.
     * @param {string} reason The reason that this error occurred.
     */
	error(title = "", reason = "") {
		title = title || "An error has occured.";
		var embed = Utils.createEmbed(title, reason);
		embed.setColor(config.errorColor || EmbedColors.Error);
		return this.channel.send(embed);
	}	
}

module.exports = Context;
