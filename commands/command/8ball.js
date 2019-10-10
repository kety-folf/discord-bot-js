module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {
    const db = require('quick.db')
    db.add('count.8ball',1)
    let question = arg.substring(6).trim(' ');
    if(!question) return embedErr('error', 'no question given');
    var stuff = [ "It is certain", "It is decidedly so", "Without a doubt",
    "Yes, definitely", "You may rely on it", "As I see it, yes",
    "Most likely", "Outlook good", "Signs point to yes", "Yes",
    "Reply hazy, try again", "Ask again later",
    "Better not tell you now", "Cannot predict now",
    "Concentrate and ask again", "Don't bet on it",
    "My reply is no", "My sources say no", "Outlook not so good",
    "Very doubtful"];

 
      embedtxt('8ball', stuff[Math.floor(Math.random()*stuff.length)])
      };
      
     
      module.exports.help = {
        name: '8ball',
        description: '8ball command',
        usage: '<question>',
        category: 'fun',
        accessableby: 'members'
       // aliases: []
      };