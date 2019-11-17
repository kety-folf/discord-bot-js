module.exports.run = async (ctx) => {
    const question = ctx.args.join(" ");

    if(!question)
      return ctx.error('error', 'no question given');

    return ctx.sendEmbed('8ball', require("../assets/8ball.json")[ctx.utils.getRandNum(replies.length)]);
};

module.exports.info = {
  name: '8ball',
  description: '8ball command',
  usage: '<question>',
  category: 'fun',
  accessableby: 'members'
};
