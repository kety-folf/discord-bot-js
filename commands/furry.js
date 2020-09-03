const FurryBotAPI = require("furrybotapi");
const config = require("../config.json");

const fb = new FurryBotAPI({
    userAgent: "Kety Folf's Bot / 2.0.1",
    apiKey: config.fur_APIkey
});
module.exports.run = async (ctx) =>
{
  let fur = ctx.message.content.substring(6).trim(' ');

  if(!fur)
  {
      const furType = ["boop", "cuddle", "flop", "hold", "howl", "hug"];
      let len = furType.length;
      fur = furType[ctx.utils.getRandNum(len)];
  }

    fb.furry[fur]("json", 1).then(res => ctx.sendEmbed(fur, "", "", res.url));
};
      
module.exports.info = {
  name: 'furry',
  description: 'furry images',
  usage: '[boop | cuddle | flop | hold | howl | hug]',
  category: 'fun',
  accessableby: 'members',
  aliases: ["fur"]
};
