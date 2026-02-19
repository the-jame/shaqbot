# Shaqbot
Simple, spaghetti code bot made for my Discord server. Now powered by DeepSeek & OpenAI (GPT-5 Nano).

## Features
- **Triple AI Core**: Logic for OpenAI (GPT-5 Nano) and DeepSeek (deepseek-chat).
- **Mean AI Logic**: AI personality changes based on the day of the week (higher chance of being rude on certain days).
- **Hardcoded Subjects**: Huge internal arrays for generating millions of unique "Who/Why/What" responses.
- **Media Engine**: A massive library of triggered images and randomized meme selection.
- **Auto-Moderation**: Automatically deletes specific stickers and restricts AI to allowed channels.

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
The bot requires a `settings.json` file. Use the template provided:
```bash
cp sample-settings.json settings.json
nano settings.json
```

---

## Commands & Usage
The trigger is `=`.

### AI Commands
| Command | Description |
| --- | --- |
| `=ai <string>` | Answer using **GPT-5 Nano**. Has a chance to be cruel depending on the day of the week. |
| `=ds <string>` | Answer using **DeepSeek-Chat**. Unrestricted and absurdity-focused. |
| `=mao <string>` | Answer as **Mao Zedong** (DeepSeek). Mysterious riddles in Chinese & English. |
| `=invent <string>` | Generates a serious sales pitch for a stupid product. |

### Games & Randomizers
| Command | Description |
| --- | --- |
| `=roll <num>` | Roll a random number (1 to your input). |
| `=er` | Generates a conjoined **Elden Ring** style floor message. |
| `=8`, `=is`, `=can` | Classic 8-Ball response (works with any "question" word like `should`, `will`, `do`). |
| `=who`, `=whom` | Tells you who did it (Hardcoded subject pool). |
| `=why`, `=y` | Explains why something happened using random nouns and reasons. |
| `=what`, `=whatis` | Defines a subject using a random object pool. |
| `=when`, `=where` | Generates random times, dates, or locations. |

### Fun & Animated
| Command | Description |
| --- | --- |
| `=say <string>` | Repeated in TTS; deletes your original message. |
| `=mock <string>` | tExT lIkE tHiS with a mocking SpongeBob image. |
| `=bs`, `=size` | Reports the size/ballsize of a user or object. |
| `=uuu` | Generates randomized gibberish syllables (e.g., `euxeuxbu`). |
| `=asscrack` | Animated sequence featuring Philip and the Coffin. |
| `=look`, `=neck` | Creates an elongating "looking" emoji. |
| `=howdy` | Random cowboy greeting. |

### Media & Memes
| Command | Description |
| --- | --- |
| `=sickos` | Random image from the `/sickos` folder. |
| `=random`, `=meme`| Random image from the `/img` folder. |
| `=vid`, `=save` | Saves a link to the server's pinboard channel. |
| `=friday` | Only works on Fridays in California. |
| **Media Tags** | Over 100+ keywords like `=whitebaby`, `=petercoin`, `=sickfuck`, `=beans`, `=zamn`, `=eepy`, `=ontonothing`, `=bogos`, etc. |

---
