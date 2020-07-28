/**
 * Represents the audio client for a guild.
 */
class ServerAudioClient {
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

module.exports = ServerAudioClient;