const system = require('systeminformation');

module.exports.run = async (ctx) =>
{
    try 
    {
        var cpuData = system.cpu();
        var memData = system.mem();
        var osData = system.osInfo();

        let embed = ctx.utils.createEmbed("Info", "bot was made by Kety_the_folf#0001 coded in JS with discord.js")
        .addField('CPU Information:',
            '- manufucturer: ' + cpuData.manufacturer +
            ' - brand: ' + cpuData.brand +
            ' - cores: ' + cpuData.cores +
            ' - physical cores: ' + cpuData.physicalCores)

        .addField("RAM Information:",
            '  - free: ' + memData.free +
            '  - used: ' + memData.used +
            '  - total: ' + memData.total)

        .addField("OS Information:",
            ' - platform: ' + osData.platform +
            ' - release: ' + osData.release +
            ' -build: ' + osData.build +
            ' - distro: ' + osData.distro);

        return ctx.channel.sendEmbed(embed);
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
