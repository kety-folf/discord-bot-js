module.exports.run = async (ctx) => {
     
     // This doesn't seem good, as it creates accounts for users that never interact.
     // My suggestion would be to remove this command as a whole, and just stick with ctx.getAccount(user.Id);
     for(const user in ctx.folf.users.array()) {
         ctx.getAccount(user.Id);
         console.log(user.username);
     }
     
     return ctx.sendEmbed('database', 'done adding users');
};
 
module.exports.info = {
   name: 'setupdb',
   description: 'sets up db by looping users',
   usage: '',
   category: 'misc',
   accessableby: 'dev'
};
