const FurryBotAPI = require("furrybotapi");
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");

module.exports.run = async (ctx) =>
{
    fb.apiRequest("furry", true, `fursuit`, false)
        .then(result => ctx.sendEmbed('fursuit',"", "", result.imageURL.replace(/\s/g, "20")));
};
      
module.exports.info = {
  name: 'fursuit',
  description: 'sends a picture of a fursuit',
  usage: '',
  category: 'fun',
  accessableby: 'members'
 // aliases: []
};