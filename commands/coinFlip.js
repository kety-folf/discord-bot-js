module.exports.run = async (ctx) => {
    const flip = Math.round(Math.random() * 1) == 1 ? "heads" : "tails";
    const bet = 5;
    const guess = ctx.args[0];
    
    if (!guess)
        return ctx.error("error", "sorry you need to speak up there bucko");
    
    if (guess.toLowerCase() != "heads" || guess.toLowerCase() != "tails")
        return ctx.error("error", "heads... or tails? you cant just be typing iajgejuhbjmfrt");
    
    var account = ctx.getAccount(ctx.user.id);
    
    if (account.balance < bet)
        return ctx.error("error", "you dont have any money");

    const reward =  bet * ctx.utils.getRandNum(24, 2);
    account.take(bet);
    
    const flipTitle = `the coin landed on ${flip}`;
    var flipResult = `you lost \$${bet}`;
    
    if (flip.toLowerCase() == guess) {
        account.give(reward);
        flipResult = `you won \$${reward}`;
    }
    
    account.sync();
    return ctx.sendEmbed(flipTitle, flipResult);
};

module.exports.info = {
    name: "coinflip",
    description: "flip a coin for money cost $5",
    usage: "<heads/tails>",
    category: "money",
    accessableby: "members"
};
