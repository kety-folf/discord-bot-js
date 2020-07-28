const { readdirSync } = require('fs');
const config = require('./config.json');
const COMMAND_PATH = config.commandPath || './commands/';
const Utils = require('./Utils');

/**
 * Represents a static helper class dedicated to loading command files.
 */
class CommandLoader {
    constructor() {
        throw new Error('This class cannot be initialized.');
    }

    static getFiles(path, extension = null) {
    	var files = readdirSync(path);
    	if (Utils.exists(extension)) {
    		files = files.filter(d => d.endsWith(extension));
    	}

    	return files;
    }

    static getFilesWithName(path, name, extension = null) {
    	return getFiles(path, extension).filter(f => f.startsWith(name));
    }

    // return a boolean stating if the command was successfully deleted or not.
    static deleteCommand(commandName) {
    	try {
    		if (!hasCommand(commandName))
    			return false;

    		const filePath = `${COMMAND_PATH}${commandName}`;
    		delete require.cache[require.resolve(filePath)];
    		client.commands.delete(commandName);

    		return true;
    	}
    	catch(error) {
    		console.log(error);
    	}
    }

    static  reloadCommand(commandName) {
    	const commandFiles = getFilesWithName(COMMAND_PATH, commandName, ".js");

    	if (commandFiles.length > 1)
    		throw new Error(`There are more than one existing files with the name: ${commandName}`);

    	try {
    			const filePath = `${COMMAND_PATH}${commandName}`;

    			deleteCommand(commandName);
    			setCommand(filePath);

    			return true;
    	}
    	catch(error) {
    			console.log(error);
    			return false;
    	}
    }

    static setCommand(client, filePath) {
    	const commandSource = require(filePath);

    	if (!commandSource.info)
    		throw new Error("The command source is missing an information export.");

    	client.commands.set(commandSource.info.name, commandSource);
    
    	if (commandSource.info.aliases)
    	    commandSource.info.aliases.forEach(a => client.aliases.set(a, commandSource.info.name));
    
    	console.log(`Found command: ${commandSource.info.name}`);
    }

    static setCommands(client) {
    	const files = this.getFiles(COMMAND_PATH, ".js");

    	for (const file of files) {
    		try {
    		    //setCommand(`${commandPath}${file}`);
    		    const commandSource = require(`${COMMAND_PATH}${file}`);

    		    if (!commandSource.info)
    			throw new Error("The command source is missing an information export.");

    		    client.commands.set(commandSource.info.name, commandSource);
            
    		    if (commandSource.info.aliases)
    	  	        commandSource.info.aliases.forEach(a => client.aliases.set(a, commandSource.info.name));
            
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

    static getCommandNameFromAlias(client, commandAlias) {
    	console.log("reading commands.");
    	client.commands.forEach(c => console.log(c.info ? c.info.name || "no name" : "empty" + '\n'));

    	var commandMatch = client.commands
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

    static hasCommand(client, commandName) {
    	var command = client.commands.get(commandName);
    	if (!command)
    		command = client.commands.get(getCommandNameFromAlias(commandName));
    	return command;
    }
}

module.exports = CommandLoader;