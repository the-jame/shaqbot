const Discord = require('discord.js');
const client = new Discord.Client();

client.music = require("discord.js-musicbot-v2");

// emoji that goes in the post title
const tt = '⭐';

let settings;
let YTAPI = '';
let token = '';
let wut1;
let wut2;
let wut3;
let eyesleft;

// require settings file
try {
  settings = require('./settings.json');
} catch (e) {
  console.log(`a settings.json file has not been generated. ${e.stack}`);
  process.exit();
}

// log in bot with settings token
function login() {
  if (settings.token) {
    client.login(settings.token);
  } else {
    console.log('Error logging in: There may be an issue with your settings.json file');
  }
}

client.on('ready', () => {
  console.log(`Bot has started with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.\n`);
  let realshit = client.emojis.get('487855131996585994');
  wut1 = client.emojis.get('431701745329111041');
  wut2 = client.emojis.get('431701745014669314');
  wut3 = client.emojis.get('431701745236967425');
  eyesleft = client.emojis.get('642179113259499571');

  //client.channels.get('95702402253983744').send(`${realshit} **SHAQTIVATION COMPLETE** ${realshit}`);
  client.user.setActivity(`with ${client.users.size*2-12} balls.`, { type: 'PLAYING' })
  client.music.start(client, {

  // Set the api key used for YouTube!
  youtubeKey: settings.YTAPI,
  insertMusic: true,
  requesterName: true,
  logging: true,
  musicPresence: true,
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

//  if(message.author.presence.status == "idle"){
//    let user = message.author.id;
//    //message.delete().catch(O_o=>{});
//    message.channel.send("Aren't you idle <@" + user + ">? :thinking:");
//    return;
//   }

//  if(message.content.toLowerCase() == 'lol' || message.content.toLowerCase() == 'lmao' || message.content.toLowerCase() == 'haha'){
//	setTimeout(()=> {
//  clearTimeout(laughing);
//  }, 2200);
//  message.channel.send(`:smile:`)
//  .then((msg)=> {
//  laughing = setInterval(function() {if(msg.content.includes('slight')) msg.edit(':smile:'); else msg.edit(':slight_smile:');}, 500)
//  });}

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(settings.prefix) !== 0) return;

  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const huh = client.emojis.get('431693012788314132');

  // begin commands, search for //(command) to find
  switch(command) {

    // invite inv
    // INVITE LINK??
    case 'invite':
    case 'inv':
      message.channel.send("Clicc: <http://inv.whoinventedbeans.wtf>");
      break;
    // source src
    case 'src':
    case 'source':
      message.channel.send("https://github.com/the-jame/shaqbot");
      break;

    // MEME HELP
    // memes
    case 'memes':
      message.channel.send("> Meme responses:\n`Corn`!\n`breasts` - King of Breasts\n`isthatshaq` - Is that Shaq?\n`beans` - Who invented beans??\n`blacked` - on Xmas day?\n`burrito[mug]` - Put Your Burrito In A Mug\n`yallmindifi` - praise the lord?\n`quean` - BEAN QUEAN\n`thinkin` - About Thos Beans\n`consequences` - There. Will. Be. CONSEQUENCES!\n`killed` - This action will kill you immediately.\n`boomer` - OK BOOMER\n`stfuboomer` - STFU boomer.\n`joker` - Dance\n`smoljoker` - Smol joker.\n`doubt` - Doubt\n`head` - i just want some head\n`chicken` - $5 Rotisserie Chicken Albertson's\n`pungent` - BRRRAPPP\n`uwu` - UwU\n`boomeralert` - Boomer alert!\n`brains` - more than 1% of our brains\n`spoken` - Shaq has spoken\n`shaqspoken` - \'Shaq\' has spoken.\n`deletethis` - Delete this nephew.\n`discusting` - I have kids on here.\n`bitches` - bitches.... help\n`ganghaps` - ganghaps...\n`drums` - time for the Christmas drums\n`oof` - oof size");
      break;

    // MEME TEXT
    case 'corn':
      // localEmbed(url to jim's message???);
const embed = {
  "title": "Corn is nasty",
  "description": "\n\n\n[->  original message](https://discordapp.com/channels/95702402253983744/95702402253983744/440949926143328268)",
  "color": 15921246,
  "timestamp": "2018-05-01T21:42:55.506Z",
  "footer": {
    "icon_url": "https://cdn.discordapp.com/avatars/96492725406281728/537b1ae185a24308310dcbd5fa3af37c.png",
    "text": "sent"
  },
  "thumbnail": {
    "url": "https://www.eatnpark.com/UserFiles/Menu/CornOLO.jpg"
  },
  "author": {
    "name": "Sunder",
    "url": "https://discordapp.com",
    "icon_url": "https://cdn.discordapp.com/avatars/96492725406281728/537b1ae185a24308310dcbd5fa3af37c.png"
  }
};      message.channel.send({ embed });
      //message.channel.send("\"Corn was domesticated about 10,000 years ago in what is now Mexico.\" \n- <https://en.wikipedia.org/wiki/Maize#History>\n\nhttps://discordapp.com/channels/95702402253983744/95702402253983744/440949926143328268");
      break;
    case 'plex':
      const plexEmoji = client.emojis.get('583144668125069322');
      message.channel.send(`${plexEmoji} IT HAS BEEN 0 DAYS SINCE THE LAST PLEX REFERENCE. ${plexEmoji}`);
      break;
    case 'uwu':
      var uwus = ["(●´∀｀●)","(n˘v˘•)¬","(((( ;°Д°))))","(*~▽~)","(◕‿◕✿)","＼(^▽^＠)ノ"," ლ(╹◡╹ლ)","♥（ﾉ´∀`）","⊙ω⊙",
		 "（＠￣∇￣＠）／","(☆^O^☆)", "(★^O^★)", "(☆^ー^☆)", "(´ω｀★)", "＼（Ｔ∇Ｔ）／","ヽ(´ー`)ﾉ", "( ＾∇＾)", 
		 "＼( ｀.∀´)／", "(●⌒∇⌒●)", "o(≧∇≦o)", "ヽ(｀◇´)/", "(｡♥‿♥｡)", "(✿ ♥‿♥)", "♥╣[-_-]╠♥",
		 "(*´ー`)ノ", "ヽ(‘ー`)ノ", "ヽ(ー_ー )ノ", "ヽ(´～｀；）", "┐(‘～`；)┌", "(∩︵∩)", "(╯︵╰,)", 
		 "(╥_╥)", "(╯︵╰,)", "((((；゜Д゜))) ","ヾ(。￣□￣)ﾂ", "ヾ(￣0￣； )ノ", "ヾ(。￣□￣)ﾂ",
		 "(~_~;)", "((*゜Д゜)ゞ”", "(･_-｡ )", "⊙﹏⊙", "ミ●ミ", "(-’๏_๏’-)", "(⊙…⊙ )",
		 "（ ＾＾）人（＾＾ ）", "(〃⌒▽⌒)八(〃⌒▽⌒〃)八(⌒▽⌒〃)","☆-(ノﾟДﾟ)八(ﾟДﾟ )ノ", "( ｡･_･｡)人(｡･_･｡ )",
		 "ヽ(*^ｰ^)人(^ｰ^*)ノ", "(・_・”)／＼(・_・”)", "└(^o^ )Ｘ( ^o^)┘", "ヾ(-_-;)","ヾ( ‘ – ‘*)",
		 "(σ-`д･´)", "(｀Д´*)", "（=｀〜´=）", "(ﾒ｀ﾛ´)/", "Ψ(｀▽´)Ψ", "^(#｀∀´)_Ψ",
		 "ヘ(_ _ヘ)", "(ﾉ￣д￣)ﾉ", "(;-_-)ノ", "o(-_-;*)", "ﾍ(;´Д｀ﾍ)","(ノ#-_-)ノ", "（~～~）",
		 "( ^.^)ノ", "┌（★ｏ☆）┘ └（★ｏ★）┐", "♪(┌・。・)┌", "(＊0＊;)", "(u_u)", "(✖╭╮✖)",
		 "(º_º)", "٩(×̯×)۶", "(ñ_ñ)"," (。・・)_且 且_(ﾟ◇ﾟ；)ノﾞ", "(＃´ー´)旦 且_(・_・ ) ",
		 " ー( ´ ▽ ` )ﾉ", "ヽ(๏∀๏ )ﾉ ", "(◑‿◐)", "ლ(́◉◞౪◟◉‵ლ)", "(*~▽~)", "(∩▂∩)",
		 "(¬‿¬)", "(n˘v˘•)¬", "(;*△*;)","(∩︵∩)", "(╯︵╰,)", "(╥_╥)", "(╯︵╰,)",
		 "＼(=^‥^)/’`", "( =①ω①=)", "d(=^･ω･^=)b", "(=ＴェＴ=)", "(=;ェ;=)", "(=ｘェｘ=)",
		 "(=；ェ；=)", "(=｀ェ´=)","(⊙_◎)", "ಠ_ರೃ", " (ﾉ_ _)ﾉ", "( °̥̥̥˟°̥̥̥ )", "(ㅇㅅㅇ❀)","≖‿≖"];
		  
      var uwuRand = Math.floor((Math.random() * (uwus.length - 1)));
      message.channel.send(uwus[uwuRand]);
      break;
    case 'pungent':
      message.channel.send("```BBBBBBBBBRRRRRRRRRRRAAAAAAAAAAAPPPPPPPPPPPPPPPPPsnnnnniiiiiiffffffffffff...oh yes my dear....sssnnnnnnnnnnnniiiiiiiiffffffff....quite pungent indeed...is that....dare I say....sssssssnniff...eggs I smell?......sniff sniff....hmmm...yes...quite so my darling....sniff....quite pungent eggs yes very much so .....ssssssssssssssnnnnnnnnnnnnnnniiiiiiiffffff....ah yes...and also....a hint of....sniff....cheese.....quite wet my dear....sniff...but of yes...this will do nicely....sniff.....please my dear....another if you please....nice a big now....BBBBBBRRRRRRRAAAAAAAPPPPPPPFFFFFFFFLLLLLLLLLPPPPPPPPPFFFFFF Oh yes...very good!....very sloppy and wet my dear....hmmmmm...is that a drop of nugget I see on the rim?...hmmmm.....let me.....let me just have a little taste before the sniff my darling.......hmmmmm....hmm..yes....that is a delicate bit of chocolate my dear....ah yes....let me guess...curry for dinner?....oh quite right I am....aren't I?....ok....time for sniff.....sssssnnnnnnniiiiiiiiffffffff.....hmmm...hhhmmmmm I see...yes....yes indeed as well curry......hmmm....that fragrance is quite noticeable....yes.....onion and garlic chutney I take it my dear?.....hmmmmm....yes quite.....BBBBBBRRRRRRRRPPPPPPFFFFFFFFFFFFFFFFFFFFFTTTTTTTTTTT Oh I was not expecting that…that little gust my dear….you caught me off guard…yes…so gentle it was though…hmmmm…let me taste this little one…just one small sniff…..sniff…ah….ssssssnnnnnniiiiiffffffffffff…and yet…so strong…yes…the odor….sniff sniff…hmmm….is that….sniff….hmmm….I can almost taste it my dear…..yes….just…sniff….a little whiff more if you please…..ssssssnnnnnniiiiiffffffffff…ah yes I have it now….yes quite….hhhhmmmm…delectable my dear…..quite exquisite yes…..I dare say…sniff….the most pungent one yet my dear….ssssnnnnniiiifffffffffffffffffffffff….yes….﻿```");
      break;
    case 'bighio':
      message.delete().catch(O_o=>{});

      const ohio1 = client.emojis.get('642164336390832138');
      const ohio2 = client.emojis.get('642164350362320896');
      const ohio3 = client.emojis.get('642164360709537802');
      const ohio4 = client.emojis.get('642164371841220608');
      const ohio5 = client.emojis.get('642164380867362826');
      const ohio6 = client.emojis.get('642164393823698954');
      const ohio7 = client.emojis.get('642164405806563358');
      const ohio8 = client.emojis.get('642164415646531614');
      const ohio9 = client.emojis.get('642164426966958120');
      const ohio10 = client.emojis.get('642164436161003547');
      const ohio11 = client.emojis.get('642164446067949618');

      message.channel.send(`${ohio1}${ohio2}${ohio3}${ohio4}\n${ohio5}${ohio6}${ohio6}${ohio7}\n${ohio5}${ohio6}${ohio6}${ohio8}\n${ohio9}${ohio10}${ohio11}`);
      break;

    // MEME IMAGES
    case 'breasts':
      message.channel.send({files: ["img/kingofbreasts.jpg"]});
      break;
    case 'discusting':
      message.channel.send({files: ["img/discusting.png"]});
      break;
    case 'bitches':
    case 'bitcheshelp':
      message.channel.send({files: ["img/bitcheshelp.jpg"]});
      break;
    case 'ganghaps':
      message.channel.send({files: ["img/ganghaps.jpg"]});
      break;
    case 'nephew':
    case 'deletethis':
      message.channel.send({files: ["img/deletenephew.png"]});
      break;
    case 'brains':
      message.channel.send({files: ["img/brains.png"]});
      break;
    case 'chicken':
      message.channel.send({files: ["img/5chicken.png"]});
      break;
    case 'oof':
      message.channel.send({files: ["img/oof.jpg"]});
      break;
    case 'shaqspoken':
      message.delete().catch(O_o=>{});
      message.channel.send({files: ["img/shaqspoken.png"]});
      break;
    case 'spoken':
      message.delete().catch(O_o=>{});
      message.channel.send({files: ["img/spoken.jpg"]});
      break;
    case 'isthatshaq':
      message.channel.send({files: ["img/sarahshaq.png"]});
      message.channel.send({files: ["img/isthatshaq.png"]});
      break;
    case 'beans':
      message.channel.send({files: ["img/inventedbeans.png"]});
      break;
    case 'boomer':
      message.channel.send({files: ["img/okboomer.png"]});
      break;
    case 'blacked':
      message.channel.send({files: ["img/blacked.png"]});
      break;
    case 'drums':
      message.channel.send({files: ["img/christmasdrums.jpg"]});
      break;
    case 'joker':
      message.channel.send({files: ["img/joker.jpg"]});
      break;
    case 'smoljoker':
      message.channel.send({files: ["img/smoljoker.png"]});
      break;
    case 'head':
      message.channel.send({files: ["img/head2.jpg"]});
      break;
    case 'burritomug':
    case 'burrito':
      message.channel.send({files: ["img/burritomug.png"]});
      break;
    case 'yallmindifi':
    case 'praisethelord':
      message.channel.send({files: ["img/praisethelord.gif"]});
      break;
    case 'quean':
      message.channel.send({files: ["img/quean.png"]});
      break;
    case 'thinkin':
    case 'thinkinaboutbeans':
      message.channel.send({files: ["img/thinkinaboutbeans.png"]});
      break;
    case 'consequences':
      message.channel.send("https://youtu.be/FSt1ptsOjL0");
      break;
    case 'doubt':
      message.channel.send({files: ["img/doubt.png"]});
      break;
    case 'killed':
    case 'immediately':
      message.channel.send({files: ["img/immediatelykillyou.png"]});
      break;
    case 'stfuboomer':
      message.channel.send({files: ["img/stfuboomer.jpg"]});
      break;
    case 'boomeralert':
      message.channel.send({files: ["img/boomeralert.gif"]});
      break;

    // SET OWN ROLE
    // setrole
    case 'setrole':
      let newRole = args.join(" ");
      let roleToChange = message.member.highestRole;
      roleToChange.setName(newRole);
      message.channel.send(`Role changed to ${newRole}.`);
      break;

    // poll
    case 'poll':
      let pollMessage = args.join(" ");
      message.channel.send(pollMessage).then(sentMsg => {
        sentMsg.react("⬆")
        sentMsg.react("⬇")
        message.delete().catch(O_o=>{});
        })
      return;
      break;

    // howdy
    case 'howdy':
      //This is Jimmy trying to do something very basic
      let cowboyphrases = ["Howdy partner \:cowboy:", "H'lo :cowboy:", "This town ain't big enough for the two of us :cowboy:", "_a tumbleweed rolls by_", "It's high noon :cowboy:"];
      var num = Math.floor((Math.random() * (cowboyphrases.length - 1)));
      message.channel.send(cowboyphrases[num]);
      break;

    // say
    case 'say':
      let sayMessage = args.join(" ");
      message.delete().catch(O_o=>{});
      message.channel.send(sayMessage,{tts: true});
      break;


    // ballsize bs
    case 'ballsize':
    case 'bs':
      var ballsizes = ["large", "small", "medium", "puny", "gigantic", "average", "incongruous", "nice :thumbsup:", ":b:ig", "immense", "voluptuous", "h",
        "bigger than I'd like :/", "smaller than I'd like :/", "vast", "globular", "eternal", "*just right*", "normal", "¡Sabado Gigante!", "narrow", "wide", "petite", "insignificant", 
        "short", ":ok:", "smallish", "XXL", "XXS", "big-boned", "king size", "FAT", "mediocre", "unexceptional", "immeasurable", "trivial", "intermediate", "passable", 
        "regular", "tainted", "common", "12 inches", `${huh}`, "1 foot", "5 & 1/2 centimeters", "futuristic", "macho", "4 yards", "2 meters", ":fire::100::fire::100::fire::100:","thicc",
        "microscopic", "gargantuan", ":flushed:", "assertive", "reptilian", "ghastly", "delightful", "debonair", "homely", "nonexistent","left: 15cm, right: 1cm", "1mm","1 in.", "3cm",
        "about that of a golf ball", "Epstein didn't kill himself", "too big to handle", "just right", "ordinary", "unwieldy", "embarrassing", "cubic", "shriveled", "that of a BEAN",
        "six of one, half dozen of the other", "an acre", "US Men's 11", "UK Women's 7 & 1/2", "a lima bean", "unusual", "gamer sized :video_game:", "amassed",
        "in South Carolina until 10/12","husky", "big and tall", "fine", "sizeable", "beach ball", ":chart_with_upwards_trend:", ":chart_with_downwards_trend:",
        ":bar_chart:", "boomer-sized", "minute", "old-fashioned", "frail", "nutty", "broad", "crooked", "euclidean", "obtuse", "portable", "stubby", "insufficient",
        "plump", "corn-fed", "flabby", "opulent", "liberal", "confusing", "questionable", "lacking self-confidence", "uncertain", "meager",
        "lacking quality"];
      var rand = Math.floor((Math.random() * (ballsizes.length - 1)));
      if(typeof args[0] === 'undefined' || args[0].toLowerCase() === "my") {args[0] = ''; let beingSized = args.join(" "); if(beingSized !== ''){beingSized = beingSized += "'s";} message.channel.send(`Your${beingSized} ball size is ` + ballsizes[rand] +".", {tts: true});return;}
      else if(args[0].toLowerCase() === "your" || args[0].toLowerCase() === "shaq's" || args[0].toLowerCase() === "shaqs") {args[0] = "My";}
      else if(args[0].toLowerCase() === "shaq" && typeof args[1] === 'undefined') {message.channel.send("My ball size is " + ballsizes[rand] + ".", {tts: true});return;}
      let beingSized = args.join(" ");
      message.channel.send(beingSized + "'s ball size is " + ballsizes[rand] + ".", {tts: true});
      return;
      break;

    // 8ball 8
    case '8ball':
    case '8':
      let eightball = ["It is certain.","As I see it, yes.",":thumbsup:", "Sure.", "I guess.", "No way.", "Cannot decide...","Possibru.","Mostly.",
        "Kind of.", "Inconclusive.","Certainly.","Certainly not.", "HELL naw.","Most likely.","It is decidedly so.",`${huh}`,"Without a doubt.",
        "Yes - DEFINITELY","You may rely on it.","Outlook is good.","Yes.","Signs point to yes, papi.","Reply hazy... try again.","Ask again later.",
        "Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.",
        "Outlook is not good.","Very doubtful.","Thank you Kanye, very cool!"];
      var num = Math.floor((Math.random() * (eightball.length - 1)));
      message.channel.send(eightball[num], {tts: true});
      return;
      break;

    // shaq
    case 'shaq':
      message.channel.send("```Welcome to Shaq!```\n`say <string>`: Bot says the string in text-to-speech.\n`poll <string>`: Make the bot post your message with up/downvote reactions to poll.\n`ping <name>`[Home Server Only] Shaq pings the user.\n`8 <question>`: Bot will answer with an 8-ball style response.\n`ballsize|bs <string>`: Bot will tell you the ballsize of the string in question.\n`howdy`: Say howdy.\n`memes`: List additional commands with image attachment responses.")
      return;
      break;

    // uuu uu u
    case 'uuu':
    case 'uu':
    case 'u':
      //Have a conversation with Chubbot in it's native tongue
      //Syllables used to create words
      let syllables = ["euxeux", "bu", "lemlemlem", "lumlumlum", "lem", "lum", "huehue", "hue", "h", "hhhhhhhhhh", "eak", "oom",
        "shaq", "aqaqaq", "urts", "nts", "anus", "buenos", "cumb", "cummie", "euxeux", "ahhhhhnnnnnnnnnnnnnnnnnnnn", "unnnnnnnnn", "yeff", "hhhuuu",
        "rrrrrrrrrrrr", "uuu","arf","euf","aeeeb", "ffff", "uuu", "uhhh", "aaaa", "eeeee", "iiii", "oooo", "v", "huuuuuuuuuuuuu", "y"];
      //Words used by themselves
      let words = ["Posichichayones ", "from ", "sucky ", "keer ", "keer him ", "Legolas ", "jerk me once ", "jerk me twice ", "compadre ",
        "papa ", "daddy ", "prease ","shame on you "];
      let length = Math.floor(Math.random() * 15);
      let str = '';
      for (i=0; i<length; i++)
      {
        let pick = Math.floor((Math.random() * (syllables.length - 1)));
        str+=(syllables[pick]);
      }
      message.channel.send(str, {tts: true});
      break;

    case 'ping':
    //Ping someone with more flavor
    //Increase neck length based on random number, not sure how to do/if possible
    //Goal is to make one for each of us so you can do =ping<person> without using @<person>
      if (message.guild.id != settings.beans) {message.channel.send("Sorry, this only works in the home server!"); break;} // does not work outside our server

      let toPing = '';
      let pinged = args[0].toLowerCase();

      switch(pinged){

	      case 'jim':
	      case 'jimmy':
	      case 'jambi':
	      case 'jimb':
              case 'jimbi':
	      case 'sunder': toPing = settings.jimmy; break;

	      case 'jam':
	      case 'james':
	      case 'jame':
	      case 'thejame': toPing = settings.james; break;

	      case 'enrique':
	      case 'reegie':
	      case 'reeg': toPing = settings.enrique; break;

	      case 'chino':
	      case 'cody':
	      case 'chin':
	      case 'xhinon': toPing = settings.cody; break;

	      case 'ton':
	      case 'anthony':
	      case 'mug': toPing = settings.anthony; break;

	      case 'brett':
	      case 'kitty':
	      case 'kittykatt': toPing = settings.brett; break;

	      case 'liz':
	      case 'lizz':
	      case 'lizzz':
	      case 'elizabeth': toPing = settings.liz; break;

	      case 'tyra':
	      case 'moomoo': toPing = settings.tyra; break;

	      case 'ysabel':
	      case 'ysa': toPing = settings.ysabel; break;

	      case 'men': toPing = settings.men; break;

	      default: toPing = "invalid"; break;
            }

      if (toPing === "invalid") {message.channel.send("No user by that name."); break;}
      let neck = `${wut2}`;
      let wholeNeck = '';

      let neckLen = Math.floor((Math.random() * (32)));
      for (i=0; i<neckLen; i++)
      {
        wholeNeck += neck;
      }

      message.channel.send(`${wut1}${wholeNeck}${wut3}` + `<@${toPing}>` + ` ${eyesleft}`);
      break;
  case 'lol':
  case 'laugh':
      setTimeout(()=> {
      clearTimeout(laughing);
      }, 12000);
      message.channel.send(`:smile:`)
        .then((msg)=> {
        laughing = setInterval(function() {if(msg.content.includes('slight')) msg.edit(':smile:'); else msg.edit(':slight_smile:');}, 1200)
     });
     break;
  case 'look':
  case 'stretch':
  case 'neck':

      let finalNeck = '';
      let neck2 = `${wut2}${wut2}`;
      let lookAt = args.join(" ");


      setTimeout(()=> {
      clearTimeout(elongate);
      }, 15000);

      message.channel.send(`${wut1}${wut2}${wut3} ${lookAt}`)
        .then((msg)=> {
        elongate = setInterval(function(){ for(i=0;i<2;i++){finalNeck +=neck2;} msg.edit(`${wut1}${finalNeck}${wut3} ${lookAt}`);}, 1200)
      });

  break;
  }

});

login();
