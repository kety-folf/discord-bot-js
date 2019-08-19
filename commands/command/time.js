const { RichEmbed } = require('discord.js');
const db = require('quick.db')
module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    if(message.author.id !== "263443630767734784") db.add('count.time',1)
    // List of timezones and locations to be used
    const timezoneList = [
        ["Eastern (Server) Time", "America/New_York"],
        ["UK Time", "Europe/London"],
        ["US Central Time", "America/Chicago"],
        ["US Mountain Time", "America/Denver"],
        ["US Pacific Time", "America/Los_Angeles"],
        ["Central European Time", "Europe/Berlin"],
        ["Hong Kong/Philippines/Western Australia Time", "Asia/Hong_Kong"],
        ["New Zealand Time", "Pacific/Auckland"]
    ];

    // List of settings for time/date formatting
    const settings = {
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
    };

    // Create variables to be used later
    let now = new Date();
    let timeStr = "";

    // Build the time string using the locations and timezones
    for (let [label, location] of timezoneList) {
        let time = now.toLocaleString("en-US", { timeZone: location, ...settings });
        timeStr += `**${label}**: ${time}\n`
    }

    // Send message to the channel in which the command was used
    let embed = new RichEmbed()
    .setTitle("Time")
    .setDescription(timeStr)
    message.channel.send(embed)
  
  };
  
 
  module.exports.help = {
    name: 'time',
    description: 'world clock command',
    usage: '',
    category: 'misc',
    accessableby: 'members'
   // aliases: []
  };