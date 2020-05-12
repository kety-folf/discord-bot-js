const FurryBotAPI = require("furrybotapi");
const fb = new FurryBotAPI("kety-folf's-bot/ 1.11.0");

module.exports.run = async (ctx) => {
    const type = ctx.args[0] || "straight";

    if (!ctx.channel.nsfw)
        return ctx.error("Error", "not nsfw channel");
	
    return fb.apiRequest("furry", false, `yiff/${type}`, false)
        .then(result => ctx.sendEmbed("yiff", `${type} yiff`, "", result.imageURL))
        .catch(error => ctx.error('error', error));
};

module.exports.info = {
    name: "yiff",
    description: "sends yiff to the channel defalts to straight",
    usage: "[gay | straight]",
    category: "NSFW",
    accessableby: "members",
    aliases: []
};
