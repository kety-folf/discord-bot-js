module.exports.run = async (ctx) => {
    ctx.folf.user.setActivity(`RESTARTING`);
    process.exit();
};
  
module.exports.info = {
  name: 'restart',
  description: 'restarts the bot',
  usage: '',
  category: 'misc',
  accessableby: 'dev',
  aliases: ["r", "reboot"]
};
