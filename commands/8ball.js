const replies = require("../assets/8ball.json");

module.exports.run = async (ctx) => {
    const question = ctx.args.join(" ");

    if(!question)
      return ctx.error('error', 'no question given');

    return ctx.sendEmbed('8ball', replies[ctx.utils.getRandNum(replies.length)]);
};

module.exports.info = {
  name: '8ball',
  description: '8ball command',
  usage: '<question>',
  category: 'fun',
  accessableby: 'members'
};
