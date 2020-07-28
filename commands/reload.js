const Utils = require('../Utils');

module.exports.run = async (ctx) => {
    if(!ctx.args[0])
      return ctx.error('Error', 'Please provide a command to reload!');

    const commandName = ctx.args[0].trim().toLowerCase();

    if(!ctx.client.commands.get(commandName))
        return ctx.error('Error', 'That command doesn\'t exist. Try again.');

    if (Utils.reloadCommand(commandName))
        return ctx.sendEmbed('reload', `Successfully reloaded ${commandName}!`);
    else
        return ctx.error('Error', `Could not reload: \`${commandName}\``);
};

module.exports.info = {
  name: 'reload',
  description: 'reloads a command',
  usage: '',
  category: 'misc',
  accessableby: 'dev'
};
