module.exports.run = async (ctx) =>
{
    let question = ctx.message.content.slice(ctx.folf.prefix.length).trim().substring(5);

    if(!question)
      return ctx.error('error', 'no question given');

    var replies =
    [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes, definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Signs point to yes",
      "Yes",
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
      "Don't bet on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful"
    ];

    return ctx.sendEmbed('8ball', replies[ctx.utils.getRandNum(replies.length)]);
};

module.exports.info = {
  name: '8ball',
  description: '8ball command',
  usage: '<question>',
  category: 'fun',
  accessableby: 'members'
 // aliases: []
};