const db = require('quick.db');

module.exports.run = async (ctx) =>
{
     for(var user in ctx.folf.users.array())
     {
         db.set(`${user.id}.bal`, 400); // change build location
         console.log(user.username)
     }
     
     return ctx.sendEmbed('database', 'done adding users');
};
 
module.exports.info = {
   name: 'setupdb',
   description: 'sets up db by looping users',
   usage: '',
   category: 'misc',
   accessableby: 'dev'
   // aliases: []
};