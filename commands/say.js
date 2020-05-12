module.exports.run = async (ctx) => {
    return ctx.channel.send(ctx.args.join(" "));
};
 
module.exports.info = {
  name: 'say',
  description: 'says a message',
  usage: '<string of text>',
  category: 'misc',
  accessableby: 'members'
};
