const FurryBotAPI = require("furrybotapi");
 
const fb = new FurryBotAPI("kety-folf's-bot/ pre-1.10.9");

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  let type = message.content.substring(5).trim(' ')
 
   if (!type) {
     type = 'gay'
  }
    if (message.channel.nsfw){
      fb.apiRequest("furry", false, `yiff/${type}`, false).then(res => embedimg('yiff','',res.imageURL));
	
}
else{
	embedErr('Error', 'not nsfw channel')
}
  };
  
 
  module.exports.help = {
    name: 'yiff',
    description: 'sends yiff to the channel ',
    usage: '[gay | straight | dickgirl | lesbian]',
    category: 'NSFW',
    accessableby: 'members',
    aliases: []
  };