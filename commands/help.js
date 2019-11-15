const  { stripIndents }  = require('common-tags'); // not sure what this does.

module.exports.run = async (ctx) =>
{
  const prefix = ctx.folf.prefix;

  let embed = ctx.utils.createEmbed(`Bot prefix is ${prefix}`, "Commands")
    .setAuthor(`${ctx.guild.me.displayName} Help`, ctx.guild.iconURL)
    .setThumbnail(ctx.folf.user.displayAvatarURL);

  if (!ctx.args[0])
  {
      ctx.utils.setAuthor(embed, ctx.folf.user);

      ctx.folf.commands.forEach(c =>
        {
          if (c.info)
          {
              embed.addField(c.info.name, c.info.description || 'No Description')
          }
        });

      embed.setTimestamp(new Date());
      embed.setFooter("©Kety_the_folf#0001", ctx.folf.user.avatarURL);
      return ctx.channel.send(embed);
  }
  else
  {
    const commandName = ctx.args[0].toLowerCase();
    // commands for ${ctx.folf.user.tag}
    embed.setFooter(`${ctx.folf.user.username} | Total Commands: ${ctx.folf.commands.size}`, ctx.folf.user.avatarURL);

    let command = ctx.folf.commands.get(ctx.folf.aliases.get(commandName) || commandName);
    
    if(!command)
        return ctx.error('Invalid Command.', `Do ${prefix}help for a list of the commands.`);
    
    command = command.info;

    embed.setDescription(stripIndents`
    ❯ Command: ${ctx.utils.toPascalCase(command.name)}
    ❯ Description: ${command.description || 'No Description'}
    ❯ Usage: ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : 'No Usage'}
    ❯ Accessable by: ${command.accessableby || 'Members'}
    ❯ Aliases: ${command.aliases ? command.aliases.join(', ') : 'None'}`);

    return ctx.channel.send(embed);
  }
};

// command.run(ctx, (possible class that stores the corresponding command arguments in a collection?)
// args: [ { name: "commandName", pos: 0, optional: "false" ]
module.exports.info = {
  name: 'help',
  description: 'Displays all commands that the bot has.',
  usage: '<command Name>',
  category: 'miscellaneous',
  accessableby: 'Members',
  aliases: ['h', 'hlp', 'commands']
};
