const FurryBotAPI = require("furrybotapi");
 
const fb = new FurryBotAPI("kety-folf's-bot/ pre-1.10.9");

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

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