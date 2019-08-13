module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

    embedimg('Fox', 'Powered by randomfox.ca', `https://randomfox.ca/images/${Math.floor(Math.random()*123)}.jpg`);
  
  };
  
 
  module.exports.help = {
    name: 'fox',
    description: 'random fox command',
    usage: '',
    category: 'fun',
    accessableby: 'members'
   // aliases: []
  };