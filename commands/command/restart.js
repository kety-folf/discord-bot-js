module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    if (message.author.id == ("263443630767734784")) {
        folf.user.setActivity(`RESTARTING`);
      
       process.exit();
    }
    else {
        embedErr("Error", "you dont have perms to run this command ")
        return;
    }
    
  };
  
 
  module.exports.help = {
    name: 'restart',
    description: 'restarts the bot',
    usage: '',
    category: 'misc',
    accessableby: 'dev',
   aliases: ["r", "reboot","reload"]
  };