
# Discord Chat Bot
***
Simple, spaghetti code bot made for my Discord server. Now with OpenAI (Davinci-003 & GPT-3.5-Turbo)!


__The normal chat commands are:__
* `ai <string>`: Bot will answer with ai (OpenAI GPT3.5-instruct)
* `gpt <string>`: Bot will answer with ai (OpenAI GPT-4-turbo)
* `invent <string>`: Bot will sales pitch an invention from the prompt(OpenAI GPT3.5-instruct)
* `say <string>`: Bot says the string in text-to-speech and deletes your input so the bot appears to say it.
* `roll <integer>`: Make the bot randomly roll from 1 to the number you enter. e.g. =roll 100 rolls 1-100
* `8 <question>`: Bot will answer with a classic 8-ball style response.
* `er`: Bot will say a randomly-generated Elden Ring style message.

__More chat commands:__
* `who <question>(optional)`: Bot answers who did the thing that you just asked [hard coded responses in large array].
* `why <question>(optional)`: Bot says why something happened by making up an answer using a random proper noun and "reason" [hard coded responses in large array].
* `whatis <question>`: Bot tells you what the thing you asked is [hard coded responses in large array].
* `ballsize|bs <string>`: Bot will tell you the ballsize of the string in question [hard coded responses in large array].
* `image` OR `meme` OR `random`: Respond with a random image from the database of meme responses.
 

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
