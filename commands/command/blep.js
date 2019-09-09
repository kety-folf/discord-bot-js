const FurryBotAPI = require("furrybotapi");
const db = require('quick.db');
const fb = new FurryBotAPI("kety-folf's-bot/ pre-1.10.9");
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.belp',1);

    fb.apiRequest("animals", true, `blep`, false).then(res => embedimg('blep',``,res.imageURL));
      
      };
      
     
      module.exports.help = {
        name: 'blep',
        description: 'I dont know what to put here',
        usage: '',
        category: 'fun',
        accessableby: 'members'
       // aliases: []
      };