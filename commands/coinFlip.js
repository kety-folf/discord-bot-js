module.exports.run = async (ctx) => {
    const flip = Math.round(Math.random() * 1) == 1 ? "heads" : "tails";
    const bet = 5;
    
    if (!ctx.args[0])
        return ctx.error("error", "sorry you need to speak up there bucko");
    
    const guess = ctx.args[0].toLowerCase();

    function ensure(side)
    {
        if (side == "heads")
            return true;
        //if (side == "h")
        //    return true;
        if (side == "tails")
            return true;
        //if (side == "t")
        //    return true;
        
        return false;
    }
    
    if (!ensure(guess))
        return ctx.error("error", "heads... or tails? you cant just be typing iajgejuhbjmfrt");
    
    var account = ctx.getAccount(ctx.user.id);
    
    if (account.balance < bet)
        return ctx.error("error", "you dont have any money");

    const reward =  bet * ctx.utils.getRandNum(24, 2);
    
    const flipTitle = `the coin landed on ${flip}`;
    var flipResult = `you lost \$${bet}`;
    
    if (flip == guess) {
        account.give(reward);
        flipResult = `you won \$${reward}`;
    }
    else
        account.take(bet);
    
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
