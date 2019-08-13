module.exports.run = async (folf, message, args, embedErr,embedimg,embedlink,embedtxt) => {

    var user1 = message.mentions.users.first();
    var user2 = message.mentions.users.last();
    if (!user1) return embedtxt('Error', "@ a user you want to boop");
    var user = message.author;
    if(user == user1 || user == user2) return embedimg('boop', `${user} has booped them self`, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg')
    if (user1 != user2){
        embedimg('Boop', ` ${user} has booped ${user1} and ${user2} `, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg');
    }
    else{
   embedimg('Boop', ` ${user} has booped ${user1}`, 'https://cdn.discordapp.com/attachments/597631229357064195/598388881490051202/Cbn90rRUsAAuhCh.jpg' );	 
    }
   
  };
  
 
  module.exports.help = {
    name: 'boop',
    description: 'boop a user',
    usage: '@user or @user @user2',
    category: 'fun',
    accessableby: 'members'
    //aliases: []
  };