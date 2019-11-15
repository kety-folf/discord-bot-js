module.exports.run = async (ctx) =>
{
    return ctx.sendEmbed(
      'code',
      'if you want to look at my code',
      'https://github.com/kety-folf/discord-bot-js'
    );
};
  
module.exports.info = {
  name: "code",
  description: "shows github code link",
  usage: "",
  category: "misc",
  accessableby: "members",
 aliases: ["github"]
};
