//const coin = require ('coin-flipper');
module.exports.run = async (ctx) =>
{
    var flip = Math.round(Math.random() * 1) == 1 ? 'heads' : 'tails';
    var bet = 5;
    var account = ctx.getAccount(ctx.user.id);

    var guess = args[0];

    if (!guess || guess.toLowerCase() != "heads" || guess.toLowerCase() != "tails")
      return ctx.error('error', 'heads... or tails? you cant just be typing iajgejuhbjmfrt');

    if (account.balance < bet)
      return ctx.error('error', 'you dont have any money');

    var reward =  bet * ctx.utils.getRandNum(24, 2);

    account.take(bet);
    var flipTitle = `the coin landed on ${flip}`;
    var flipResult = "you lost $5";

    if (flip.toLowerCase() == guess)
    {
        account.give(reward);
        flipResult = `you won \$${reward}`;
    }

    account.sync();
    return ctx.sendEmbed(flipTitle, flipResult);
};
  
module.exports.info = {
  name: 'coinflip',
  description: 'flip a coin for money cost $5',
  usage: '<heads/tails> must be in upper case to work',
  category: 'money',
  accessableby: 'members'
  //aliases: []
};
