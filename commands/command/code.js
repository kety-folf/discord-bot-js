module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
 const db = require('quick.db')
  if(message.author.id !== "263443630767734784") db.add(`count.code`,1)
    embedlink('code', 'if you want to look at my code','https://github.com/kety-folf/discord-bot-js' );
  
  };
  
 
  module.exports.help = {
    name: 'code',
    description: 'shows github code link',
    usage: '',
    category: 'misc',
    accessableby: 'members',
   aliases: ["github"]
  };