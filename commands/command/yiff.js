const FurryBotAPI = require("furrybotapi");
 const db = require('quick.db')
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.yiff', 1)
  let type = message.content.substring(5).trim(' ')
 
   if (!type) {
     type = 'straight';
  }
    if (message.channel.nsfw){
		
      fb.apiRequest("furry", false, `yiff/${type}`, false).then(res => embedimg('yiff',`${type} yiff`,res.imageURL));
	
}
else{
	embedErr('Error', 'not nsfw channel')
}
  };
  
 
  module.exports.help = {
    name: 'yiff',
    description: 'sends yiff to the channel defalts to straight  ',
    usage: '[gay | straight]',
    category: 'NSFW',
    accessableby: 'members',
    aliases: []
  };