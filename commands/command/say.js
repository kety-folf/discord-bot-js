const db = require('quick.db');
module.exports.run = async (fol, message, args, embedErr,embedimg,embedlink,embedtxt,arg) => {
  if(message.author.id !== "263443630767734784") db.add('count.say',1);
  var string = arg.substring(3);
  message.channel.send(string);
return;
   
  };
  
 
  module.exports.help = {
    name: 'say',
    description: 'says a message',
    usage: '<string of text>',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };