module.exports.run = async (ctx) =>
{
    var user = ctx.message.mentions.users.first();
    if(!user)
    {
        user = ctx.user;
    }

     return ctx.sendEmbed('', user, '', user.avatarURL);
};
  
module.exports.info = {
  name: 'pfp',
  description: 'sends profile pic of user mentioned',
  usage: '<@user you want the pfp for or leave blank for you>',
  category: 'misc',
  accessableby: 'members'
 // aliases: []
};