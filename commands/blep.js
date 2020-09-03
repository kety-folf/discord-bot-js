const FurryBotAPI = require("furrybotapi");
const config = require("../config.json");

const fb = new FurryBotAPI({
    userAgent: "Kety Folf's Bot / 2.0.1",
    apiKey: config.fur_APIkey
});

module.exports.run = async (ctx) => {
   
      fb.animals.blep("json", 1).then(res =>ctx.sendEmbed("blep", "", "", res.url));
};

module.exports.info = {
  name: "blep",
  description: "I dont know what to put here",
  usage: "",
  category: "fun",
  accessableby: "members"
};
