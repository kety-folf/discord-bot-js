module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, clean) => {
  const { RichEmbed } = require('discord.js');
  const db = require('quick.db')
  const coin = require ('coin-flipper');
  if(message.author.id !== "263443630767734784") return embedErr('Error', 'Bot owner only');
    db.add(`count.eval`,1)
    try {
        message.channel.startTyping();
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        let embed = new RichEmbed()//embed for eval command
    .setColor('#0099ff')
    .setTitle('eval')
    .addField('IN', code)
    .addField('OUT', evaled)
    message.channel.send(embed)
    message.channel.stopTyping();
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      message.channel.stopTyping();
    }
   
  };
  
 
  module.exports.help = {
    name: 'eval',
    description: 'evaluates code',
    usage: '<Code>',
    category: 'misc',
    accessableby: 'dev'
   // aliases: []
  };