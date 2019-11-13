const { readdirSync } = require('fs'); 
const { join } = require('path');

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    if(!message.author.id =="263443630767734784") embedErr('Error','You\'re not the bot the owner!');

    if(!args[0]) return embedErr('Error','Please provide a command to reload!');
    const commandName = args[0].toLowerCase();
    if(!folf.commands.get(commandName)) return embedErr('Error','That command doesn\'t exist. Try again.');
    readdirSync(join(__dirname, '..')).forEach(f => {
      const files = readdirSync(join(__dirname,'..',f));
      if(files.includes(commandName + '.js')) {
        try {
          delete require.cache[require.resolve(`../${f}/${commandName}.js`)];
          folf.commands.delete(commandName);
          const pull = require(`../${f}/${commandName}.js`);
          folf.commands.set(commandName, pull);
          return embedtxt('reload',`Successfully reloaded ${commandName}.js!`);
        } catch(e) {
          return embedErr('Error',`Could not reload: \`${args[0].toUpperCase()}\``);
        }
      }
    });
    
  
  };
  
 
  module.exports.help = {
    name: 'reload',
    description: 'reloads a command',
    usage: '',
    category: 'misc',
    accessableby: 'dev'
   // aliases: []
  };