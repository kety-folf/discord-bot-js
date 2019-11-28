const searchYoutube = require("yt-search");
const ytdl = require("ytdl-core");

class Song {
	constructor(songName, url)
	{
		this.songName = songName;
		this.url = url;
	}
}

module.exports.getSong = async (server, term) => {
    await searchYoutube(term, function(error, result) {
	if (error) throw error;
        // TODO: handle error
        if (result.videos.length > 0)
	{
	    var video = result.videos[0];
	    var song = new Song(video.title, `https://www.youtube.com${video.url}`);
	    server.queue.push(song);
	    console.log(song.songName);
            console.log(song.url);
	    return song;
	}
	else
		throw new Error("No matching results found.");
    });
    return;
};

module.exports.getAudioStream = (url) => {
    if (!ytdl.validateURL(url))
        throw new Error("The URL specified is invalid.");

    return ytdl(url, { filter: "audioonly" });
};

module.exports.playAudio = async (ctx, term = "") => {
    
    var server = ctx.getOrAddServer(ctx.guild.id);
	server.playing = false;
    
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
	console.log(server.queue.length);
	    
        // 3a. If they specified a URL or search term, use method getYouTubeUrl(term).
        await this.getSong(server, term);
	console.log(server.queue.length);
	    //console.log(`Found song: ${song.songName}`);
	//console.log(`A: ${server.queue.length}`);
        // 5. Check if there is anything in currentSong.
        // 6. If not, set the song value at Server.currentSong.
        // 7. If there is something in currentSong, use Server.queue.add(song).
        //if (server.currentSong)
        //server.queue.push(song);
	//console.log(`B: ${server.queue.length}`);
        //else
        //    server.currentSong = song;
    }

    // PLAYING
    console.log(server.playing);
    if (!server.playing)
    {
	console.log(`C: ${server.queue.length}`);
	console.log("Playing a song...");
	    
	function playUntilEmpty(_callback) {    
            while(server.getNextSong()) {
	        console.log(server.currentSong.url);
	        var stream = this.getAudioStream(server.currentSong.url);
	        console.log("Got stream.");
	        server.playing = true;
	        console.log("Now playing a stream...");
                await server.audioClient.playStream(stream);
	        console.log("Steam complete. Now getting next song...");
            }
	    _callback();
	}

	playUntilEmpty(() => {
        server.playing = false;
        server.clearQueue();
        server.audioClient.disconnect();
        server.audioClient = null;
        return ctx.channel.send("I have finished playing the queue.");
	});
    }
    else
    {
        if (term)
            return ctx.channel.send("I have queued a song.");

        return;
    }
};
