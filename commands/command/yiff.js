const FurryBotAPI = require("furrybotapi");
 
const fb = new FurryBotAPI("kety-folf's-bot/2.0.3");

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  
   
    if (message.channel.nsfw){
      fb.apiRequest("furry", false, "yiff/gay", false).then(res => embedimg('yiff','',res.imageURL));
	
}
else{
	embedErr('Error', 'not nsfw channel')
}
  };
  
 
  module.exports.help = {
    name: 'yiff',
    description: 'sends yiff to the channel',
    usage: '',
    category: 'NSFW',
    accessableby: 'members',
    aliases: []
  };