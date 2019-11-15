module.exports.run = async (ctx) => {
    if(!ctx.args[0])
      return ctx.error('Error', 'Please provide a command to reload!');

    const commandName = ctx.args[0].trim().toLowerCase();

    if(!ctx.folf.commands.get(commandName))
        return ctx.error('Error', 'That command doesn\'t exist. Try again.');

    if (ctx.utils.reloadCommand(commandName))
        return ctx.sendEmbed('reload', `Successfully reloaded ${commandName}.js!`);
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
