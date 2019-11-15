const FurryBotAPI = require("furrybotapi");
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");

module.exports.run = async (ctx) =>
{
  let fur = ctx.message.content.substring(6).trim(' ');

  if(!fur)
  {
      const furType = ["boop", "cuddle", "flop", "hold", "howl", "hug"];
      let len = furType.length;
      fur = furType[ctx.utils.getRandNum(len)];
  }

  fb.apiRequest("furry", true, fur, false)
      .then(result => ctx.sendEmbed(fur, "", "", result.imageURL));  
};
      
module.exports.info = {
  name: 'furry',
  description: 'furry images',
  usage: '[boop | cuddle | flop | hold | howl | hug]',
  category: 'fun',
  accessableby: 'members',
  aliases: ["fur"]
};
