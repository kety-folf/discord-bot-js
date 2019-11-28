const searchYoutube = require("yt-search");
const ytdl = require("ytdl-core");

class Song {
	constructor(songName, url)
	{
		this.songName = songName;
		this.url = url;
	}
}

module.exports.getSong = (term) => {
    var song = null;
    searchYoutube(term, function(error, result) {
	if (error) throw error;
        // TODO: handle error
        if (result.videos.length > 0)
	{
	    var video = result.videos[0];
	    song = new Song(video.title, `https://www.youtube.com${video.url}`);
	    console.log(video.title);
            console.log(video.url);
	    console.log(song.songName);
            console.log(song.url);
	    return song;
	}

        throw error;
    });
	
    console.log("I am outside of the searchYoutube method.");
    console.log(`${song.title}`);
    console.log(`${song.url}`);

    return song;
};

module.exports.getAudioStream = (url) => {
    if (!ytdl.validateURL(url))
        throw new Error("The URL specified is invalid.");

    return ytdl(url, { filter: "audioonly" });
};

module.exports.playAudio = async (ctx, term = "") => {
    
    var server = ctx.getOrAddServer(ctx.guild.id);
    
    // CONNECTING
    if (!server.audioClient)
    {
        // 1. From the guild, check if the user that executed the command is in a voice channel.
        // 2. If not, return and notify them.
        if (!ctx.member.voiceChannel)
            return ctx.error("you gotsta be in channelled voice laddie you cant listen with eyes");

        // 3. Otherwise, connect to their voice channel.
        // 4. Set the VoiceConnection object at Server.audioClient there.
        server.audioClient = await ctx.member.voiceChannel.join();
    }

    // SEARCHING (OPTIONAL)
    if (term)
    {
	console.log("Searching for a song...");
	
        // 3a. If they specified a URL or search term, use method getYouTubeUrl(term).
        const song = this.getSong(term);
	console.log(`Found song: ${song.songName}`);
	console.log(`A: ${server.queue.length}`);
        // 5. Check if there is anything in currentSong.
        // 6. If not, set the song value at Server.currentSong.
        // 7. If there is something in currentSong, use Server.queue.add(song).
        //if (server.currentSong)
        server.queue.push(song);
	console.log(`B: ${server.queue.length}`);
        //else
        //    server.currentSong = song;
    }

    // PLAYING
    
    if (!server.playing)
    {
	console.log(`C: ${server.queue.length}`);
	console.log("Playing a song...");
	    
        while(server.getNextSong()) {
	    var stream = this.getAudioStream(server.currentSong.url);
	    console.log("Got stream.");
	    server.playing = true;
	    console.log("Now playing a stream...");
            await server.audioClient.playStream(stream);
	    console.log("Steam complete. Now getting next song...");
        }

        server.playing = false;
        server.clearQueue();
        server.audioClient.disconnect();
        server.audioClient = null;
        return ctx.channel.send("I have finished playing the queue.");
    }
    else
    {
        if (term)
            return ctx.channel.send("I have queued a song.");

        return;
    }
};
