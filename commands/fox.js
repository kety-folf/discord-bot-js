module.exports.run = async (ctx) =>
{
  return ctx.sendEmbed('Fox',
      'Powered by randomfox.ca',
      `https://randomfox.ca/images/${ctx.utils.getRandNum(123)}.jpg`);  
};
  
module.exports.info = {
  name: 'fox',
  description: 'random fox command',
  usage: '',
  category: 'fun',
  accessableby: 'members'
 // aliases: []
};