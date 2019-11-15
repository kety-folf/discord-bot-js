module.exports.run = async (ctx) =>
{
	if (ctx.args.length < 1) // 1 = required arg count
		return ctx.error("error", "wheres the money, pal? all i see is NULL");
	
	var bet = ctx.args[0];
	var account = ctx.getAccount(ctx.user.id);
		
	if(isNaN(bet))
		return ctx.error("Error",
			`${bet} is not a number, are you trying to brake something.`);

	if(bet < 0)
		return ctx.error("ERROR",
			"Stop Trying To Get Unlimited Money. yes i know you would try to do this");
	
	if (bet > account.balance)
		return ctx.error("error",
			`bet ${bet} > bal ${account.balance}`);

	var reward = bet * ctx.utils.getRandNum(10, 2);

	account.take(bet);
	
	var slots = [];
	var i;
	for(i = 0; i < 3; i++) // might want to tweak win%
	{
		slots[i] = ctx.utils.getRandNum(5);
	}

	var won = slots.every(s => s == s[0]);

	var slotDisplay = slots.join("|");

	if (won)
	{
		slotDisplay = `you won ${reward}`;
	}

	ctx.sendEmbed('slots', slotDisplay);

	if (num1 == num2 && num2 == num3)
	{
		account.give(reward);
	}

	account.sync();
};

// IDEA: create args in info, to determine if the correct amount of arguments were sent?
module.exports.info = {
  name: 'slots',
  description: 'play some slots',
  usage: ' <bet>',
  category: 'money',
  accessableby: 'members'
};
