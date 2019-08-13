let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');

module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {
    let wrapper = new e621('Folf-Bot-Discord', 'kety-folf', folf.e621Key, 50);
    if (message.channel.nsfw){
		wrapper.posts.getPopularPosts(enums.e621PopularityStrings.daily)
.then((data) => {
    embedimg('e621', '', data[Math.floor(Math.random()*20)].file_url);
})
}
else{
	embedErr('Error', 'not nsfw channel')
}
  };
  
 
  module.exports.help = {
    name: 'e621',
    description: 'gets top daily posts from e621',
    usage: '',
    category: 'NSFW',
    accessableby: 'members',
    aliases: ["yiff"]
  };