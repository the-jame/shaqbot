
# Shaqbot
Simple, spaghetti code bot made for my Discord server. Powered by DeepSeek & OpenAI (GPT-5 Nano).

## Features
- **Daily Posts**: Automatically posts a "Meme of the Day" (or Friday video) on startup/daily restart, followed 10 seconds later by a daily Onion radio news clip from `radionews/`. Also announces birthdays configured in `main.js`.
- **LLM Integration**: AI chat completions routed through OpenRouter (`gpt-5.6-luna` and `deepseek-v4-flash`).
- **Dynamic Memory**: Users can add, remove, or view items in the bot's internal dictionary lists (People, Reasons, Locations, Times, Sizes, etc.) directly via Discord.
- **Image Database**: Upload images and save them as new summonable commands on the fly.
- **Reaction AI**: Trigger AI translation, story completion, or "evil" responses by reacting to messages with specific emojis.
- **Auto Link Fixer**: Automatically converts Twitter/X links to `vxtwitter.com` and Bluesky links to `fxbsky.app` for Discord embeds.
- **Media Engine**: A massive library of triggered images, videos, audio clips, and randomized meme/news selection.

---

## Installation (Linux/Ubuntu)

### 1. Requirements
- **Node.js 24.x** (managed via `nvm`)
- **npm 11.x**

### 2. Download and Setup
```bash
git clone https://github.com/the-jame/shaqbot.git
cd shaqbot
npm install
```

### 3. Configuration
The bot requires a `settings.json` file and a `.env` file for credentials.

1. **`settings.json`**: Copy `sample-settings.json` and fill in your Discord bot token, prefix (`=`), user IDs, and custom reaction emojis:
   ```bash
   cp sample-settings.json settings.json
   nano settings.json
   ```
2. **`.env`**: Provide necessary API keys:
   ```env
   OPENROUTER_KEY=your_openrouter_api_key
   ```

---

## Commands & Usage
The default command prefix is `=`.

### 🧠 Database & Memory
Modify the bot's internal vocabulary lists and custom image pool without restarting code.

| Command | Description |
| --- | --- |
| `=add <list> <text>` | Adds an item to a list. <br> **Lists:** `who` (`people`), `irl` (`peopleirl`), `what` / `thing` (`things`), `where` / `location` (`locations`), `when` / `time` (`times`), `why` / `reason` (`reasons`), `size` (`sizes`), `syllable` / `u` (`syllables`). <br> *Ex: `=add who Alexander Hamilton`* |
| `=add img <name>` | **(Attach an image or provide a link)** Saves the image into `img/` under the given name. You can then summon it by typing `=<name>`. |
| `=remove <list> <text>` | Removes an item from a list. Aliases: `=del`, `=delete`. |
| `=count [list]` | Shows item count for a specific list, or a summary of all lists if omitted. Alias: `=things`. |

### 🤖 AI & Reactions
| Command | Description |
| --- | --- |
| `=ai <prompt>` | Query **OpenRouter** (`gpt-5.6-luna`). Responses have a day-of-week weighted chance to be cruel/sarcastic. |
| `=ds <prompt>` | Query **OpenRouter** (`deepseek-v4-flash`). Unrestricted and absurdity-focused. |
| `=mao <prompt>` | Roleplay as **Mao Zedong** (`deepseek-v4-flash`), answering in riddles first in Chinese, then English. |
| `=yoda <prompt>` | Roleplay as dehydrated, horny Master Yoda (`deepseek-v4-flash`). |
| `=invent <product>` | Generates a product pitch with a bolded slogan (90% chance to be goofy/impractical). |

**Reaction Triggers (configured in `settings.json`):**
* **Advance Emoji (`advanceEmoji`)**: Asks DeepSeek to complete the story started in the reacted message.
* **Translate Emoji (`translateEmoji`)**: Translates message text to Uzbek and back to English using a "broken bot" prompt to produce nonsensical translations.
* **Evil Emoji (`evilEmoji`)**: On messages starting with `=`, re-runs the prompt with instructions to be extremely hurtful, sarcastic, and offensive.

### 🎲 Randomizers & Tools
| Command | Description |
| --- | --- |
| `=er`, `=eldenring` | Generates an **Elden Ring** style ground message/soapstone combination. |
| `=8`, `=8ball`, `=is`, `=can`, `=should`, etc. | Classic Magic 8-Ball response to questions. |
| `=who`, `=whom` | Picks a random subject. (`=whom` uses real-life friend list; swaps 1st/2nd person pronouns if arguments provided). |
| `=why`, `=y`, `=whym` | Generates random "Because [subject] [reason]" responses (with pronoun swapping). |
| `=what`, `=whatis` | Defines a query using items from the `things` list. |
| `=when` | Generates a random time phrase. |
| `=where` | Generates a random location phrase. |
| `=how` | Responds with "with [random thing]". |
| `=yn` | Replies "Yes.", "No.", or sends a maybe GIF. |
| `=roll [max] [label]`, `=rand`, `=random` | Rolls a random number between 1 and `max` (default 100). |

### 🤡 Fun & Utilities
| Command | Description |
| --- | --- |
| `=say <text>` | Echoes back the message and deletes the author's invocation. |
| `=mock <text>` | Mocks input text in alternating caps accompanied by Mocking SpongeBob (also has a 0.02% passive chance on any message). |
| `=bs [target]`, `=size`, `=ballsize` | Generates a random size for the user or specified target (handles pronoun swapping). |
| `=u...` (e.g., `=uuu`) | Generates randomized syllables based on repeated 'u's. |
| `=asscrack` | Animated reaction sequence using custom server emojis. |
| `=joseton` | Animated interaction sequence between custom server emojis. |
| `=look <text>`, `=neck <text>` | Animated expanding neck emoji sequence. |
| `=howdy` | Random cowboy greeting. |
| `=setrole <name>` | Renames the caller's highest role. |
| *Link Fixer* | Automatically replaces Twitter/X links with `vxtwitter.com` and Bluesky links with `fxbsky.app`. |

### 🖼️ Media & Memes
| Command | Description |
| --- | --- |
| `=random`, `=meme`, `=react` | Selects and sends a random file from `/img`. |
| `=sickos` | Selects and sends a random image from `/sickos`. |
| `=friday` | Plays `friday.mp4` on Fridays (California time). |
| `=plex` | Resets the "0 days since last Plex reference" counter. |
| **Media Keywords** | Hundreds of keyword triggers sending local media or links, including: `=whitebaby`, `=petercoin`, `=sickfuck`, `=beans`, `=zamn`, `=eepy`, `=bogos`, `=fajitas`, `=society`, `=leatherbelt`, `=goblin`, `=cummies`, and more. |
