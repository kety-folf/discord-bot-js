module.exports.run = async (ctx) =>
{
  const boopImageUrl = "https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg";

  var user1 = ctx.message.mentions.users.first();
  var user2 = ctx.message.mentions.users.last();

  if (!user1)
    return ctx.error('Error', "@ a user you want to boop");

  var user = ctx.user;

  var boopReply = `${user} has booped them self`;

  if (user1 != user2 && user1 != user && user2 != user)
  { 
      boopReply = `${user} has booped ${user1} and ${user2}`;
  }
  else
  {
      boopReply = ` ${user} has booped ${user1}`;
  }

  return ctx.sendEmbed('boop', boopReply, null, boopImageUrl);
};
  
  module.exports.info = {
    name: 'boop',
    description: 'boop a user',
    usage: '@user or @user @user2',
    category: 'fun',
    accessableby: 'members'
    //aliases: []
  };