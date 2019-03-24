const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "+";
const opus = require("node-opus")
var rate = 64000;
var encoder = new opus.OpusEncoder(rate);
const song = ['\song1.mp3', '\song2.mp3', '\song3.mp3', '\song4.mp3', '\song5.mp3'];
const ffmpeg = require("ffmpeg")
client.on("ready", () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("prefix is +");
});
client.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
        return;
    }

    if (message.content.startsWith(prefix + "info")) {
        message.channel.send("bot was made by Kety_the_folf#1470 coded in JS with discord.js");
        return;
    }

    if (message.content.startsWith(prefix + "help")) {
        message.channel.send("bot prefx is +");
        message.channel.send("comands");
        message.channel.send("ping: sends the bots ping");
        message.channel.send("info: info about the bot");
        message.channel.send("test: sends you a private message")
        message.channel.send("test2:sends a test message")
        message.channel.send("play:joins voice chat and starts playing a song see +songs for comannd and name")
        message.channel.send("songs:lists the songs the bot can play")
        message.channel.send("stop:stops music")
        message.channel.send("playYT:plays music from youtube")
        return;
    }

    if (message.content.startsWith(prefix + "test")) {
        message.author.send("this is a test");
        return;
    }

    if (message.content.startsWith(prefix + "test2")) {
        return message.reply("test");
        return;
        
   
    }
    if (message.content.startsWith(prefix + "play1")) {
        client.user.setActivity("music");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()
            
            .then(connection => {
                message.channel.send("now playing song name")
                const dispatcher = connection.playFile(song[0]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished");  });
            })
            .catch(console.error);
        return;
    }
    if (message.content.startsWith(prefix + "play2")) {
        client.user.setActivity("music");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send("now playing song name")
                const dispatcher = connection.playFile(song[1]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished"); });
            })
            .catch(console.error);
        return;
    }
    if (message.content.startsWith(prefix + "play3")) {
        client.user.setActivity("music");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send("now playing song name")
                const dispatcher = connection.playFile(song[2]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished"); });
            })
            .catch(console.error);
        return;
    }
    if (message.content.startsWith(prefix + "play4")) {
        client.user.setActivity("music");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send("now playing song name")
                const dispatcher = connection.playFile(song[3]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished"); });
            })
            .catch(console.error);
        return;
    }
    if (message.content.startsWith(prefix + "play5")) {
        client.user.setActivity("music");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send("now playing song name")
                const dispatcher = connection.playFile(song[4]);
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); message.channel.send("song finished"); });
            })
            .catch(console.error);
        return;
    }
    if (message.content.startsWith(prefix + "playYT")){
        message.channel.send("work in progess comannd does not work")
    }
    if (message.content.startsWith(prefix + "stop")) {
        client.user.setActivity("bot prefix is +");
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("join a voice chat")
        VC.join()

            .then(connection => {
                message.channel.send("stopping music")
                const dispatcher = connection.playFile();
                dispatcher.on("end", end => { VC.leave(); client.user.setActivity("prefix is +"); });
            })
            .catch(console.error);
        return;
    }
        if (message.content.startsWith(prefix + "songs")) {
            message.channel.send("songs you can play ")
            message.channel.send("song1 +play1 ")
            message.channel.send("  song2+play2 ")
            message.channel.send("song3 +play3 ")
            message.channel.send(" song4= +play4")
            message.channel.send("song5 +play5")
            return;
        
    }
   
    if (message.content.startsWith(prefix + "quit")) {
        client.destroy()
        return
    }
   
});
client.login("NoT_a_priVaTe_BoT_KeY");
