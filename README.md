
# Shaqbot
Simple, spaghetti code bot made for my Discord server. Powered by DeepSeek & OpenAI (GPT-5 Nano).

## Features
- **LLM Integration**: Logic for OpenAI (GPT-5 Nano) and DeepSeek (deepseek-chat).
- **Dynamic Memory**: Users can add or remove items from the bot's internal lists (Subjects, Reasons, Locations, etc.) directly via Discord.
- **Image Database**: Upload images and save them as new commands on the fly.
- **Reaction AI**: Trigger AI translation, story completion, or "evil" responses by reacting to messages with specific emojis.
- **Media Engine**: A massive library of triggered images, videos, and randomized meme selection.

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
The bot requires a `settings.json` file (and a `.env` file for API keys if configured that way in your setup). Ensure you define your API keys and owner ID.
```bash
cp sample-settings.json settings.json
nano settings.json
```

---

## Commands & Usage
The trigger is `=`.

### 🧠 Database & Memory (New)
Modify the bot's internal vocabulary and image lists without restarting code.

| Command | Description |
| --- | --- |
| `=add <list> <text>` | Adds an item to a specific list. <br> **Lists:** `who`, `irl`, `thing`, `where`, `when`, `why`, `size`. <br> *Ex: `=add who Alexander Hamilton`* |
| `=remove <list> <text>` | Removes an item from a list. Aliases: `=del`, `=delete`. |
| `=count [list]` | Shows how many items are in a list (or a summary of all lists if left blank). |
| `=img <name>` | **(Attach an image)** Saves the attached image (or linked URL) to the bot. <br> You can then summon it by typing `=<name>`. |

### 🤖 AI & Reactions
| Command | Description |
| --- | --- |
| `=ai <string>` | Answer using **GPT-5 Nano**. Has a dynamic chance (based on day of the week) to be "cruel". |
| `=ds <string>` | Answer using **DeepSeek-Chat**. Unrestricted and absurdity-focused. |
| `=mao <string>` | Answer as **Mao Zedong** (DeepSeek). Answer in riddles, first in Chinese, then English. |
| `=invent <string>` | Generates a sales pitch for a product (90% chance to be stupid/impractical). |

**Reaction Triggers:**
*   **Advance Emoji**: Completes the story/text of the message.
*   **Translate Emoji**: Detects language. If English -> translates to random language then back. If Foreign -> translates to English.
*   **Evil Emoji**: Re-processes the message with instructions to be "hurtful, sarcastic, and offensive."

### 🎲 Randomizers & Tools
| Command | Description |
| --- | --- |
| `=er` | Generates a conjoined **Elden Ring** style floor message. |
| `=8`, `=is`, `=can`, `=should` | Classic 8-Ball response. |
| `=who`, `=whom` | Tells you who did it. (Use `=whom` or `=whoirl` for real-life friend pool). |
| `=why`, `=y` | Explains why something happened using random nouns and reasons. |
| `=what`, `=whatis` | Defines a subject using a random object pool. |
| `=when`, `=where` | Generates random times or locations. |

### 🤡 Fun & Animated
| Command | Description |
| --- | --- |
| `=say <string>` | Bot repeats your text; deletes your original message. |
| `=mock <string>` | tExT lIkE tHiS with a mocking SpongeBob image. |
| `=bs`, `=size` | Reports the size/ballsize of a user. Logic handles "my" vs "your" pronoun swapping. |
| `=uuu` | Generates randomized syllables based on command length (e.g., `euxeuxbu`). |
| `=asscrack` | Animated sequence featuring Philip and the Coffin. |
| `=look`, `=neck` | Creates an elongating "looking" emoji sequence. |
| `=howdy` | Random cowboy greeting. |
| `=joseton` | Animated interaction between Jose and Ton. |

### 🖼️ Media & Memes
| Command | Description |
| --- | --- |
| `=sickos` | Random image from the `/sickos` folder. |
| `=random`, `=meme`| Random image from the `/img` folder. |
| `=friday` | Only works on Fridays (in California). |
| `=plex` | Resets the "Days since last Plex reference" counter. |
| **Media Keywords** | Over 100+ triggers including: `=whitebaby`, `=petercoin`, `=sickfuck`, `=beans`, `=zamn`, `=eepy`, `=bogos`, `=fajitas`, `=society`, etc. |
