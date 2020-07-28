/**
 * Represents a generic guild account.
 */
class Server {
	constructor(serverId)
	{
		this.serverId = serverId;
		this.queueClient = null;
	}
}

module.exports = Server;