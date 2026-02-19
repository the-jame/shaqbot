# Shaqbot
Simple, spaghetti code bot made for my Discord server. Now powered by DeepSeek & OpenAI (GPT-5 Nano).

## Features
- **AI Integration**: Custom responses using OpenAI (GPT-5 Nano) and DeepSeek (deepseek-chat).
- **Custom Personalities**: Logic tied to specific User IDs for server-specific interactions.
- **Emoji Triggers**: Special event handling for ⏩, 🗣️, and 😈.
- **Random Media**: Serves memes and random images from a local `/img` directory.
- **Classic Fun Commands**: 8-ball, Elden Ring messages, and randomized "Who/Why/When" generators.

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
The bot requires a `settings.json` file to run. A template is provided as `sample-settings.json`.

1. Copy the sample file:
```bash
cp sample-settings.json settings.json
```
2. Open `settings.json` and replace the placeholder values with your actual Bot Token, API keys, and User IDs:
```bash
nano settings.json
```

---

## Commands & Usage
The bot trigger is `=`.

### AI Commands
| Command | Description |
| --- | --- |
| `=ai <string>` | Bot answers using OpenAI (GPT-5 Nano) |
| `=ds <string>` | Bot answers using DeepSeek (Smarter, but takes longer) |
| `=invent <string>` | Bot creates a sales pitch for an invention from your prompt |

### Utility & Fun
| Command | Description |
| --- | --- |
| `=say <string>` | Bot repeats the string in TTS and deletes your message |
| `=roll <integer>` | Randomly rolls from 1 to the number entered |
| `=8\|is <question>` | Classic 8-ball style response |
| `=er` | Randomly-generated Elden Ring style message |

### Random Generators (Hard-coded Arrays)
| Command | Description |
| --- | --- |
| `=who <question>` | Tells you who did the thing (Hardcoded responses) |
| `=why <question>` | Explains why something happened using random nouns |
| `=when <question>` | Generates a random time or date |
| `=what <question>` | Tells you what the thing in question is |
| `=bs \| =ballsize` | Reports the ballsize of the string provided |
| `=size <string>` | Reports the size of the string provided |

### Media
| Command | Description |
| --- | --- |
| `=meme` OR `=random` | Responds with a random image from the meme database |
