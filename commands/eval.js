module.exports.run = async (ctx) => {
    try {
        ctx.channel.startTyping();
        const code = ctx.rawArgs;

        if (code.includes("token"))
          return ctx.error("you numnut no token for you");

        let script = eval(code);
 
        if (typeof(script) !== "string")
            script = require("util").inspect(script);

        let embed = ctx.utils.createEmbed("eval")
          .addField('IN', code)
          .addField('OUT', script);

        ctx.channel.stopTyping();
        return ctx.channel.send(embed);
    }
    catch (err)
    {
      ctx.channel.stopTyping();
      return ctx.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
    }
};
  
module.exports.info = {
  name: 'eval',
  description: 'evaluates code',
  usage: ' <code>',
  category: 'misc',
  accessableby: 'dev'
};
