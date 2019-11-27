const searchYoutube = require("yt-search");
const ytdl = require("ytdl-core");

class Song {
	constructor(name, url)
	{
		this.name = name;
		this.url = url;
	}
}

module.exports.getYouTubeFirstSong = (term) => {
    searchYoutube(term, function(error, result) {
        // TODO: handle error
        if (result.videos.length > 0)
            return new Song(result.videos[0].title, `https://www.youtube.com${result.videos[0].url}`);

        throw error;
    });
};

/*
    TODO: combine with 'ctx', and make a message collector to get what index
    the user would want in the video.
*/

module.exports.getYouTubeUrl = async (term) => {
    searchYoutube(term, function(error, result) {
        // TODO: handle error
        const matches = result.videos;
    });
};

module.exports.getAudioStream = async (url) => {
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
        // 3a. If they specified a URL or search term, use method getYouTubeUrl(term).
        const song = this.getYouTubeFirstSong(term);

        // 5. Check if there is anything in currentSong.
        // 6. If not, set the song value at Server.currentSong.
        // 7. If there is something in currentSong, use Server.queue.add(song).
        //if (server.currentSong)
        server.queue.push(song);
        //else
        //    server.currentSong = song;
    }

    // PLAYING
    
    if (!server.playing)
    {
        while(server.getNextSong()) {
            server.playing = true;
            await server.audioClient.playStream(this.getAudioStream(server.currentSong.url));
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
