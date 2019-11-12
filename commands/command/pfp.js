const db = require('quick.db');
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
  if(message.author.id !== "263443630767734784") db.add('count.pfp',1);
    var user = message.mentions.users.first() ;
    if(!user){
        user = message.author
    }
     embedimg('', user, user.avatarURL);
return;
   
  };
  
 
  module.exports.help = {
    name: 'pfp',
    description: 'sends profile pic of user mentioned',
    usage: '<@user you want the pfp for or leave blank for you>',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };