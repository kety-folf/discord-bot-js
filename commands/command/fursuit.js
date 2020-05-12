const FurryBotAPI = require("furrybotapi");
const db = require('quick.db');
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.fursuit',1);

    fb.apiRequest("furry", true, `fursuit`, false).then(res => embedimg('fursuit',``,res.imageURL.replace(/\s/g, "20")));

      };
      
     
      module.exports.help = {
        name: 'fursuit',
        description: 'sends a picture of a fursuit',
        usage: '',
        category: 'fun',
        accessableby: 'members'
       // aliases: []
      };