const db = require('quick.db');
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

    if (message.author.id == ("263443630767734784")) {
			  
        var u		
        
     for(u in folf.users.array()){
        var User = folf.users.array()[u];
         db.set(`${User.id}.bal`, 400)
        console.log(User.username)
     }
     
     embedtxt('database', 'done adding users')
                
        }
  
  };
  
 
  module.exports.help = {
    name: 'setupdb',
    description: 'sets up db by looping users',
    usage: '',
    category: 'misc',
    accessableby: 'dev'
   // aliases: []
  };