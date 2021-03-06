module.exports.run = async (ctx) => {
  const user = ctx.message.mentions.users.first() || ctx.user;
  var account = ctx.getAccount(user.id);
  
  return ctx.sendEmbed('balance', `${user.username} \$${account.balance}`);
};

module.exports.info = {
  name: 'balance',
  description: 'shows bal of user',
  usage: '<@user you want the balance of or leave blank for you>',
  category: 'money',
  accessableby: 'members',
  aliases: ['bal']
};
