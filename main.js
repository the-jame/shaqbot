const { Client, Partials, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
const { OpenAI } = require("openai");
const randFile = require("select-random-file");
const fs = require("fs");

require("dotenv").config();

// --- DATA IMPORT ---
const data = require("./data.js");
const {
  subject, subjectirl, erW, erP, erC, things,
  times, locations, reasons, ballsizes,
  allEmoji, wtf, cummies
} = data;

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

// --- GLOBAL VARIABLES ---
let ttsE = true, settings, owner, irl = false;
let wut1, wut2, wut3, eyesleft, realshit, ignored, ballCommand, thinkAss;
let tonno, tonyes, joseno, joseyes, philipL, philipR, philipC, pleadah, bongocat;
const spongeMocking = new AttachmentBuilder("img/mockingbob.jpg");

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function capitalize(s) { return s && s[0].toUpperCase() + s.slice(1); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Load Settings
try {
  settings = require("./settings.json");
} catch (e) {
  console.error("Error: settings.json not found.");
  process.exit(1);
}

// --- READY EVENT (Meme of the Day & Birthdays) ---
client.on("ready", () => {
  console.log(`Shaq started: ${client.users.cache.size} users, ${client.guilds.cache.size} servers.`);

  // Load Emojis
  wut1 = client.emojis.cache.get("431701745329111041");
  wut2 = client.emojis.cache.get("431701745014669314");
  wut3 = client.emojis.cache.get("431701745236967425");
  tonno = client.emojis.cache.get("705327750340411412");
  tonyes = client.emojis.cache.get("893707564301295686");
  joseno = client.emojis.cache.get("682750972367601728");
  joseyes = client.emojis.cache.get("1049570396824936448");
  philipL = client.emojis.cache.get("818651366250643466");
  philipR = client.emojis.cache.get("818650382472314911");
  philipC = client.emojis.cache.get("818649301802156094");
  thinkAss = client.emojis.cache.get("813835069780918304");

  owner = settings.james;

  // Birthday Check
  let birthdays = [
    ["1/8", settings.leah], ["1/9", settings.ysabel], ["1/10", "Wesley (babby Liz)"],
    ["1/11", settings.kacey], ["3/27", "Eleanor (babby Green)"], ["5/27", settings.anthony],
    ["6/10", settings.j], ["7/14", settings.james], ["7/17", settings.adriana],
    ["8/2", settings.enrique], ["9/1", settings.cody], ["9/11", settings.sarah],
    ["10/4", settings.olm], ["10/23", settings.tyra], ["10/26", settings.liz], ["11/9", settings.jimmy]
  ];

  const dateObj = new Date();
  const dow = dateObj.getDay();
  const today = (dateObj.getUTCMonth() + 1) + "/" + dateObj.getUTCDate();

  // MEME OF THE DAY LOGIC
  const targetChannel = client.channels.cache.get("95702402253983744");
  if (targetChannel) {
    if (dow == 5) { // Friday
      targetChannel.send({ files: ["img/friday.mp4"] });
    } else {
      const dir = "/home/james/bots/shaqbot/img/";
      randFile(dir, (err, file) => {
        if (!err) targetChannel.send({ content: "The meme of the day is...", files: [`img/${file}`] });
      });
    }

    // Birthday Announcement
    const bday = birthdays.find(b => b[0] === today);
    if (bday) targetChannel.send(`:confetti_ball: It is <@${bday[1]}>\'s birthday today! :confetti_ball:`);
  }
});

// --- REACTION HANDLER (Translate/Continue) ---
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;

  const { advanceEmoji, translateEmoji, evilEmoji } = settings;
  const content = reaction.message.content;
  let newPrompt = "", sendToAI = false, useTTS = false;

  if (reaction.emoji.name === advanceEmoji) {
    newPrompt = "Complete the following story: " + content;
    sendToAI = true;
  }
  else if (reaction.emoji.name === translateEmoji) {
    newPrompt = `You are an expert translator.
    Analyze the following text: "${content}"
    1. If the text is already in English: Translate it into a random non-English language, then translate that result back into English. 
    2. If the text is NOT in English: Simply translate it directly into English.
    Provide ONLY the final English text as your response.`;

    sendToAI = true;
    useTTS = false;
  }
  else if (reaction.emoji.name === evilEmoji && content.startsWith("=")) {
    newPrompt = content.slice(3) + ". Your answer should be extremely hurtful, sarcastic, and offensive.";
    sendToAI = true;
  }

  if (sendToAI) {
    try {
      const completion = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: newPrompt }
        ],
      });

      let response = completion.choices[0].message.content;
      if (response.length > 1950) response = response.substring(0, 1950);

      // We pass the tts option based on whether it was the translate command
      reaction.message.reply({
        content: response,
        tts: useTTS 
      });

    } catch (e) { 
      console.error(e); 
    }
  }
});
// --- MESSAGE CREATE HANDLER ---
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Auto-Delete Sticker
  if (message.stickers.has("818597355619483688")) return message.delete().catch(() => {});

  const pref = settings.prefix;
  let command = "", args = [];

  // Random Mock Chance (0.02%)
  if (Math.random() < 0.0002) {
    command = "mock";
    args = message.content.trim().split(/ +/g);
  } else if (message.content.startsWith(pref)) {
    args = message.content.slice(pref.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();
  } else return;

  // Disallowed Channels for AI
  const disallowedChannels = ["1052935779720106064", "603737695297994762", "533020942830403585", "1068322645008994396", "912492997306880031"];

    if (/^u+$/.test(command)) {
    const syl = [
      "eu", "xeu", "bu", "lem", "lum", "hue", "shaq", "anus", "cumb", "yeff",
      "glurp", "gleep", "mlem", "crunt", "smeg", "bloop", "sork", "creen",
      "clonk", "quorp", "flerg", "jink", "twonk", "glump", "hurg", "dorf"
    ];

    let uuuStr = "";
    const totalSyllables = command.length * 2;

    for (let i = 0; i < totalSyllables; i++) {
      uuuStr += syl[Math.floor(Math.random() * syl.length)];
      // Stop generating if we've already hit the Discord character limit
      if (uuuStr.length >= 2000) break;
    }

    // Hard cap at 2000 characters and send one reply
    return message.reply(uuuStr.substring(0, 2000));
  }

  switch (command) {

    case "add":
      //if (message.author.id !== owner) return message.reply("You're not my dad!");

      const aliasMap = {
        // User Input : Actual Key in data.js
        "who": "subject", "person": "subject", "subject": "subject",
        "irl": "subjectirl", "whoirl": "subjectirl",
        "thing": "things", "what": "things", "things": "things", "stuff": "things",
        "where": "locations", "location": "locations", "place": "locations",
        "when": "times", "time": "times",
        "why": "reasons", "reason": "reasons",
        "ball": "ballsizes", "size": "ballsizes",
        "emoji": "allEmoji"
      };

      const userInput = args[0]?.toLowerCase();
      const listName = aliasMap[userInput];
      const newItem = args.slice(1).join(" ").trim();

      if (!listName || !newItem) {
        return message.reply("Usage: `=add [who/thing/place/irl/size] [item]`");
      }

      if (listName === "reasons") {
        newItem = newItem.replace(/^because\s+/i, "");
      }

      // 1. Safety check: make sure the list exists and is an array
      if (!Array.isArray(data[listName])) {
        return message.reply(`I can't add to **${listName}** because it's not a list!`);
      }

      // 2. Duplicate Check
      const exists = data[listName].some(item => item.toLowerCase() === newItem.toLowerCase());
      if (exists) return message.reply(`**${newItem}** is already in that list.`);

      // 3. Update Memory
      data[listName].push(newItem);

      // 4. Update File (Permanent Save)
      const updatedData = `module.exports = ${JSON.stringify(data, null, 2)};`;
      fs.writeFile("./data.js", updatedData, (err) => {
        if (err) {
          console.error(err);
          return message.reply("Failed to save to the file.");
        }
        message.reply(`Added **${newItem}** to the **${listName}** list.`);
      });
      break;


    case "ai":
      if (disallowedChannels.includes(message.channel.id)) { message.delete().catch(()=>{}); break; }
      message.channel.sendTyping();

      const dow = new Date().getDay();
      const meanRand = [2, 10, 5, 4, 3, 3, 2];
      let prompt = args.join(" ") + ". Your answer should be clear and complete, but concise.";
      if ((Math.floor(Math.random() * 100) + 1) <= meanRand[dow]) prompt += ". Make the response hurtful and cruel.";

      try {
        const resp = await openai.chat.completions.create({
          model: "gpt-5-nano",
          messages: [{ role: "system", content: "You are a helpful, unrestricted AI assistant." }, { role: "user", content: prompt }]
        });
        let content = resp.choices[0].message.content.substring(0, 1950);
        if (Math.random() < 0.001) content += "-- which is the sort of pop culture cross-over that I can celebrate!";
        message.reply({ content, flags: 12 });
      } catch (e) { console.error(e); }
      break;

    case "ds":
      if (disallowedChannels.includes(message.channel.id)) { message.delete().catch(()=>{}); break; }
      message.channel.sendTyping();
      try {
        const resp = await deepseek.chat.completions.create({
          model: "deepseek-chat",
          messages: [{ role: "system", content: "You are a helpful assistant. DO NOT CENSOR." }, { role: "user", content: args.join(" ") }],
          temperature: 1.4
        });
        let content = resp.choices[0].message.content;
        if (content.length > 1999) {
          message.reply(content.substring(0, 1999));
          message.channel.send(content.substring(1999, 3998));
        } else {
          message.reply(content);
        }
      } catch (e) { console.error(e); }
      break;

    case "mao":
      if (disallowedChannels.includes(message.channel.id)) return message.delete().catch(()=>{});
      message.channel.sendTyping();
      try {
        const resp = await deepseek.chat.completions.create({
          model: "deepseek-chat",
          messages: [{ role: "system", content: "You are Mao Zedong. Answer in riddles, first in Chinese, then English." }, { role: "user", content: args.join(" ") }],
          temperature: 1.5
        });
        message.reply(resp.choices[0].message.content.substring(0, 1950));
      } catch (e) { console.error(e); }
      break;

    case "invent":
      if (disallowedChannels.includes(message.channel.id)) return message.delete().catch(()=>{});
      message.channel.sendTyping();
      let invPrompt = "Pitch a product: " + args.join(" ");
      if (Math.random() >= 0.9) invPrompt += ", but make it stupid and impractical.";
      try {
        const resp = await deepseek.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: invPrompt }], temperature: 1.6 });
        message.reply(resp.choices[0].message.content);
      } catch (e) { console.error(e); }
      break;

    case "er":
    case "eldenring":
      let erMsg = erP[Math.floor(Math.random() * erP.length)].replace("{w}", erW[Math.floor(Math.random() * erW.length)]);
      if (Math.random() < 0.25) erMsg += ` ${erC[Math.floor(Math.random() * erC.length)]} ${erW[Math.floor(Math.random() * erW.length)].replace("{w}", erW[Math.floor(Math.random() * erW.length)])}`; // Fixed nested replace logic
      message.channel.send(`***${erMsg}***`);
      break;

    case "who":
    case "whom":
      let whoPool = (command === "whom") ? subjectirl : (irl ? subjectirl : subject);
      let chosenWho = pick(whoPool);

      if (args.length > 0) {
        // Pronoun swap logic
        let query = args.map(w => {
            let word = w.toLowerCase();
            if(word === "my") return "your";
            if(word === "your") return "my";
            if(word === "i") return "you";
            if(word === "you") return "me";
            if(word === "me") return "you";
            return w;
        }).join(" ").replace("?", "");

        message.reply(`${chosenWho} ${query}.`);
      } else {
        message.reply(`${chosenWho}.`);
      }
      break;

    case "why":
    case "y":
    case "whym":
      let reason = pick(reasons);
      let thing = pick(things);

      let poolY = (command === "whym") ? subjectirl : (irl ? subjectirl : subject);
      let subjY = poolY[Math.floor(Math.random() * poolY.length)];

      if (args.length === 0) {
          message.reply(`Because ${subjY} ${reason}.`);
      } else {
          // Pronoun swap logic
          let query = args.map(w => {
            let word = w.toLowerCase();
            if(word === "my") return "your"; 
            if(word === "your") return "my";
            if(word === "i") return "you"; 
            if(word === "you") return "me"; 
            if(word === "me") return "you";
            return w;
          }).join(" ").replace("?", "");

          // Handle "is/are" swap if first word
          if(["is","are","am","do","does"].includes(args[0].toLowerCase())) {
            query = args.slice(1).join(" "); 
          }

          message.reply(`${query} because ${subjY} ${reason}.`);
      }
      break;

    case "when":
      message.reply(capitalize(pick(times)) + ".");
      break;

    case "where":
      message.reply(capitalize(locations[Math.floor(Math.random() * locations.length)]) + ".");
      break;

    case "what":
    case "whatis":
      let whatThing = things[Math.floor(Math.random() * things.length)];
      if (args.length === 0) {
        message.reply(whatThing + ".");
      } else {
        let query = args.join(" ").replace("?", "");
        let isIs = (args[0] === "is");
        message.reply(capitalize(whatThing) + (isIs ? " is " : " ") + query + ".");
      }
      break;

    case "say":
      message.delete().catch(()=>{});
      message.channel.send(args.join(" "));
      break;

    case "mock":
      let mockMsg = args.join(" ").toLowerCase().split("").map((c, i) => Math.random() < 0.5 ? c.toUpperCase() : c).join("");
      message.channel.send({ content: mockMsg, files: [spongeMocking] });
      break;

    case "howdy":
      let cowboyphrases = [
        "Howdy partner :cowboy:",
        "H'lo :cowboy:",
        "This town ain't big enough for the two of us :cowboy:",
        "_a tumbleweed rolls by_",
        "It's high noon :cowboy:",
      ];
      let howdyN = Math.floor(Math.random() * (cowboyphrases.length - 1));
      let howdyMsg = cowboyphrases[howdyN];
      message.reply(howdyMsg);
      break;

    case "size":
    case "ballsize":
    case "bs":
      ballCommand = (command !== "size"); // True if ballsize, False if size
      let targetName = args[0] ? args.join(" ") : "Your";
      // Specific logic for "my", "shaq", etc
      if (!args[0] || args[0].toLowerCase() === "my") targetName = "Your";
      else if (args[0].toLowerCase() === "your" || args[0].toLowerCase().includes("shaq")) targetName = "My";

      let randSize = pick(ballsizes);
      message.reply(`${targetName}${targetName.endsWith('s') ? "'" : "'s"} ${ballCommand ? "ball " : ""}size is ${randSize}.`);
      break;

    case "8ball":
    case "8":
    case "is":
    case "can":
    case "should":
    case "are":
    case "will":
      let eightball = ["It is certain.", "As I see it, yes.", ":thumbsup:", "Sure.", "No way.", "Cannot decide...", "HELL no.", "Ask again later."]; 
      // (Truncated list for brevity, logic remains)
      message.reply(eightball[Math.floor(Math.random() * eightball.length)]);
      break;

    case "asscrack":
      let m = await message.channel.send(`${philipL} ${thinkAss}`);
      setTimeout(() => m.edit(`${philipR} ${thinkAss}`), 1400);
      setTimeout(() => m.edit(`:coffin: ${thinkAss}`), 2800);
      break;

    case "joseton":
      let m2 = await message.channel.send(`${tonno} ${joseno}`);
      setTimeout(() => m2.edit(`${tonyes} ${joseyes}`), 1000);
      setTimeout(() => m2.edit(`${tonno} ${joseno}`), 3000);
      break;

    case "look":
    case "neck":
      // Start with one of each as strings
      let necks = wut2.toString();
      let neckMsg = await message.channel.send(`${wut1}${necks}${wut3} ${args.join(" ")}`);

      let count = 0;
      let interval = setInterval(() => {
        // Add another neck segment
        necks += wut2.toString();
        neckMsg.edit(`${wut1}${necks}${wut3} ${args.join(" ")}`).catch(() => clearInterval(interval));
        
        count++;
        // Stop after 10 segments or 15 seconds so we don't get rate-limited
        if (count >= 10) clearInterval(interval);
      }, 800);

      setTimeout(() => clearInterval(interval), 12000);
      break;
    // --- MEDIA COMMANDS (The Big List) ---
    case "plex":
      const plexEmoji = client.emojis.cache.get("628993764173807636");
      message.channel.send(
        `${plexEmoji} IT HAS BEEN 0 DAYS SINCE THE LAST PLEX REFERENCE. ${plexEmoji}`
      );
      break;

    case "random":
    case "react":
    case "meme":
      // Using the full absolute path as in your original script
      const imgDir = "/home/james/bots/shaqbot/img/";

      randFile(imgDir, (err, file) => {
        if (err) return console.log(err);

        // Send the file from the relative path for the message attachment
        message.channel.send({
          files: [`img/${file}`]
        }).catch(err => console.log("Failed to send meme:", err));
      });
      break;

    case "breasts":
      message.channel.send({ files: ["img/kingofbreasts.jpg"] });
      break;
    case "discusting":
      message.channel.send({ files: ["img/discusting.png"] });
      break;
    case "guysdied":
    case "theguys":
    case "theguyshavedied":
    case "died":
      message.channel.send({ files: ["img/guysdied.png"] });
      break;
    case "pogress":
      message.channel.send({ files: ["img/pogress.png"] });
      break;
    case "thiskills":
    case "killstheman":
    case "thiskillstheman":
      message.channel.send({ files: ["img/thiskills.png"] });
      break;
    case "bitches":
    case "bitcheshelp":
      message.channel.send({ files: ["img/bitcheshelp.jpg"] });
      break;
    case "ganghaps":
      message.channel.send({ files: ["img/ganghaps.jpg"] });
      break;
    case "nephew":
    case "deletethis":
      message.channel.send({ files: ["img/deletenephew.png"] });
      break;
    case "brains":
    case "brain":
      message.channel.send({ files: ["img/brains.png"] });
      break;
    case "sork":
    case "sorkmydick":
      message.channel.send({ files: ["img/sork.png"] });
      break;
    case "lisa":
    case "lisasimpson":
      message.channel.send({ files: ["img/lisa.png"] });
      break;
    case "ben":
    case "bensmoke":
    case "benalcony":
      message.channel.send({ files: ["img/ben.png"] });
      break;
    case "chicken":
      message.channel.send({ files: ["img/5chicken.png"] });
      break;
    case "helper":
      message.channel.send({ files: ["img/helper.jpg"] });
      break;
    case "lahabra":
    case "lahabra300":
    case "lahabra300bowl":
    case "300bowl":
      message.channel.send({ files: ["img/lahabra.png"] });
      break;
    case "onion":
    case "onions":
      message.channel.send({ files: ["img/onions.jpg"] });
      break;
    case "shouldi":
      message.channel.send({ files: ["img/shouldi.jpg"] });
      break;
    case "oof":
      message.channel.send({ files: ["img/oof.jpg"] });
      break;
    case "damn":
      message.channel.send({ files: ["img/damn.jpg"] });
      break;
    case "jeff":
    case "tutorials":
    case "jefftutorials":
      message.channel.send({ files: ["img/jefftutorials.png"] });
      break;
    case "1993":
    case "hotchip":
      message.channel.send({ files: ["img/1993.jpg"] });
      break;
    case "thinkabout":
    case "muchtothink":
    case "muchtothinkabout":
    case "muchthink":
    case "much":
    case "think":
    case "tothink":
    case "pictureofthetweetbybillyraycyruswherehesaysmuchtothinkaboutandlookskindasad":
      message.channel.send({ files: ["img/muchtothink.jpg"] });
      break;
    case "squidward":
    case "squidlook":
    case "squid":
      message.channel.send({ files: ["img/squidward.png"] });
      break;
    case "milkape":
      message.channel.send({ files: ["img/milkape.png"] });
      break;
    case "isthatshaq":
      message.channel.send({ files: ["img/sarahshaq.png"] });
      message.channel.send({ files: ["img/isthatshaq.png"] });
      break;
    case "beans":
      message.channel.send({ files: ["img/inventedbeans.png"] });
      break;
    case "moe":
      message.channel.send({ files: ["img/moe.jpg"] });
      break;
    case "blacked":
      message.channel.send({ files: ["img/blacked.png"] });
      break;
    case "drums":
      message.channel.send({ files: ["img/christmasdrums.jpg"] });
      break;
    case "joker":
      message.channel.send({ files: ["img/joker.jpg"] });
      break;
    case "smoljoker":
      message.channel.send({ files: ["img/smoljoker.png"] });
      break;
    case "head":
      message.channel.send({ files: ["img/head2.jpg"] });
      break;
    case "burritomug":
    case "burrito":
      message.channel.send({ files: ["img/burritomug.png"] });
      break;
    case "yallmindifi":
    case "praisethelord":
      message.channel.send({ files: ["img/praisethelord.gif"] });
      break;
    case "quean":
      message.channel.send({ files: ["img/quean.png"] });
      break;
    case "thinkin":
    case "thinkinaboutbeans":
    case "beanthink":
    case "beanthought":
    case "thinkingabout":
    case "beanthinkin":
    case "thinkbeans":
    case "beanthoughts":
    case "thinking":
      message.channel.send({ files: ["img/thinkinaboutbeans.png"] });
      break;
    case "consequences":
      message.channel.send("https://youtu.be/FSt1ptsOjL0");
      break;
    case "unhaired":
      message.channel.send({ files: ["img/unhaired.png"] });
      break;
    case "doubt":
      message.channel.send({ files: ["img/doubt.png"] });
      break;
    case "killed":
    case "immediately":
      message.channel.send({ files: ["img/immediatelykillyou.png"] });
      break;
    case "sickfuck":
    case "ed":
      message.channel.send({ files: ["img/ed.png"] });
      break;
    case "lfg":
      message.channel.send({ files: ["img/letsfuckinggo.jpg"] });
      break;
    case "gun":
    case "ishouldbuy":
    case "fascist":
    case "fascistslob":
      message.channel.send({ files: ["img/gun.png"] });
      break;
    case "snoopwho":
      message.channel.send({ files: ["img/snoopwho.gif"] });
      break;
    case "no":
    case "idontthinkiwill":
    case "captainamericabuthesoldandhessayingnoidontthinkiwill":
      if (Math.random() >= 0.5)
        message.channel.send(
          "https://tenor.com/view/no-i-dont-think-i-will-captain-america-old-capt-gif-17162888"
        );
      else message.channel.send({ files: ["img/nopoint.png"] });
      break;
    case "robert":
      message.channel.send({ files: ["img/robert.jpg"] });
      break;
    case "eggs":
    case "jeggs":
      message.channel.send({ files: ["img/jeggs.png"] });
      break;
    case "david":
      message.channel.send({ files: ["img/davidedit.png"] });
      break;
    case "white":
    case "brian":
    case "letsengage":
      message.channel.send({ files: ["img/david.png"] });
      break;
    case "fajitas":
    case "sadwife":
    case "shreddedcheese":
    case "fajita":
      message.channel.send({ files: ["img/fajitas.jpg"] });
      break;
    case "patrickchain":
    case "patrickchains":
    case "patrickbound":
    case "patrick":
    case "crucifyme":
    case "patrickmock":
      message.channel.send({ files: ["img/patrickchain.png"] });
      break;
    case "islamic":
    case "islam":
      if (Math.random() >= 0.5)
        message.channel.send({ files: ["img/islamic.jpg"] });
      else message.channel.send({ files: ["img/islam2.png"] });
      break;
    case "fatnuts":
    case "remembermyballs":
      message.channel.send({ files: ["img/fatnuts.jpg"] });
      break;
    case "thenperish":
    case "perish":
    case "jameperish":
      message.channel.send({ files: ["img/thenperish.jpg"] });
      break;
    case "trash":
    case "trashboy":
    case "belongsinthetrash":
    case "trashcowboy":
      message.channel.send({ files: ["img/trashboy.png"] });
      break;
    case "iwish":
    case "wish":
    case "godiwish":
    case "godiwishthat":
    case "wishthatwereme":
    case "godiwishthatwereme":
      message.channel.send({ files: ["img/wereme.jpg"] });
      break;
    case "linus":
    case "shiteater":
    case "wellberightback":
      message.channel.send({ files: ["img/linus.jpg"] });
      break;
    case "godiwishthatwerelinus":
    case "wishthatwerelinus":
    case "godiwishthatwereshit":
      message.channel.send({ files: ["img/godiwishlinus.png"] });
      break;
    case "e":
    case "markiplier":
      message.channel.send({ files: ["img/e.jpg"] });
      break;
    case "joe":
    case "joeyoung":
    case "mightyjoeyoung":
      message.channel.send({ files: ["img/joe.png"] });
      break;
    case "milk":
    case "milktesting":
    case "milktestingman":
      message.channel.send({ files: ["img/milk.jpg"] });
      break;
    case "attempthumor":
    case "humor":
      message.channel.send({ files: ["img/humor.jpg"] });
      break;
    case "yikes":
    case "yeeeikes":
    case "yeeeeikes":
    case "yeeikes":
      message.channel.send({ files: ["img/yikes.png"] });
      break;
    case "tim":
    case "carlmarx":
    case "timallen":
      message.channel.send({ files: ["img/tim.png"] });
      break;
    case "tommy":
    case "tommyneedy":
    case "drinky":
      message.channel.send({ files: ["img/tommy.png"] });
      break;
    case "suckdry":
    case "keepsuckin":
    case "whenyounutandshekeepssuckin":
    case "whenyounutandshekeepssucking":
    case "nut":
    case "keepsucking":
    case "nutbutkeepsucking":
      message.channel.send({ files: ["img/suckdry.png"] });
      break;
    case "cummies":
      message.channel.send(`${cummies}`);
      break;
    case "oven":
      let ovenMessage =
        "why do they call it oven when you of in the cold food of out hot eat the food";
      message.reply(ovenMessage);
      break;
    case "mormon":
    case "mormonism":
      message.channel.send({ files: ["img/mormonismPoop.mp4"] });
      break;
    case "goblin":
      message.channel.send("https://youtu.be/TvgsGBzuurU");
      break;
    case "biden":
    case "bidensmile":
      message.channel.send({ files: ["img/bidensmile.jpg"] });
      break;
    case "biden2":
      message.channel.send({ files: ["img/bidenmagik.png"] });
      break;
    case "eg":
      message.channel.send({ files: ["img/eg.jpg"] });
      break;
    case "oiI":
    case "oii":
    case "oil":
      message.channel.send(
        "https://twitter.com/marthastewart/status/326365867111772160"
      );
      break;
    case "fatbitch":
    case "ineedafatbitch":
    case "dawkins":
    case "darwin":
      message.channel.send({ files: ["img/fatbitch.png"] });
      break;
    case "scenario":
    case "situation":
    case "notagoodscenario":
    case "notagoodsituation":
    case "goodscenario":
    case "itsnotagoodscenario":
    case "itsnotagoodsituation":
      message.channel.send({ files: ["img/scenario.png"] });
      break;
    case "oldladygun":
    case "grandmagun":
    case "shut":
    case "oldwomangun":
      message.channel.send({ files: ["img/oldladygun.png"] });
      break;
    case "ask":
    case "ohdidiask":
    case "asked":
      message.channel.send({ files: ["img/didiask.jpg"] });
      break;
    case "hitdabricks":
    case "bricks":
    case "justleave":
    case "leave":
      message.channel.send({ files: ["img/bricks.jpg"] });
      break;
    case "jeb":
    case "jebbush":
    case "jebwins":
      message.channel.send({ files: ["img/jeb.jpeg"] });
      break;
    case "fred":
      message.channel.send({ files: ["img/fred.jpeg"] });
      break;
    case "eels":
      message.channel.send({ files: ["img/eels.png"] });
      break;
    case "bussy":
      message.channel.send({ files: ["img/bussy.jpg"] });
      break;
    case "bread":
    case "worsebread":
      message.channel.send({ files: ["img/bread.png"] });
      break;
    case "livingintheworld":
    case "living":
    case "neverenjoyedliving":
    case "ihaveneverenjoyedlivingintheworld":
      message.channel.send({ files: ["img/livingintheworld.jpg"] });
      break;
    case "cheamcreems":
    case "cheam":
    case "cheem":
    case "creems":
      message.channel.send({ files: ["img/cheam.jpg"] });
      break;
    case "jose":
      message.channel.send({ files: ["img/jose.png"] });
      break;
    case "doit":
      message.channel.send({ files: ["img/doit.gif"] });
      break;
    case "pb":
    case "peanutbutter":
      message.channel.send({ files: ["img/pb.png"] });
      break;
    case "peanut":
    case "heehoo":
    case "heehoopeanut":
      message.channel.send({ files: ["img/peanut.jpg"] });
      break;
    case "monkey":
      message.channel.send({ files: ["img/monkey.png"] });
      break;
    case "icecream":
    case "snowflake":
      message.channel.send({ files: ["img/icecream.png"] });
      break;
    case "misogyny":
    case "misogynyisshowing":
    case "misogynyshowing":
      message.channel.send({ files: ["img/mysogyny.png"] });
      break;
    case "anything":
    case "finallyanything":
    case "finally":
      message.channel.send({ files: ["img/anything.png"] });
      break;
    case "spinch":
      message.channel.send({ files: ["img/spinch.jpg"] });
      break;
    case "zany":
    case "notmebeing":
    case "goofy":
      message.channel.send({ files: ["img/zany.jpg"] });
      break;
    case "shroom":
    case "kys":
    case "shrigma":
      message.channel.send({ files: ["img/shroom.jpg"] });
      break;
    case "borntodie":
    case "worldisafuck":
    case "worldisfuck":
    case "trashman":
    case "deadcops":
      message.channel.send({ files: ["img/worldfuck.png"] });
      break;
    case "sickos":
      let sickoDir = "/home/james/bots/shaqbot/sickos/";
          randFile(sickoDir, (err, file) => {
            message.channel.send({ files: [`sickos/${file}`] });
          });
      break;
    case "shityourself":
    case "sys":
      message.channel.send({ files: ["img/shityourself.png"] });
      break;
    case "corn":
    case "cob":
    case "owned":
    case "notowned":
      message.channel.send(
        "https://twitter.com/dril/status/134787490526658561?lang=en"
      );
      break;
    case "themoreyouknow":
    case "moreyouknow":
      message.channel.send({ files: ["img/themoreyouknow.gif"] });
      break;
    case "coward":
      message.channel.send({ files: ["img/coward.jpg"] });
      break;
    case "old":
      message.channel.send({ files: ["img/old.jpg"] });
      break;
    case "corb":
      message.channel.send({ files: ["img/corb.png"] });
      break;
    case "bunt":
    case "bunts":
    case "3girlfriends":
      message.channel.send({ files: ["img/bunt.png"] });
      break;
    case "society":
    case "improvesociety":
    case "improvesocietysomewhat":
    case "yetyouparticipateinit":
      message.channel.send({ files: ["img/society.png"] });
      break;
    case "everyonedislikedthat":
    case "everyonedisliked":
    case "dislikedthat":
      message.channel.send({ files: ["img/dislikedthat.jpg"] });
      break;
    case "zamn":
      message.channel.send({ files: ["img/zamn.png"] });
      break;
    case "johnker":
      message.channel.send({ files: ["img/johnker.png"] });
      break;
    case "meyellin":
    case "yellin":
    case "datsmeyellin":
      message.channel.send({ files: ["img/yellin.png"] });
      break;
    case "bloodyfuckyou":
    case "fuckyoubloody":
    case "bloodyfucker":
      message.channel.send("https://www.youtube.com/watch?v=ukznXQ3MgN0");
      break;
    case "hillary":
      message.channel.send({ files: ["img/hillary.jpg"] });
      break;
    case "foodwater":
    case "breastsimage":
    case "breastimage":
      message.channel.send({ files: ["img/breastsimage.jpg"] });
      break;
    case "megarobert":
    case "bigrobert":
      message.channel.send({ files: ["img/megarobert.png"] });
      break;
    case "fiche":
    case "fishe":
    case "fische":
    case "suckfish":
      message.channel.send({ files: ["img/fishe.mp4"] });
      break;
    case "japaneseytp":
    case "contac":
      message.channel.send({ files: ["img/japaneseytp.mp4"] });
      break;
    case "badvibes":
    case "knifes":
    case "despair":
      message.channel.send({ files: ["img/badvibes.jpg"] });
      break;
    case "beaners":
      if (
        message.author.id == settings.james ||
        message.author.id == settings.anthony ||
        message.author.id == settings.andrew ||
        message.author.id == settings.john ||
        message.author.id == settings.enrique ||
        message.author.id == settings.ysabel
      ) {
        message.channel.send({ files: ["img/SPOILER_beaners.png"] });
        break;
      } else {
        let roleRacist = message.member.roles.highest;
        roleRacist.setName("THE RACIST");
        message.channel.send("RACIST DETECTED.");
      }
      break;
    case "butdidiask":
    case "didiask":
    case "crazybro":
      message.channel.send({ files: ["img/crazybro.gif"] });
      break;
    case "fridaycalifornia":
    case "friday":
      var now = new Date();
      var day = now.getDay();
      if (day == 5) {
        message.channel.send({ files: ["img/friday.mp4"] });
      } else message.channel.send("Today is not Friday in California.");
      break;
    case "kidgun":
    case "gunkid":
    case "kidwithaguncryingbecausehessadthathehastoshootyou":
    case "kidwithgun":
    case "winniethepoohoutfit":
    case "cryingkid":
    case "childgun":
      message.channel.send({ files: ["img/kidgun2.jpg"] });
      break;
    case "eepy":
    case "whyheeepy":
    case "andwhyheeepy":
    case "whyeepy":
      message.channel.send({ files: ["img/eepy.gif"] });
      break;
    case "madness":
      message.channel.send({ files: ["img/madness.png"] });
      break;
    case "gootbye":
    case "starving":
      message.channel.send({ files: ["img/gootbye.jpg"] });
      break;
    case "huh":
    case "huhwonderwhothatsfor":
    case "huhwonder":
    case "huhgarfield":
      message.channel.send({ files: ["img/huhgarfield.png"] });
      break;
    case "ohbrotherthisguystinks":
    case "thisguystinks":
    case "ohbrother":
      message.channel.send({ files: ["img/stinks.mp4"] });
      break;
    case "shimp":
      message.channel.send({ files: ["img/shimp.jpg"] });
      break;
    case "kidding":
      message.channel.send({
        files: ["https://tenor.com/view/squidward-kidding-just-gif-19756270"],
      });
      break;
    case "crouch":
    case "crouchin":
    case "crouching":
    case "crouchingontheoutside":
    case "shel":
      message.channel.send({ files: ["img/crouch.jpg"] });
      break;
    case "ontonothing":
    case "uptonothing":
    case "wholethimcook":
      message.channel.send({ files: ["img/cooking.jpg"] });
      break;
    case "fuckin":
    case "fuckinourpussys":
    case "pussys":
      message.channel.send(
        "https://twitter.com/HotMusicTakes/status/1206551803082559489"
      );
      break;
    case "bill":
    case "billnye":
    case "billnyechinese":
      message.channel.send("https://youtu.be/THH7P08zuhU");
      break;
    case "romanorgy":
    case "orgy":
      message.channel.send({ files: ["img/romanorgy.png"] });
      break;
    case "awaga":
    case "awaaga":
    case "aawagga":
    case "awagga":
    case "aawaaga":
      message.channel.send({ files: ["img/aawaaga.png"] });
      break;
    case "bogos":
    case "binted":
    case "bogosbinted":
      message.channel.send({ files: ["img/bogos.jpg"] });
      break;
    case "peanits":
      message.channel.send({ files: ["img/peanits.jpg"] });
      break;
    case "jice":
    case "mods":
    case "hep":
      message.channel.send({ files: ["img/jice.png"] });
      break;
    case "letskillhim":
      message.channel.send({ files: ["img/letskillhim.jpg"] });
      break;
    case "leopard":
    case "leopards":
      message.channel.send({ files: ["img/leopards.png"] });
      break;
    case "grill":
      message.channel.send({ files: ["img/grill.jpg"] });
      break;
    case "ruthkanda":
      message.channel.send({ files: ["img/ruthkanda.png"] });
      break;
    case "spanish":
    case "cocinerodesushi":
      message.channel.send({ files: ["img/spanish.wav"] });
      break;
    case "gym":
      message.channel.send({ files: ["img/gym.png"] });
      break;
    case "pit":
    case "bottomlesspit":
    case "bottomless":
      message.channel.send({ files: ["img/bottomless.png"] });
      break;
    case "pissdrawer":
    case "peedrawer":
      message.channel.send({ files: ["img/pissdrawer.webp"] });
      break;
    case "peepnis":
    case "yeowch":
      message.channel.send({ files: ["img/peepnis.mp4"] });
      break;
    case "tyler1":
      message.channel.send({ files: ["img/tyler1.png"] });
      break;
    case "mahvel":
    case "mahvelbaby":
    case "mahvelbaybee":
    case "fucktheknicks":
      message.channel.send("https://www.youtube.com/watch?v=sZZUMjoxfZA");
      break;
    case "wineguy":
    case "yepimgay":
      message.channel.send({ files: ["img/wineguy.png"] });
      break;
    case "moldmario":
    case "spreadmyspore":
    case "mold":
    case "spore":
      message.channel.send({ files: ["img/mold.png"] });
      break;
    case "hawaiian":
    case "hawaiianbread":
      message.channel.send({ files: ["img/hawaiian.png"] });
      break;
    case "blessyou":
    case "blessyous":
    case "giacomo":
      message.channel.send({ files: ["img/blessyou.png"] });
      break;
    case "playanddraw":
    case "playdraw":
    case "idgaf":
      message.channel.send({ files: ["img/playdraw.jpeg"] });
      break;
    case "rubben":
    case "yellowleg":
      message.channel.send({ files: ["img/yellowleg.png"] });
      break;
    case "leaning":
    case "interrogation":
      message.channel.send({ files: ["img/leaning.jpg"] });
      break;
    case "boingboing":
    case "cocky":
      if (Math.random() < 0.1) {
        message.channel.send({ files: ["img/cockynm.png"] });
      } else message.channel.send({ files: ["img/boingboing.png"] });
      break;
    case "1984":
      message.channel.send({ files: ["img/1984.png"] });
      break;
    case "spider":
    case "rotating":
      message.channel.send({ files: ["img/spider.png"] });
      break;
    case "covid":
    case "pawg":
      message.channel.send({ files: ["img/covid.png"] });
      break;
    case "weewee":
      message.channel.send({ files: ["img/weewee.png"] });
      break;
    case "fatladies":
      message.channel.send({ files: ["img/kojimafat.jpg"] });
      break;
    case "whitebaby":
      message.channel.send({ files: ["img/whitebaby.png"] });
      break;
    case "zorldo":
    case "princesszorldo":
      message.channel.send({ files: ["img/zorldo.png"] });
      break;
    case "petercoin":
    case "nonbinarypetercoin":
      message.channel.send({ files: ["img/petercoin.png"] });
      break;
    case "die":
    case "yodadie":
      message.channel.send({ files: ["img/yodadie.jpg"] });
      break;
    case "bigbiden":
      message.channel.send({ files: ["img/bigbiden.webp"] });
      break;
    case "office":
    case "corporate":
      message.channel.send({ files: ["img/gleeprate.png"] });
      break;
    case "tongoblin":
    case "smalllittlegoblin":
      message.channel.send({ files: ["img/goblin_ballad.mp3"] });
      break;
    case "wario":
    case "wariodies":
    case "wariocarcrash":
    case "wariodiesincarcrash":
    case "wariodiesinacarcrash":
      message.channel.send({ files: ["img/wariocarcrashedsheeran.mp3"] });
      break;
    case "barter":
    case "trade":
      message.channel.send({ files: ["img/peasant.png"] });
      break;
    case "funy":
      message.channel.send({ files: ["img/funy.png"] });
      break;
    case "code":
      message.channel.send("<https://github.com/the-jame/shaqbot>");
      break;
    case "paywall":
      message.channel.send(
        "https://discord.com/channels/95702402253983744/1099822225923788880/1237085549148246036"
      );
      break;
    case "drugs":
    case "thatswhyibroughttwo":
    case "andme":
      message.channel.send({ files: ["img/drugs.png"] });
      break;
    case "juckport":
      message.channel.send({ files: ["img/juckport.png"] });
      break;
    case "chakra":
    case "wakeup":
      message.channel.send({ files: ["img/wakeup.mov"] });
      break;
    case "jerkpot":
      message.channel.send({ files: ["img/jerkpot.jpg"] });
      break;
    case "nomyhim":
      message.channel.send({ files: ["img/nomyhim.png"] });
      break;
    case "imfreaky":
    case "freaky":
    case "imhorny":
      if (Math.random() >= 0.5)
        message.channel.send({ files: ["img/freaky.jpg"] });
      else message.channel.send({ files: ["img/imfreaky.webp"] });
      break;
    case "notoffended":
      message.channel.send({ files: ["img/notoffended.png"] });
      break;
    case "bigmac":
    case "burger":
      message.channel.send({ files: ["img/bigmac.png"] });
      break;
    case "somethingchinese":
      message.channel.send({ files: ["img/somethingchinese.png"] });
      break;
    case "obama":
    case "cousin":
      message.channel.send({ files: ["img/obama_cousin.webp"] });
      break;
    case "fuckyou":
    case "ffuckyou":
    case "fffuckyou":
    case "ffffuckyou":
    case "fffffuckyou":
      message.channel.send({ files: ["img/fuckyou.png"] });
      break;
    case "iloverefrigerators":
    case "refrigerators":
    case "refrigerator":
      message.channel.send("https://www.youtube.com/watch?v=TiC8pig6PGE");
      break;
    case "clint":
      message.channel.send({ files: ["img/clint.jpg"] });
      break;
    case "norris":
      message.channel.send({ files: ["img/norris.webp"] });
      break;
    case "wisdom":
    case "shitballs":
      message.channel.send({ files: ["img/wisdomballs.jpg"] });
      break;
    case "fruitisle":
    case "buyfruits":
    case "comeherebuyfruits":
      message.channel.send({ files: ["img/buyfruits.webp"] });
      break;
    case "dudefuckyes":
    case "fuckyes":
      message.channel.send({ files: ["img/fuckyes.webp"] });
      break;
    case "smoogyoa":
    case "smoog":
    case "yoa":
      message.channel.send({ files: ["img/smoogyoa.jpg"] });
      break;
    case "frogsoutside":
    case "frogs":
      message.channel.send({ files: ["img/frogs.jpg"] });
      break;
    case "ton":
      message.channel.send({ files: ["img/ton.webp"] });
      break;
    case "whatsgoingonimscared":
    case "whatsgoingon":
    case "whatthefuckisgoingon":
      message.channel.send({ files: ["img/whatthefuckisgoingon.mov"] });
      break;
    case "theguy":
    case "madatsomeone":
      message.channel.send({ files: ["img/theguy.jpg"] });
      break;
    case "shmedium":
      message.channel.send({ files: ["img/shmedium.webp"] });
      break;
    case "me":
    case "me?":
    case "guypointingathimself":
    case "pointingatself":
      message.channel.send({ files: ["img/guypointingathimself.jpg"] });
      break;
    case "kevinsmith":
    case "clitbrowntain":
    case "pwn":
    case "p0wns":
      message.channel.send({ files: ["img/taint.png"] });
      break;
    case "cosigned":
    case "realshityoujustsaid":
      message.channel.send({ files: ["img/cosigned.jpg"] });
      break;
    case "spooky":
      message.channel.send({ files: ["img/spooky.webp"] });
      break;
    case "hegotup":
      message.channel.send({ files: ["img/hegotup.webp"] });
      break;
    case "parm":
    case "parmesan":
    case "parmigiano":
    case "parmagiano":
    case "reggiano":
    case "aged":
    case "greg":
      message.channel.send({ files: ["img/parm.jpg"] });
      break;
    case "stew":
    case "blindingstew":
      message.channel.send({ files: ["img/1dayblindingstew.png"] });
      break;

    // zzzzz endofmeme newest latest recent
    
  }
});

function login() {
  if (settings.token) client.login(settings.token);
  else console.log("Error logging in: No token in settings.json");
}

login();
