
# Discord Chat Bot - music fully working.
***  
This is a simple Node.js based chat and music bot for Discord.

__The music commands are:__
* `play <url>|<search string>`: Play audio from YouTube.
* `skip [number]`: Skip a song or multi songs with skip [some number].
* `queue`: Display the current queue.
* `pause`: Pause music playback.
* `resume`: Resume music playback.
* `remove [position]`: Remove a song from the queue by position.
* `volume`: Adjust the playback volume between 1 and 200.
* `leave`: Clears the song queue and leaves the channel.
* `clearqueue`: Clears the song queue.
* `np`: Show the current playing song.  

__The chat commands are:__
* `say <string>`: Bot says the string in text-to-speech.
* `poll <string>`: Make the bot post your message with up/downvote reactions to poll.
* `8 <question>`: Bot will answer with an 8-ball style response.
* `ballsize|bs <string>`: Bot will tell you the ballsize of the string in question.
* `howdy`: Say howdy.
* `memes`: List additional commands with image attachment responses.
 
__Permissions:__  
* If `anyoneCanSkip` is true, anyone can skip songs in the queue.
* If `anyoneCanAdjust` is true, anyone can adjust the volume.
* If `ownerOverMember` is true, the set ID of the user (`ownerID`) will over-ride permissions from the bot.

***
# Installation
***  
* `npm install`  
* `cp sample-settings.json settings.json && nano settings.json` fill in your tokens.
* `node app.js` to run.

# Options & Config.
***

## Basic variables.
| Option | Type | Description | Location |  
| --- | --- | --- | --- |
| token | String | Your discord bot token. | settings.json |
| youtubeKey | String | A YouTube Data API3 key. Required to run. | settings.json |
| botPrefix | String | The prefix of the bot. Defaults to "=". | settings.json + app.js [54] |
| anyoneCanSkip | Boolean | Whether anyone can skip songs in the queue. | app.js [48] |
| ownerOverMember | Boolean | Whether the owner over-rides `CanAdjust` and `CanSkip`. | app.js [51] |
| ownerID | String | The ID of the Discord user to be seen as the owner. Required if using `ownerOverMember`. | app.js [52] |
