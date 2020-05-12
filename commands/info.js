const system = require('systeminformation');

module.exports.run = async (ctx) => {
    try {
        const cpuData = await system.cpu();
        const memData = await system.mem();
        const osData = await system.osInfo();

        let embed = ctx.utils.createEmbed("Info", "bot was made by Kety_the_folf#0001 coded in JS with discord.js")
        .addField('CPU Information:',
            ' - manufucturer: ' + cpuData.manufacturer +
            '\n - brand: ' + cpuData.brand +
            '\n - cores: ' + cpuData.cores +
            '\n - physical cores: ' + cpuData.physicalCores)

        .addField("RAM Information:",
            '  - free: ' + memData.free +
            '\n  - used: ' + memData.used +
            '\n  - total: ' + memData.total)

        .addField("OS Information:",
            ' - platform: ' + osData.platform +
            '\n - release: ' + osData.release +
            '\n - build: ' + osData.build +
            '\n - distro: ' + osData.distro);

        return ctx.channel.send(embed);
    }
    catch(error)
    {
        return ctx.error('error', error);
    }
};

module.exports.info = {
  name: 'info',
  description: 'server info and bot info',
  usage: '',
  category: 'misc',
  accessableby: 'members',
  aliases: ['si', 'serverInfo']
};
