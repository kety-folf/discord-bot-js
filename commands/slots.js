const casino = require("../services/slotService.js");

module.exports.run = async (ctx) => {
	if (ctx.args.length < 1) // 1 = required arg count
		return ctx.error("error", "wheres the money, pal? all i see is NULL");
	
	const bet = ctx.args[0];
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

	const reward = bet * ctx.utils.getRandNum(10, 2);

	account.take(bet);
	
	var slots = casino.getSlots(ctx.utils, 3, 5);
	const won = slots.every(s => s == s[0]);

	var slotDisplay = slots.join("|");

	if (won)
	{
		slotDisplay = `you won ${reward}`;
		account.give(reward);
	}

	account.sync();
	return ctx.sendEmbed('slots', slotDisplay);
};

// IDEA: create args in info, to determine if the correct amount of arguments were sent?
module.exports.info = {
  name: 'slots',
  description: 'play some slots',
  usage: ' <bet>',
  category: 'money',
  accessableby: 'members'
};
