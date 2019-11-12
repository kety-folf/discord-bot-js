const db = require ('quick.db');
const coin =require('coin-flipper');
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg) => {
user = message.author
var bal = db.get(`${message.author.id}.bal`);
if(bal==null || bal==undefined){
  db.set(`${user.id}.bal`,400)
}
if(message.author.id !== "263443630767734784") db.add(`count.coinflip`,1)
if (bal < 5) embedErr('error', 'you dont have any money');
var win =  5*Math.floor(Math.random()*24)
var guess = arg.substring(8);


if (coin() == guess){
db.add(`user.bal`, win)
embedtxt("you won",`you won $${win}`)
}
 else{
   embedtxt('you lost', 'you lost $5')
 } 
  };
  
 
  module.exports.help = {
    name: 'coinflip',
    description: 'flip a coin for money cost $5',
    usage: '<heads/tails> must be in upper case to work',
    category: 'money',
    accessableby: 'members'
    //aliases: []
  };