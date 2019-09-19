const { RichEmbed } = require('discord.js');
const  { stripIndents }  = require('common-tags');
const  { readdir }  = require('fs');
const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  db.add('count.help',1)
  const embed = new RichEmbed()
 
    .setColor()
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
    .setThumbnail(folf.user.displayAvatarURL);

  if (!args[0]) {
    message.channel.send({
      embed: {
          color: 3447003,
          author: {
              name: folf.user.username,
              icon_url: folf.user.avatarURL
          },
          title: "Bot prefix is ~",
          description: "Commands",
          fields: [{
              name: "Info",
              value: "Info About the Bot and server. this command sends lots of embeds about the system"
          },
          {
              name: "leave",
              value: "stops music and leaves VC"
            },
            {
              name: 'blep',
              value: 'I dont know what to put here'
            },
            {
             name: 'fursuit',
             value:'sends a picture of a fursuit'
            },
            {
             name: 'ping',
              value: 'sends bots ping'
          },
          {
    name: "search",
    value: "searches youtube"
  },
         
          {
              name: "code",
              value: "code for this bot"

          },
         {
              name: "play ",
             value: "plays music from youtube needs full url "
         },
          {
              name: "time",
              value: "gets time in mutiple timeZones"
          },
  {
    name: "r",
    value: "restarts the bot. (Kety_the_folf#0001 only)"
  },
  {
    name: "pfp",
    value: "gets the users profile pic"
  },
  {
    name: "fox",
    value: "gets a random image of a fox"
  },
  {
    name: "say",
    value: "says message following command"
  },
  {
    name: "boop",
    value: "boop a user"
  },
  {
    name: "yiff",
    value: "sends yiff to the chat (must be in NSFW channel)"
    
  },
  
  {
    name: 'bal or balance',
    value: 'see your balance' 
  },
  {
    name: 'slots',
    value: 'play some slots '
  },
  {
    name: 'coinFlip',
    value: 'flip a coin for some money cost $5' 
  },
  {
    name: 'dev commands',
    value: 'eval, restart, setupdb, reload'

  },
  {
    name: 'help',
    value: 'if you do help and a command name you can get more info on that command.'
  }



          ],
          timestamp: new Date(),
          footer: {
              icon_url: folf.user.avatarURL,
              text: "©Kety_the_folf#0001"
          }
      }
  });


  return;

    
  } else {
    embed.setDescription(` commands for ${folf.user.tag}\nThe folf prefix is: **${folf.prefix}**`);
    embed.setFooter(`${folf.user.username} | Total Commands: ${folf.commands.size}`, folf.user.displayAvatarURL);

    let command = folf.commands.get(folf.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
    if(!command) return message.channel.send(embed.setTitle('Invalid Command.').setDescription(`Do \`${folf.prefix}help\` for a list of the commands.`));
    command = command.help;
    embed.setDescription(stripIndents`The bot prefix is: \`${folf.prefix}\`\n
    ❯ Command: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
    ❯ Description: ${command.description || 'No Description'}
    ❯ Usage: ${command.usage ? `\`${folf.prefix}${command.name} ${command.usage}\`` : 'No Usage'}
    ❯ Accessable by: ${command.accessableby || 'Members'}
    ❯ Aliases: ${command.aliases ? command.aliases.join(', ') : 'None'}`);

    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: 'help',
  description: 'Displays all commands that the bot has.',
  usage: '<command Name>',
  category: 'miscellaneous',
  accessableby: 'Members',
  aliases: ['h', 'hlp', 'commands']
};