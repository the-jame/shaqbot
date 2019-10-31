// discord init
const Discord = require('discord.js');
const client = new Discord.Client();
client.music = require("discord.js-musicbot-addon");

// emoji that goes in the post title
const tt = '⭐';
let settings;
let YTAPI = '';
let token = '';

try {
  settings = require('./settings.json');
} catch (e) {
  console.log(`a settings.json file has not been generated. ${e.stack}`);
  process.exit();
}

function login() {
  if (settings.token) {
    console.log(`Logging in with token...`);
    client.login(settings.token);
  } else {
    console.log('Error logging in: There may be an issue with you settings.json file');
  }
}

client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  const realshit = client.emojis.get('487855131996585994');

  //client.channels.get('95702402253983744').send(`${realshit} **SHAQTIVATION COMPLETE** ${realshit}`);
  client.user.setActivity(`with ${client.users.size} balls.`, { type: 'PLAYING' })
  client.music.start(client, {

  // Set the api key used for YouTube!
  youtubeKey: settings.YTAPI,
  // The PLAY command Object.
  play: {
    // Usage text for the help command.
    usage: "{{prefix}}play some tunes",
    // Whether or not to exclude the command from the help command.
    exclude: false
  },

  // Make it so anyone in the voice channel can skip the
  // currently playing song.
  anyoneCanSkip: true,

  // Make it so the owner (you) bypass permissions for music.
  ownerOverMember: true,
  ownerID: "95702308515487744",

  botPrefix: "=",

  // The cooldown Object.
  cooldown: {
    // This disables the cooldown. Not recommended.
    enabled: false
  }
});
})

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

//	<Music>.playFunction();   // PLAY command.
//	<Music>.helpFunction();   // HELP command.
//	<Music>.queueFunction();  // QUEUE command.
//	<Music>.npFunction();     // NOWPLAYING command.
//	<Music>.loopFunction();   // LOOP command.
//	<Music>.skipFunction();   // SKIP command.
//	<Music>.pauseFunction();  // PAUSE command.
//	<Music>.resumeFunction(); // RESUME command.
//	<Music>.clearFunction();  // CLEARQUEUE command.
//	<Music>.leaveFunction();  // LEAVE command.
//	<Music>.searchFunction(); // SEARCH command.
//	<Music>.volumeFunction(); // VOLUME command.
//	<Music>.removeFunction(); // REMOVE command.

// INVITE LINK??
  if(command === "invite" || command === "inv") {
	message.channel.send("Clicc: <http://inv.whoinventedbeans.wtf>"); }

// MEME HELP

  if(command === "memes") {
	message.channel.send("> Meme responses:\nCorn!\nBreasts - King of Breasts\nShaq - Is that Shaq?\nBeans - Who invented beans??\nBlacked - Blacked RAW on Xmas day\nBurrito[mug] - Put Your Burrito In A Mug\nYallmindifi - praise the lord?\nQuean - BEAN QUEAN\nThinkin - About Thos Beans\nConsequences - There. Will. Be. CONSEQUENCES!\nKilled - This action will kill you immediately.\nBoomer - STFU boomer.\nJoker - Dance\nSmoljoker - Smol joker.\nDoubt - Doubt\nChicken - $5 Rotisserie Chicken Albertson's");
  }


// MEME TEXT

  if(command === "corn") {
	message.channel.send("https://discordapp.com/channels/95702402253983744/95702402253983744/440949926143328268"); }
	
  if(command === "uwu") {
     	message.channel.send("`(„ᵕᴗᵕ„)`"); }


// MEME IMAGES

  if(command === "breasts") {
	message.channel.send({files: ["img/kingofbreasts.jpg"]});
  }

  if(command === "chicken") {
	message.channel.send({files: ["img/5chicken.png"]});
  }

  if(command === "shaq") {
	message.channel.send({files: ["img/isthatshaq.png"]});
  }

  if(command === "beans") {
	message.channel.send({files: ["img/inventedbeans.png"]});
  }

  if(command === "blacked") {
	message.channel.send({files: ["img/blacked.png"]});
  }

  if(command === "joker") {
	message.channel.send({files: ["img/joker.jpg"]});
  }

  if(command === "smoljoker") {
	message.channel.send({files: ["img/smoljoker.png"]});
  }

  if(command === "burritomug" || command === "burrito") {
	message.channel.send({files: ["img/burritomug.png"]});
  }

  if(command === "yallmindifi" || command === "praisethelord") {
	message.channel.send({files: ["img/praisethelord.gif"]});
  }

  if(command === "quean") {
	message.channel.send({files: ["img/quean.png"]});
  }

  if(command === "thinkin" || command === "thinkinaboutbeans") {
	message.channel.send({files: ["img/thinkinaboutbeans.png"]});
  }

  if(command === "consequences") {
	message.channel.send("https://youtu.be/FSt1ptsOjL0");
  }

  if(command === "doubt") {
	message.channel.send({files: ["img/doubt.png"]});
  }

  if(command === "killed" || command === "immediately") {
	message.channel.send({files: ["img/immediatelykillyou.png"]});
  }

  if(command === "boomer") {
	message.channel.send({files: ["img/stfuboomer.jpg"]});
  }

  // SET OWN ROLE

  if(command === "setrole") {
	const newRole = args.join(" ");
	const roleToChange = message.member.highestRole;
	roleToChange.setName(newRole);
	message.channel.send(`Role changed to ${newRole}.`);
  }

  if(command === "poll") {
    const sayMessage = args.join(" ");
    message.channel.send(sayMessage).then(sentMsg => {
      sentMsg.react("??")
      sentMsg.react("??")
      message.delete().catch(O_o=>{});
      })

    return;
  }

  if (command === "howdy") {
    //This is Jimmy trying to do something very basic
    var cowboyphrases = ["Howdy partner \:cowboy:", "H'lo :cowboy:", "This town ain't big enough for the two of us :cowboy:", "_a tumbleweed rolls by_", "It's high noon :cowboy:"];

    var num = Math.floor((Math.random() * (cowboyphrases.length - 1)));
    message.channel.send(cowboyphrases[num]);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage,{tts: true});
    return;
  }


  if (command === "ballsize" || command ==="bs"){
   var ballsizes = ["large", "small", "medium", "puny", "gigantic", "average", "incongruous", "nice :thumbsup:", ":b:ig", "immense", "voluptuous", "h",
    "bigger than I'd like :/", "smaller than I'd like :/", "*just right*", "normal", "¡Sabado Gigante!", "narrow", "wide", "petite", "insignificant", "short", ":ok:",
    "smallish", "XXL", "king size", "FAT", "mediocre", "unexceptional", "immeasurable", "trivial", "intermediate", "passable", "regular", "common", "12 inches", "1 foot",
    "5 & 1/2 centimeters", "4 yards", "2 meters", ":fire::fire::fire::fire::100::100::100:","thicc","microscopic", "gargantuan", "assertive", "reptilian", "ghastly", "delightful", "nonexistent","left: 15cm, right: 1cm", "1mm",
    "1 in.", "3cm", "about that of a golf ball", "too big to handle", "just right", "ordinary", "unwieldy", "embarrassing", "cubic", "shriveled", "that of a BEAN",
    "six of one, half dozen of the other", "an acre", "US Men's 11", "UK Women's 7 & 1/2", "a lima bean", "gamer sized :video_game:", "ammassed", "in South Carolina until 10/12",
    "husky", "big and tall", "fine", "sizeable", "beach ball", ":chart_with_upwards_trend:", ":chart_with_downwards_trend:", ":bar_chart:", "boomer-sized", "minute", "old-fashioned", "frail", "nutty", "broad", "crooked", "obtuse", "portable", "stubby", "insufficient", "plump", "corn-fed", "flabby", "opulent", "liberal", "confusing", "questionable", "lacking self-confidence", "uncertain", "meager", "lacking quality"];
   
    var rand = Math.floor((Math.random() * (ballsizes.length - 1)));
    if(args[0].toLowerCase() === "my") {args[0] = "Your";}
    else if(args[0].toLowerCase() === "your" || args[0].toLowerCase() === "shaq") {args[0] = "My";}
    const beingSized = args.join(" "); message.channel.send(beingSized + "'s ball size is " + ballsizes[rand] + ".", {tts: true});
    return;
  }

  if (command === "8ball" || command === "8") {
    var eightball = ["It is certain.","As I see it, yes.",":thumbsup:", "Sure.", "I guess.", "No way.", "Cannot decide...","Possibru.","Mostly.","Kind of.", "Inconclusive.","Certainly.","Certainly not.", "HELL naw.","Most likely.","It is decidedly so.",":huh:","Without a doubt.","Yes - DEFINITELY","You may rely on it.","Outlook is good.","Yes.","Signs point to yes, papi.","Reply hazy... try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook is not good.","Very doubtful.","Thank you Kanye, very cool!"];
    var num = Math.floor((Math.random() * (eightball.length - 1)));
     message.channel.send(eightball[num], {tts: true});
    return;
  }

  if(command === "help") {
    message.channel.send("\`\`\`Welcome to SHAQ!\`\`\`\nPlease use the following commands to control me and gamble:\n\n\`\`\`ECONOMY:\`\`\`\nCollect all points - Usage: =ca\nCheck points - Usage: =points OR =p\n\n\`\`\`GAMBLIN:\`\`\`\nRoulette - Usage: =r [red/black/(1-36)] [bet]\nCoinflip - Usage: =cf [h/t] [all/half/(bet)\n\n\`\`\`GOOFS:\`\`\`\nMake Shaq say... (/tts) - Usage: =say [message]\nStart a poll! - Usage: =poll [the question]\nAsk the 8-ball! - Usage: =8 [the question]\nSize your balls! (/tts) - Usage: =bs\nJust say howdy! - Usage: =howdy\n\n\`\`\`RANKS:\`\`\`\nYou will rank up by XP (points earned) and earn accelerated rewards! Use =p to check your rank.")
    return;
  }


  if (command === "uuu" || command === "u" || command ==="uu") {
    //Have a conversation with Chubbot in it's native tongue
    //Syllables used to create words
    var syllables = ["euxeux", "bu", "lemlemlem", "lumlumlum", "lem", "lum", "huehue", "hue", "h", "hhhhhhhhhh", "eak", "oom",
    "shaq", "aqaqaq", "urts", "hurts", "anus", "buenos","farded","fard","shid","pidd","unnnnnnnnn", "yeff", "fap", "hhhuuu", "rrrrrrrrrrrr", "uuu","arf","euf","aeeeb", "ffff", "uuu", "uhhh", "aaaa", "eeeee", "iiii", "oooo", "v", "uuuuuuuuuuuuuuuuuuu", "y"];
    //Words used by themselves
    var words = ["Posichichayones ", "from ", "sucky ", "keer ", "keer him ", "Legolas ", "jerk me once ", "jerk me twice ", "compadre ",
    "papa ", "daddy ", "prease ","shame on you "];

    var length = Math.floor(Math.random() * 15);
    var str = '';
    for (i=0; i<length; i++)
    {
      var pick = Math.floor((Math.random() * (syllables.length - 1)));
      str+=(syllables[pick]);
    }
    message.channel.send(str, {tts: true});
  }


});

login();
