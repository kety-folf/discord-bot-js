const FurryBotAPI = require("furrybotapi");
 
const fb = new FurryBotAPI("kety-folf's-bot/ pre-1.10.9");

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

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