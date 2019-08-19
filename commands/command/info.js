const si = require('systeminformation')
const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    if(message.author.id !== "263443630767734784") db.add('count.info',1);
    embedtxt('Info', "bot was made by Kety_the_folf#0001 coded in JS with discord.js");
    si.cpu()
.then(data => {
    embedtxt('CPU Information:', '- manufucturer: ' + data.manufacturer + ' - brand: ' + data.brand + ' - cores: ' + data.cores + ' - physical cores: ' + data.physicalCores);
     
})
.catch(error => embedErr('error', error));

    si.mem()
    .then(data1 => {
    embedtxt('RAM Information:',
    '  - free: ' + data1.free +
    '  - used: ' + data1.used +
    '  - total: ' + data1.total);
    
})

.catch(error =>    embedErr('error', error));

si.osInfo()
 .then(os => {
    embedtxt('OS Information:', ' - platform: ' + os.platform +' - release: ' + os.release + ' -build: ' + os.build + ' - distro: ' + os.distro);
     
})
.catch(error => embedErr('error', error))

    
  
  };
  
 
  module.exports.help = {
    name: 'info',
    description: 'server info and bot info',
    usage: '',
    category: 'misc',
    accessableby: 'members',
    aliases: ['si', 'serverInfo']
  };