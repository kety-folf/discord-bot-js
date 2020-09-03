const FurryBotAPI = require("furrybotapi");
const config = require("../config.json");

const fb = new FurryBotAPI({
    userAgent: "Kety Folf's Bot / 2.0.1",
    apiKey: config.fur_APIkey
});
module.exports.run = async (ctx) =>
{
    
    fb.furry.fursuit("json", 1).then(res => ctx.sendEmbed("fursuit", "", "", res.url));
};
      
module.exports.info = {
  name: 'fursuit',
  description: 'sends a picture of a fursuit',
  usage: '',
  category: 'fun',
  accessableby: 'members'
 // aliases: []
};
