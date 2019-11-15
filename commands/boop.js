module.exports.run = async (ctx) => {
    // Might want to move this elsewhere, or have a consistent source location.
    const boopImageUrl = "https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg";
    
    const user = ctx.user;
    const user1 = ctx.message.mentions.users.first();
    const user2 = ctx.message.mentions.users.last();
    
    var boopReply = `${user} has booped `;
  
    if (!user1 || (user == user1 && user1 == user2))
        boopReply += "them self";
    else if (user1 != user2 && user1 != user && user2 != user)
        boopReply += `${user1} and ${user2}`;
    else
        boopReply += `${user1}`;

    return ctx.sendEmbed("boop", boopReply, "", boopImageUrl);
};
  
module.exports.info = {
    name: "boop",
    description: "boop a user",
    usage: "@user or @user @user2",
    category: "fun",
    accessableby: "members"
};
