const FurryBotAPI = require("furrybotapi");
const db = require('quick.db');
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {
  if(message.author.id !== "263443630767734784") db.add('count.furry',1);
  let fur = arg.substring(6).trim(' ');
  if(!fur){
      const furType = ["boop", "cuddle", "flop", "hold", "howl", "hug"];
    let  rand = Math.random();
    let len = furType.length;
    let randIndex = Math.floor(rand * len);
    fur = furType[randIndex];
  }
    fb.apiRequest("furry", true, `${fur}`, false).then(res => embedimg(`${fur}`,``,res.imageURL));
      
      };
      
     
      module.exports.help = {
        name: 'furry',
        description: 'furry images',
        usage: '[boop | cuddle | flop | hold | howl | hug]',
        category: 'fun',
        accessableby: 'members',
        aliases: ["fur"]
      };