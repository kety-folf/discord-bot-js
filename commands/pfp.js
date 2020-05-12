module.exports.run = async (ctx) => {
     const user = ctx.message.mentions.users.first() || ctx.user;
     return ctx.sendEmbed("", user, "", user.avatarURL());
};
  
module.exports.info = {
  name: 'pfp',
  description: 'sends profile pic of user mentioned',
  usage: '<@user you want the pfp for or leave blank for you>',
  category: 'misc',
  accessableby: 'members',
  aliases: [ "avatar" ]
};
