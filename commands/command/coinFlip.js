const db = require ('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {
user = message.author
var bal = db.get(`${message.author.id}.bal`);
if(bal==null || bal==undefined){
  db.set(`${user.id}.bal`,400)
}
if(message.author.id !== "263443630767734784") db.add(`count.coinflip`,1)
if (bal < 5) embedErr('error', 'you dont have any money');
var win1 =  5*Math.floor(Math.random()*20)
var flip = arg.substring(8);
db.subtract(`${message.author.id}.bal`, 5)
flipvalue = Math.floor(Math.random()*3);
if (!flip == 'heads' || !flip =='tails') return embedtxt('error', 'you must pick heads or tails');
if (flip === ' heads' && flipvalue === 0){
    db.add(`${message.author.id}.bal`, win1);
    embedtxt('heads',`you won ${win1}`);
}
embedtxt("debug ", `this is a debug message because this command is broken flipvalue = ${flipvalue}`)
if (flip === ' heads' && flipvalue === 1){
embedtxt('tails ', 'you lost')	;
}
if (flip == ' tails' && flipvalue === 1){
db.add(`${message.author.id}.bal`, win1);
    embedtxt(' tails',`you won ${win1}`);
}
if (flip === ' tails' && flipvalue === 0){
embedtxt('heads ', 'you lost');
}
if (flip === 'edge' && flipvalue === 3 ){
  embedtxt('edge', `you won ${win1}`)
}
if (flip === ' tails' && flipvalue === 3){
  embedtxt('it landed on its edge ', 'you lost');
  }
  if (flip === ' edge' && flipvalue === 0){
    embedtxt('heads ', 'you lost');
    }
    if (flip === ' edge' && flipvalue === 2){
      embedtxt(' tails', 'you lost');
      }
      if (flip === ' tails' && flipvalue === 3){
        embedtxt('it landed on its edge ', 'you lost');
        }
  
  };
  
 
  module.exports.help = {
    name: 'coinflip',
    description: 'flip a coin for money cost $5',
    usage: '<heads/tails/egde>',
    category: 'money',
    accessableby: 'members'
    //aliases: []
  };