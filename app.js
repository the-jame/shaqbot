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

function localEmbed(author, avatar, messageLink, contentMessage) {
	
	const newEmbed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL(messageLink)
		.setAuthor(author)
		.setDescription(contentMessage)
		.setThumbnail(author.avatar)
		.setTimestamp(new Date())
		.setFooter();

	channel.send(newEmbed);
	
};

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(settings.prefix) !== 0) return;

  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const avatar = `https://cdn.discordapp.com/avatars/${message.author}/${message.author.avatar}.jpg`;
  const msgID = message.id;
  const msgChannelID = message.channel.id;
  const msgChannel = client.guilds.get(guildID).channels.get(msgChannelID);
  const msgLink = `https://discordapp.com/channels/${guildID}/${msgChannelID}/${msgID}`;
  const contentMsg = `${message.content}\n\n→ [original message](${msgLink}) in <#${msgChannelID}>`;
	
	
  if(command === "embed")) {
	  localEmbed(message.author, avatar, msgLink, contentMsg);
  };



// INVITE LINK??
  if(command === "invite" || command === "inv") {
	message.channel.send("Clicc: <http://inv.whoinventedbeans.wtf>"); }

  if(command === "src" || command === "source") {
	message.channel.send("https://github.com/the-jame/shaqbot"); }

// MEME HELP

  if(command === "memes") {
	message.channel.send("> Meme responses:\n`Corn`!\n`breasts` - King of Breasts\n`isthatshaq` - Is that Shaq?\n`beans` - Who invented beans??\n`blacked` - on Xmas day?\n`burrito[mug]` - Put Your Burrito In A Mug\n`yallmindifi` - praise the lord?\n`quean` - BEAN QUEAN\n`thinkin` - About Thos Beans\n`consequences` - There. Will. Be. CONSEQUENCES!\n`killed` - This action will kill you immediately.\n`boomer` - OK BOOMER\n`stfuboomer` - STFU boomer.\n`joker` - Dance\n`smoljoker` - Smol joker.\n`doubt` - Doubt\n`chicken` - $5 Rotisserie Chicken Albertson's\n`pungent` - BRRRAPPP\n`uwu` - UwU\n`boomeralert` - Boomer alert!");
  }


// MEME TEXT

  if(command === "corn") {
	message.channel.send("https://discordapp.com/channels/95702402253983744/95702402253983744/440949926143328268"); }
	
  if(command === "uwu") {
     	message.channel.send("`(„ᵕᴗᵕ„)`"); }

  if(command === "pungent") {
	message.channel.send("```BBBBBBBBBRRRRRRRRRRRAAAAAAAAAAAPPPPPPPPPPPPPPPPPsnnnnniiiiiiffffffffffff...oh yes my dear....sssnnnnnnnnnnnniiiiiiiiffffffff....quite pungent indeed...is that....dare I say....sssssssnniff...eggs I smell?......sniff sniff....hmmm...yes...quite so my darling....sniff....quite pungent eggs yes very much so .....ssssssssssssssnnnnnnnnnnnnnnniiiiiiiffffff....ah yes...and also....a hint of....sniff....cheese.....quite wet my dear....sniff...but of yes...this will do nicely....sniff.....please my dear....another if you please....nice a big now....BBBBBBRRRRRRRAAAAAAAPPPPPPPFFFFFFFFLLLLLLLLLPPPPPPPPPFFFFFF Oh yes...very good!....very sloppy and wet my dear....hmmmmm...is that a drop of nugget I see on the rim?...hmmmm.....let me.....let me just have a little taste before the sniff my darling.......hmmmmm....hmm..yes....that is a delicate bit of chocolate my dear....ah yes....let me guess...curry for dinner?....oh quite right I am....aren't I?....ok....time for sniff.....sssssnnnnnnniiiiiiiiffffffff.....hmmm...hhhmmmmm I see...yes....yes indeed as well curry......hmmm....that fragrance is quite noticeable....yes.....onion and garlic chutney I take it my dear?.....hmmmmm....yes quite.....BBBBBBRRRRRRRRPPPPPPFFFFFFFFFFFFFFFFFFFFFTTTTTTTTTTT Oh I was not expecting that…that little gust my dear….you caught me off guard…yes…so gentle it was though…hmmmm…let me taste this little one…just one small sniff…..sniff…ah….ssssssnnnnnniiiiiffffffffffff…and yet…so strong…yes…the odor….sniff sniff…hmmm….is that….sniff….hmmm….I can almost taste it my dear…..yes….just…sniff….a little whiff more if you please…..ssssssnnnnnniiiiiffffffffff…ah yes I have it now….yes quite….hhhhmmmm…delectable my dear…..quite exquisite yes…..I dare say…sniff….the most pungent one yet my dear….ssssnnnnniiiifffffffffffffffffffffff….yes….﻿```"); }



// MEME IMAGES

  if(command === "breasts") {
	message.channel.send({files: ["img/kingofbreasts.jpg"]});
  }

  if(command === "chicken") {
	message.channel.send({files: ["img/5chicken.png"]});
  }

  if(command === "isthatshaq") {
	message.channel.send({files: ["img/isthatshaq.png"]});
  }

  if(command === "beans") {
	message.channel.send({files: ["img/inventedbeans.png"]});
  }

  if(command === "boomer") {
	message.channel.send({files: ["img/okboomer.png"]});
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

  if(command === "stfuboomer") {
	message.channel.send({files: ["img/stfuboomer.jpg"]});
  }

  if(command === "boomeralert") {
	message.channel.send({files: ["img/boomeralert.gif"]});
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
    "six of one, half dozen of the other", "an acre", "US Men's 11", "UK Women's 7 & 1/2", "a lima bean", "gamer sized :video_game:", "amassed", "in South Carolina until 10/12",
    "husky", "big and tall", "fine", "sizeable", "beach ball", ":chart_with_upwards_trend:", ":chart_with_downwards_trend:", ":bar_chart:", "boomer-sized", "minute", "old-fashioned", "frail", "nutty", "broad", "crooked", "obtuse", "portable", "stubby", "insufficient", "plump", "corn-fed", "flabby", "opulent", "liberal", "confusing", "questionable", "lacking self-confidence", "uncertain", "meager", "lacking quality"];
   
    var rand = Math.floor((Math.random() * (ballsizes.length - 1)));
    if(args[0].toLowerCase() === "my") {args[0] = "Your";}
    else if(args[0].toLowerCase() === "your" || args[0].toLowerCase() === "shaq's" || args[0].toLowerCase() === "shaqs") {args[0] = "My";}
    else if(args[0].toLowerCase() === "shaq" && typeof args[1] === 'undefined') {message.channel.send("My ball size is " + ballsizes[rand] + ".", {tts: true});return;}
    const beingSized = args.join(" "); message.channel.send(beingSized + "'s ball size is " + ballsizes[rand] + ".", {tts: true});
    return;
  }

  if (command === "8ball" || command === "8") {
    var eightball = ["It is certain.","As I see it, yes.",":thumbsup:", "Sure.", "I guess.", "No way.", "Cannot decide...","Possibru.","Mostly.","Kind of.", "Inconclusive.","Certainly.","Certainly not.", "HELL naw.","Most likely.","It is decidedly so.",":huh:","Without a doubt.","Yes - DEFINITELY","You may rely on it.","Outlook is good.","Yes.","Signs point to yes, papi.","Reply hazy... try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook is not good.","Very doubtful.","Thank you Kanye, very cool!"];
    var num = Math.floor((Math.random() * (eightball.length - 1)));
     message.channel.send(eightball[num], {tts: true});
    return;
  }

  if(command === "shaq") {
    message.channel.send("```Welcome to Shaq!```\n`say <string>`: Bot says the string in text-to-speech.\n`poll <string>`: Make the bot post your message with up/downvote reactions to poll.\n`8 <question>`: Bot will answer with an 8-ball style response.\n`ballsize|bs <string>`: Bot will tell you the ballsize of the string in question.\n`howdy`: Say howdy.\n`memes`: List additional commands with image attachment responses.")
    return;
  }


  if (command === "uuu" || command === "u" || command ==="uu") {
    //Have a conversation with Chubbot in it's native tongue
    //Syllables used to create words
    var syllables = ["euxeux", "bu", "lemlemlem", "lumlumlum", "lem", "lum", "huehue", "hue", "h", "hhhhhhhhhh", "eak", "oom",
    "shaq", "aqaqaq", "urts", "nts", "anus", "buenos", "cumb", "cummie", "euxeux", "ahhhhhnnnnnnnnnnnnnnnnnnnn", "unnnnnnnnn", "yeff", "hhhuuu", "rrrrrrrrrrrr", "uuu","arf","euf","aeeeb", "ffff", "uuu", "uhhh", "aaaa", "eeeee", "iiii", "oooo", "v", "huuuuuuuuuuuuu", "y"];
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
