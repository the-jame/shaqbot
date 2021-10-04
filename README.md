
# Discord Chat Bot - YouTube broke all music functions.
***  
This is a simple Node.js based chat and music bot for Discord.


__The chat commands are:__
* `say <string>`: Bot says the string in text-to-speech.
* `who <question>(optional)`: Bot answers who did the thing that you just asked.
* `why <question>(optional)`: Bot says why something happened by making up an answer using a random proper noun and "reason".
* `whatis <question>`: Bot tells you what the thing you asked is.
* `when <question>(optional)`: Bot answers when something will happen. WORK IN PROGRESS
* `where <question>(optional)`: Bot answers where something will happen. WORK IN PROGRESS
* `poll your question? ; answer1, answer2, answer3`: Make the bot post your message with reactions for polling. Supports 2 - 20 options.
* `roll <integer>`: Make the bot randomly roll from 1 to your number.
* `8 <question>`: Bot will answer with an 8-ball style response.
* `ballsize|bs <string>`: Bot will tell you the ballsize of the string in question.
* `howdy`: Say howdy.
* `memes`: List additional commands with image attachment responses. (50+)
 

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
| botPrefix | String | The prefix of the bot. Defaults to "=". | settings.json + app.js [54] |
