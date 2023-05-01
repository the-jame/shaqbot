
# Discord Chat Bot
***
Simple, stupid bot made for my Discord server. Now with AI!


__The normal chat commands are:__
* `ai <string>`: Bot will answer with ai (OpenAI Davinci-003)
* `gpt <string>`: Bot will answer with ai (OpenAI GPT-3.5-turbo)
* `invent <string>`: Bot will sales pitch an invention from the prompt(OpenAI Davinci-003)
* `say <string>`: Bot says the string in text-to-speech and deletes your command.
* `roll <integer>`: Make the bot randomly roll from 1 to the number you enter.
* `8 <question>`: Bot will answer with an 8-ball style response.
* `er`: Bot will say a randomly-generated Elden Ring style message.

__More chat commands:__
* `who <question>(optional)`: Bot answers who did the thing that you just asked [hard coded responses in large array].
* `why <question>(optional)`: Bot says why something happened by making up an answer using a random proper noun and "reason" [hard coded responses in large array].
* `whatis <question>`: Bot tells you what the thing you asked is [hard coded responses in large array].
* `ballsize|bs <string>`: Bot will tell you the ballsize of the string in question [hard coded responses in large array].
* `image` OR `meme` OR `random`: Respond with a random image from the database of meme responses.
* `memes`: List all image commands with description of responses. (50+)
 

***
# Installation
***
* `npm install`
* `cp sample-settings.json settings.json && nano settings.json` fill in your token.
* `node main.js` to run.

# Options & Config.
***

## Basic variables.
| Option | Type | Description | Location |
| --- | --- | --- | --- |
| token | String | Your discord bot token. | settings.json |
| botPrefix | String | The prefix of the bot. Defaults to "=". | settings.json + main.js [54] |
