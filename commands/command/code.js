module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

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