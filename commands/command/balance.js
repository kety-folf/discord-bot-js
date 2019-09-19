const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    var user = message.mentions.users.first()
    if(message.author.id !== "263443630767734784") db.add(`count.bal`,1)
    if(!user) {
        user = message.author
    }
    
   var bal = db.get(`${user.id}.bal`);
   if(bal==null || bal==undefined){
    db.set(`${user.id}.bal`,400)
  }
    embedtxt('balance',`${user} $${bal}`);
   
  
  };
  
 
  module.exports.help = {
    name: 'balance',
    description: 'shows bal of user',
    usage: '<@user you want the balance of or leave blank for you>',
    category: 'money',
    accessableby: 'members',
   aliases: ['bal']
  };