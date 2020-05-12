const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const config = require("../config.json");
const youtube = new YouTube(config.youtube_key);

class Song {
	constructor(songName, url)
	{
		this.songName = songName;
		this.url = url;
	}
}

class ServerQueueClient {
	constructor(textChannel, voiceChannel)
	{
        this.connection = null;
        this.dispatcher = null;
		this.queue = [];
		this.textChannel = textChannel;
		this.voiceChannel = voiceChannel;
		this.playing = false;
		this.currentSong = null;
	}

	getNextSong()
	{
        if (this.currentSong)
        {
            console.log("Current song:");
            console.log(this.currentSong);
        }

		if (this.queue.length > 0)
		{
			this.currentSong = this.queue.shift();
        }
        else
        {
            this.currentSong = null;
        }
        
        console.log("Next song:");
        console.log(this.currentSong);

		return this.currentSong;
	}

	clear()
	{
		this.currentSong = null;
		this.queue = [];
	}
}

// SEARCHING
async function search(service, server, value)
{
    if (value)
    {
        console.log(`Searching for "${value}".`);
        await service.getSong(server, value);
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let current = null;
    do {
        current = Date.now();
    } while(current - date < milliseconds);
}

module.exports.getSong = async (server, term) => {

    return await youtube.searchVideos(term)
        .then(results => {

            if (results.length > 0) {
                var song = new Song(results[0].title, results[0].url);
                
                console.log(`Result found.\n${song.songName}\n${song.url}`);
                console.log(`Song found and pushed to server queue.`);

                server.queueClient.queue.push(song);

                console.log(server.queueClient.queue);

                result = song;
                return song;
            }
            else
            {
                console.log("No matching results found.");
                return null;
            }

            
        })
        .catch(console.log);
};

module.exports.getQueuePreview = (server) =>
{
    preview = "";

    if (server.queueClient)
    {
        if (server.queueClient.dispatcher)
        {
            if (server.queueClient.dispatcher.paused)
                preview += 'Currently paused. (use the `play` command to continue!)\n';
        }

        if (server.queueClient.currentSong)
        {
            preview += `Currently playing: ${server.queueClient.currentSong.songName}\n`;
        }
        
        if (server.queueClient.queue.length > 0)
        {
            preview += `Queue:\n`;
            for (var i = 0; i < server.queueClient.queue.length; i++)
            {
                preview += `[${i + 1}]: ${server.queueClient.queue[i].songName}\n`;
            }
        }
    }
    else
    {
        preview = "No queue was found for this server.";
    }

    return preview;
}

module.exports.skip = (server) =>
{
    if (server.queueClient)
    {
        if (server.queueClient.dispatcher)
        {
            server.queueClient.dispatcher.end();
        }
        else
        {
            return server.queueClient.textChannel.send("Nothing is currently playing to skip.");
        }
    }
}

module.exports.stop = (server, message = "") =>
{
    if (server.queueClient)
    {
        server.queueClient.playing = false;
        server.queueClient.clear();
        server.queueClient.connection.disconnect();
        server.queueClient.connection = null;

        if (message != "")
            return server.queueClient.textChannel.send(message);
    }
}

module.exports.pause = (server) => 
{
    if (server.queueClient)
    {
        if (server.queueClient.dispatcher)
        {
            server.queueClient.dispatcher.pause(true);
        }
    }
}

module.exports.playAudio = async (ctx, term = "") =>
{
    function getAudioStream(url)
    {
        if (!ytdl.validateURL(url))
            throw new Error("The URL specified is invalid.");
    
        return ytdl(url, { filter: "audioonly" });
    };

    function play(server)
    {
        console.log(`Queue Length: ${server.queueClient.queue.length}`);
    
        if (!server.queueClient.getNextSong())
        {
            return module.exports.stop(server, "Queue complete.");
        }
    
        console.log(`Stream available.\n${server.queueClient.currentSong.url}`);
    
        const stream = getAudioStream(server.queueClient.currentSong.url);
        const streamOptions = { seek: 0, volume: 1 };
    



        server.queueClient.playing = true;

        //console.log(stream);
    
        //stream "assets/oof.mp3"
        let dispatcher = server.queueClient.connection.play(stream, streamOptions);

        server.queueClient.dispatcher = dispatcher;

        console.log(dispatcher.paused);
        console.log(dispatcher.volume);

        dispatcher.setVolume(1);

        dispatcher.on('finish', () =>
        {
            console.log("Stream finished.");
            play(server);
        });
    
        return server.queueClient.textChannel.send(`Now playing: ${server.queueClient.currentSong.songName}`);
    }

    var server = ctx.getOrAddServer(ctx.guild.id);

    if (server.queueClient)
    {
        if (server.queueClient.dispatcher)
        {
            server.queueClient.dispatcher.resume();
        }
    }

    if (!server.queueClient)
    {
        console.log("Creating new QueueClient.");
        if (!ctx.member.voice.channel)
            return ctx.error("you gotsta be in channelled voice laddie you cant listen with eyes");

        let queueClient = new ServerQueueClient(ctx.channel, ctx.member.voice.channel);
        server.queueClient = queueClient;
    }
    
    

    /*
    
    if (ytdl.validateURL(term))
    {
        server.queueClient.queue.push(new Song("Queued Song", term));
    }
    
    */
    var foundSong = await this.getSong(server, term)
    .then(result =>
        {
            if (!result)
            {
                server.queueClient.textChannel.send("The search result did not find any results.");
                return false;
            }

            return true;
        });

    if (!foundSong)
        return;

    if (!server.queueClient.connection)
    {
        console.log("Initializing new QueueClient connection.");
        let connection = await server.queueClient.voiceChannel.join();

        server.queueClient.connection = connection;
    }

    if (server.queueClient.playing)
    {
        ctx.saveOrAddServer(server);
        return server.queueClient.textChannel.send("Your song has been queued.");
    }



    play(server);

    ctx.saveOrAddServer(server);
};
