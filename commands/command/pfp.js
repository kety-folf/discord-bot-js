module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    var user = message.mentions.users.first() ;
    if(!user){
        user = message.author
    }
     embedimg('', user, user.avatarURL);
return;
   
  };
  
 
  module.exports.help = {
    name: 'pfp',
    description: 'sends profile pic of user',
    usage: '<@user you want the pfp for or leave blank for you>',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };