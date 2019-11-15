const FurryBotAPI = require("furrybotapi");
const fb = new FurryBotAPI("kety-folf's-bot/ pre-1.10.9");

module.exports.run = async (ctx) => {
    fb.apiRequest("animals", true, "blep", false)
        .then(result => ctx.sendEmbed("blep", "", result.imageURL)); 
};

module.exports.info = {
  name: "blep",
  description: "I dont know what to put here",
  usage: "",
  category: "fun",
  accessableby: "members"
};
