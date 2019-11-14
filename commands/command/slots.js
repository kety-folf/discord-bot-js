const db = require ('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt, arg)=> {
	if(message.author.id !== "263443630767734784") db.add('count.slots',1)
    var bet = arg.substring(5);
	var win = bet*Math.floor(Math.random()* (10 - 2 + 1)) + 1
	var bal = db.get(`${message.author.id}.bal`)
	if(bal==null || bal==undefined){
		db.set(`${message.author.id}.bal`,400)
	  }
	if(isNaN(bet)) return embedErr('Error', `${bet} is not a number, are you trying to brake something.`)
	if(bet < 0) return embedErr('ERROR', 'Stop Trying To Get Unlimited Money. yes i know you would try to do this')
	if (bet > bal) return embedErr('error', `bet ${bet} > bal ${bal}`);
	db.subtract(`${message.author.id}.bal`, bet)
	var num1 = Math.floor(Math.random()*5)
	var num2 = Math.floor(Math.random()*5)
	var num3 = Math.floor(Math.random()*5)
	embedtxt('slots', `${num1}|${num2}|${num3}`)
	if (num1 == num2 && num2 == num3 && num1 == num3){
		db.add(`${message.author.id}.bal`, win)
		embedtxt('slots', `you won ${win}`)
	} 
  
  };
  
 
  module.exports.help = {
    name: 'slots',
    description: 'play some slots',
    usage: ' <bet>',
    category: 'money',
    accessableby: 'members'
    //aliases: []
  };