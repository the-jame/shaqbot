const { Client, Partials, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const { OpenAI } = require("openai");
const randFile = require("select-random-file");
require("dotenv").config();

// --- 1. DATA IMPORT ---
const data = require("./data.js");
const { 
  subject, subjectirl, erW, erP, erC, things, 
  times, locations, reasons, ballsizes, 
  allEmoji, wtf, cummies 
} = data;

// --- 2. CLIENT SETUP ---
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const openai = new OpenAI({ organization: process.env.ORGANIZATION, apiKey: process.env.OPENAI_API_KEY });
const deepseek = new OpenAI({ baseURL: "https://api.deepseek.com", apiKey: process.env.DS_API_KEY });

// --- 3. GLOBAL VARIABLES ---
let ttsE = true, settings, owner, irl = false;
let wut1, wut2, wut3, eyesleft, realshit, ignored, ballCommand, thinkAss;
const spongeMocking = new AttachmentBuilder("img/mockingbob.jpg");

client.on("ready", () => {
  console.log(`Shaqbot logic loaded. Running as ${client.user.tag}`);
  try {
    settings = require("./settings.json");
    owner = settings.james;
    wut1 = settings.wut1; wut2 = settings.wut2; wut3 = settings.wut3;
    eyesleft = settings.eyesleft; realshit = settings.realshit;
    ignored = settings.ignored; ballCommand = settings.ballCommand;
    thinkAss = settings.thinkAss;
  } catch (e) { console.log("Settings load error."); }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // STICKER KILLER (Instantly delete that one specific sticker)
  if (message.stickers.size > 0 && message.stickers.first().id === "818597355619483688") {
    return message.delete().catch(() => {});
  }

  // MEAN AI LOGIC (30% chance on Mon/Tue/Wed)
  const n = new Date().getDay();
  const meanMode = (n === 1 || n === 2 || n === 3) && Math.random() < 0.3;

  const pref = "=";
  if (!message.content.startsWith(pref)) return;

  const args = message.content.slice(pref.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    // --- AI COMMANDS ---
    case "ai":
      message.channel.sendTyping();
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: meanMode ? "You are a rude, condescending assistant." : "You are a helpful assistant." },
            { role: "user", content: args.join(" ") },
          ],
        });
        message.reply(response.choices[0].message.content);
      } catch (e) { console.error(e); }
      break;

    case "ds":
      message.channel.sendTyping();
      try {
        const dsResponse = await deepseek.chat.completions.create({
          model: "deepseek-chat",
          messages: [{ role: "user", content: args.join(" ") }],
        });
        message.reply(dsResponse.choices[0].message.content);
      } catch (e) { console.error(e); }
      break;

    case "mao":
      message.channel.sendTyping();
      try {
        const maoResp = await deepseek.chat.completions.create({
          model: "deepseek-chat",
          messages: [{ role: "system", content: "You are Mao Zedong. Answer in riddles, both in Chinese and English. Be mysterious and authoritative." }, { role: "user", content: args.join(" ") }],
        });
        message.reply(maoResp.choices[0].message.content);
      } catch (e) { console.error(e); }
      break;

    // --- FRIDAY LOGIC (The Meme of the Day) ---
    case "friday":
      const today = new Date();
      if (today.getDay() === 5) {
        // It's Friday! 
        message.channel.send("https://tenor.com/view/friday-night-drinking-dance-gif-11535787");
      } else {
        message.reply("It is not Friday in California. This command only works on Fridays.");
      }
      break;

    // --- RANDOMIZERS ---
    case "who":
    case "whom":
      let whoPool = irl ? subjectirl : subject;
      message.channel.send(whoPool[Math.floor(Math.random() * whoPool.length)]);
      break;

    case "why":
    case "y":
      message.channel.send(`Because ${things[Math.floor(Math.random() * things.length)]} ${reasons[Math.floor(Math.random() * reasons.length)]}`);
      break;

    case "er":
      let erMsg = erP[Math.floor(Math.random() * erP.length)].replace("{w}", erW[Math.floor(Math.random() * erW.length)]);
      if (Math.random() < 0.3) erMsg += ` ${erC[Math.floor(Math.random() * erC.length)]} ${erW[Math.floor(Math.random() * erW.length)]}`;
      message.channel.send(`***${erMsg}***`);
      break;

    // --- ANIMATED/SPECIALS ---
    case "uuu":
      let uuu = "";
      const syl = ["eu", "xeu", "bu", "gue", "ma", "zo", "re", "pi"];
      for (let i = 0; i < 5; i++) uuu += syl[Math.floor(Math.random() * syl.length)];
      message.channel.send(uuu);
      break;

    case "asscrack":
      let m = await message.channel.send("Philip is looking for the coffin...");
      await new Promise(r => setTimeout(r, 1500));
      await m.edit("Philip found the coffin! ⚰️");
      await new Promise(r => setTimeout(r, 1500));
      await m.edit("Philip is inside the coffin. 🍑");
      break;

    case "mock":
      const mocked = args.join(" ").split("").map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join("");
      message.channel.send({ content: mocked, files: [spongeMocking] });
      break;

    // --- MEDIA ---
    case "sickos":
      randFile("sickos", (err, file) => {
        if (!err) message.channel.send({ files: [new AttachmentBuilder(`sickos/${file}`)] });
      });
      break;

    case "meme":
    case "random":
      randFile("img", (err, file) => {
        if (!err) message.channel.send({ files: [new AttachmentBuilder(`img/${file}`)] });
      });
      break;

    // --- THE DYNAMIC KEYWORD FALLBACK ---
    default:
      const fs = require('fs');
      const exts = ['.png', '.jpg', '.jpeg', '.gif', '.mp4'];
      for (const ext of exts) {
        if (fs.existsSync(`./img/${command}${ext}`)) {
          return message.channel.send({ files: [new AttachmentBuilder(`./img/${command}${ext}`)] });
        }
      }
      break;
  }
});

// Load settings and login
try {
  settings = require("./settings.json");
  client.login(settings.token);
} catch (e) {
  console.log("Failed to start: settings.json missing or token invalid.");
}
