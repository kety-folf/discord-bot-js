const FurryBotAPI = require("furrybotapi");
const config = require("../config.json");

const fb = new FurryBotAPI({
    userAgent: "Kety Folf's Bot / 2.0.1",
    apiKey: config.fur_APIkey
});

module.exports.run = async (ctx) => {
    const type = ctx.args[0] || "straight";

    if (!ctx.channel.nsfw) return ctx.error("Error", "not nsfw channel");
	
    return fb.furry.yiff[type]("json", 1).then(res => ctx.sendEmbed(type, "", "", res.url));
};

module.exports.info = {
    name: "yiff",
    description: "sends yiff to the channel defalts to straight",
    usage: "[gay | straight]",
    category: "NSFW",
    accessableby: "members",
    aliases: []
};
