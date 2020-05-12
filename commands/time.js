module.exports.run = async (ctx) => {

    // List of timezones and locations to be used
    const timezones =
    [
        ["Eastern (Server) Time", "America/New_York"],
        ["UK Time", "Europe/London"],
        ["US Central Time", "America/Chicago"],
        ["US Mountain Time", "America/Denver"],
        ["US Pacific Time", "America/Los_Angeles"],
        ["Central European Time", "Europe/Berlin"],
        ["Hong Kong/Philippines/Western Australia Time", "Asia/Hong_Kong"],
        ["New Zealand Time", "Pacific/Auckland"],
        ["Chile Time", "America/Santiago"]
    ];

    // List of settings for time/date formatting
    const settings =
    {
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
    };

    // Create variables to be used later
    let now = new Date();
    var time = "";

    // Build the time string using the locations and timezones
    for (let [label, location] of timezones)
    {
        // TODO: create conjoin thing that can split correctly, probably Array.join();
        let localTime = now.toLocaleString("en-US", { timeZone: location, ...settings });
        time += `**${label}**: ${localTime}\n`;
    }

    return ctx.sendEmbed("Time", time);
};
  
module.exports.info = {
  name: 'time',
  description: 'world clock command',
  usage: '',
  category: 'misc',
  accessableby: 'members'
};
