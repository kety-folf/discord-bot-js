module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    if(message.author.id !== "263443630767734784") return embedErr('Error', 'Bot owner only');
    try {
        message.channel.startTyping();
      const code = arg.substring(4).trim(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        let embed = new Discord.RichEmbed()//embed for eval command
    .setColor('#0099ff')
    .setTitle('eval')
    .addField('IN', clean(code))
    .addField('OUT', clean(evaled))
    message.channel.send(embed)
    message.channel.stopTyping();
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
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