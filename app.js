// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
const sql = require("sqlite");
sql.open("./scores.sqlite");
// config.token contains the bot's token
// config.prefix contains the message prefix.

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

// win on red
function isOdd(num) { return num % 2;};


client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(`with ${client.users.size} balls.`, { type: 'PLAYING' })
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
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, points, day, hour, lifetime, multi) VALUES (?, ?, ?, ?, ?, ?)", [message.author.id, 0, 0, 0, 0, 1]);
    } else {
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, day INTEGER, hour INTEGER, lifetime INTEGER, multi INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, day, hour, lifetime, multi) VALUES (?, ?, ?, ?, ?, ?)", [message.author.id, 0, 0, 0, 0, 1]);
    });
  });

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage,{tts: true});
    return;
  }

   if (command === "rps"){

    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet, use pp!daily");
      if (row.points == 0) return message.reply("you don't have any points!");


      function getArgs() {
	       var args = Array.prototype.slice.call(arguments);}

      var availPoints = row.points;
      var betAmount = Math.floor(args[0]);

      if (betAmount > 500)
        betAmount = 500;

      if (!isInt(betAmount)){
	       message.reply('enter integers only!');return;}

      if (betAmount < 0){message.reply('you can not bet negative.'); betAmount = 0; return;}

      if (betAmount > availPoints){message.reply('you can not bet more than you have.');return;}

      var userChoice = args[1];
      var winAmount = 0;

      if (userChoice.toUpperCase() === 'ROCK') {
        result = Math.floor(Math.random() * 3) + 1
        if (result === 1) {
          winAmount = betAmount*2;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: SCISSORS. You bet ${betAmount} and won ${winAmount} points!`);
        }
        else if (result === 2) {
          message.reply(`Result: ROCK. You win 0 points!`);
        }
        else
        {
          sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: PAPER. You bet ${betAmount} and lost ${betAmount} points.`);
        }
      }
      else if(userChoice.toUpperCase() === 'SCISSORS') {
        result = Math.floor(Math.random() * 3) + 1
        if (result === 1) {
          winAmount = betAmount*2;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: PAPER. You bet ${betAmount} and won ${winAmount} points!`);
        }
        else if (result === 2) {
          message.reply(`Result: SCISSORS. You win 0 points!`);
        }
        else {
          sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ROCK. You bet ${betAmount} and lost ${betAmount} points.`);
        }
      }
      else if(userChoice.toUpperCase() === 'PAPER') {
        result = Math.floor(Math.random() * 3) + 1
        if (result === 1) {
          winAmount = betAmount*2;
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ROCK. You bet ${betAmount} and won ${winAmount} points!`);
        }
        else if (result === 2) {
          message.reply(`Result: PAPER. You win 0 points!`);
        }
        else {
          sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: SCISSORS. You bet ${betAmount} and lost ${betAmount} points.`);
        }
      }

    });
    winAmount = 0;
    return;

  }

  if (command === "daily" || command === "d") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Welcome outlander. Type =d once more."); // create user line in DB

	var today = new Date();
  var theDate = today.getDate();
  
      if(row.day != theDate){  // if day hasn't been used
        sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * 300))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * 150))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET day = ${theDate} WHERE userId = ${message.author.id}`);
        message.reply(`Obtained daily 300 points!`);
      }
      else  // if day has been used
        message.reply(`Wait until tomorrow ya DINGUS!`);
    });
    return;
  }

  if (command === "hourly" || command === "h") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Welcome outlander. Type =h once more.");

	var today = new Date();
	var theDate = today.getDate();
  var theHour = today.getHours();
  
      if(row.hour != theHour){ // if the hour hasn't been used
        sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * 50))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * 25))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET hour = ${theHour} WHERE userId = ${message.author.id}`);
        message.reply(`Obtained hourly 50 points!`);
      }
      else {  // if the hour has been used
        message.reply(`Hourly reward not yet ready.`);
      }
    });
    return;
  }

  if (command === "claimall" || command === "ca"){
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("Welcome outlander. Type =ca once more to make an account.");

    var today = new Date();
    var theDate = today.getDate();
    var theHour = today.getHours();

        if((row.day != theDate) && (row.hour != theHour)){  // neither day nor hour used
        sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * 350))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * 175))} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET day = ${theDate} WHERE userId = ${message.author.id}`);
        message.reply('Obtained all points!');
        }
        else if((row.hour) != theHour && (row.day == theDate)){ // hour unused only
          sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * 50))} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * 25))} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET hour = ${theHour} WHERE userId = ${message.author.id}`);
          message.reply('Obtained hourly points!');
        }
        else if((row.hour == theHour) && (row.day != theDate)){  // day unused only
          sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * 300))} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * 150))} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET day = ${theDate} WHERE userId = ${message.author.id}`);
          message.reply('Obtained daily points!');  
        }
        else{ // nothing available
          message.reply('all points are on cooldown.');
        }
  });
  return;
}


  if (command === "points" || command === "p" || command === "pts") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("you do not have any points yet, use =ca");

      

      if (row.lifetime > 2000 && row.lifetime < 10000 && row.multi == 1){
        sql.run(`UPDATE scores SET multi = 1.1 WHERE userId = ${message.author.id}`);
        message.reply("you've leveled up (>2000 XP) to Pleb. (1.1X)")
        return;
      }
      if (row.lifetime > 10000 && row.lifetime < 25000 && row.multi <= 1.1){
        sql.run(`UPDATE scores SET multi = 1.2 WHERE userId = ${message.author.id}`);
        message.reply("nice! You've leveled up (>10000 XP) to Flaccid. (1.2X)")
        return;
      }
      if (row.lifetime > 25000 && row.lifetime < 50000 && row.multi <= 1.2){
        sql.run(`UPDATE scores SET multi = 1.3 WHERE userId = ${message.author.id}`);
        message.reply("nice! You've leveled up (>25000 XP) to Sink-pisser. (1.3X)")
        return;
      }
      if (row.lifetime > 50000 && row.lifetime < 100000 && row.multi <= 1.3){
        sql.run(`UPDATE scores SET multi = 1.4 WHERE userId = ${message.author.id}`);
        message.reply("nice! You've leveled up (>50000 XP) to Full-chub. (1.4X)")
        return;
      }
      if (row.lifetime > 100000 && row.lifetime < 250000 && row.multi <= 1.4){
        sql.run(`UPDATE scores SET multi = 1.5 WHERE userId = ${message.author.id}`);
        message.reply("nice! You've leveled up (>100000 XP) to Diamond-chub. (1.5X)")
        return;
      }

      else if (row.lifetime >= 100000 && row.multi == 1.5){ message.reply(`you have ${row.points} points and ${row.lifetime} XP. RANK: Diamond-chub. (1.5X)`); return;} 
      else if (row.lifetime >= 50000 && row.multi == 1.4){ message.reply(`you have ${row.points} points and ${row.lifetime} XP. RANK: Full-chub. (1.4X)`); return;} 
      else if (row.lifetime >= 25000 && row.multi == 1.3){ message.reply(`you have ${row.points} points and ${row.lifetime} XP. RANK: Sink-pisser. (1.3X)`); return;} 
      else if (row.lifetime >= 10000 && row.multi == 1.2){ message.reply(`you have ${row.points} points and ${row.lifetime} XP. RANK: Flaccid. (1.2X)`); return;} 
      else if (row.lifetime >= 2000 && row.multi == 1.1) { message.reply(`you have ${row.points} points and ${row.lifetime} XP. RANK: Pleb. (1.1X)`); return;}




      else
      message.reply(`you have ${row.points} points and ${row.lifetime} XP. Rank: Mung (1X)`);
    });
    return;
  }

  if(command === "poll") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {

    const sayMessage = args.join(" ");
    message.channel.send(sayMessage).then(sentMsg => {
      sentMsg.react("👍")
      sentMsg.react("👎")
      message.delete().catch(O_o=>{});
      })
      sql.run(`UPDATE scores SET lifetime = ${row.lifetime + 5} WHERE userId = ${message.author.id}`);

    })
    return;
  }

  if (command === "coinflip" || command ==="cf"){
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet, use =ca");
      if (row.points == 0) return message.reply("you don't have any points!");

      function getArgs() {
      var args = Array.prototype.slice.call(arguments);
      }
      betAmount = args[1];
      if (betAmount == "all"){
        betAmount = row.points;
      }
      else if (betAmount == "half"){
        betAmount = Math.round(row.points / 2);
      }
      else betAmount = Math.floor(args[1]); // bet
      var availPoints = row.points;
      var betCall = args[0]; //heads or tails

      if (betAmount < 0){message.reply('you can not bet negative.'); betAmount = 0; return;}
      if (betAmount > availPoints){message.reply('you can not bet more than you have.');return;}
      if (isNaN(betAmount)){message.reply(`that's not a number.`);return;}

      var winAmount = Math.round((row.multi * betAmount)); // win amount calculation

      var random = (Math.round(Math.random()))
      // 0 is HEADS
      // 1 is TAILS


      if (random == 0 && (betCall == "tails" || betCall =="t")){
        sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
        message.reply(`\`Heads.\` You lose ${betAmount}. You now have ${row.points-betAmount} points.`)
        return;
      }
      if (random == 0 && (betCall == "heads" || betCall == "h")){
        sql.run(`UPDATE scores SET points = ${row.points + winAmount} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + winAmount} WHERE userId = ${message.author.id}`);
        message.reply(`\`Heads!\` You win ${betAmount}! You now have ${row.points + winAmount} points.`)
        return;
      }
      if (random == 1 && (betCall == "tails" || betCall =="t")){
        sql.run(`UPDATE scores SET points = ${row.points + winAmount} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + winAmount} WHERE userId = ${message.author.id}`);
        message.reply(`\`Tails!\` You win ${betAmount}! You now have ${row.points + winAmount} points.`) 
        return;
      }
      if (random == 1 && (betCall == "heads" || betCall == "h")){
        sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
        message.reply(`\`Tails.\` You lose ${betAmount}. You now have ${row.points-betAmount} points.`)
        return;
      }
      else {message.reply(`you've entered something incorrectly.`); return;}


    })
    return;
  }

  if (command === "roulette" || command === "r") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
      if (!row) return message.reply("sadly you do not have any points yet, use =ca");
      if (row.points == 0) return message.reply("you don't have any points!");

      function getArgs() {
      var args = Array.prototype.slice.call(arguments);
      }
      var betCall = args[0];
      var betAmount = Math.floor(args[1]);
      var availPoints = row.points;

      // input validation
      if (!isInt(betAmount)){
	       message.reply('enter integers only!'); return;}
      if (betAmount < 0){message.reply('you can not bet negative.'); betAmount = 0; return;}
      if (betAmount > availPoints){message.reply('you can not bet more than you have.');return;}
      if (betAmount < 0){message.reply('you do not have any points to bet!');return;}

      var random = (Math.floor(Math.random() * 36) + 1)
      if (random == betCall) {
          winAmount = Math.round(row.multi * (betAmount * 60));
          changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + Math.round((row.multi * changeAmount))} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET lifetime = ${row.lifetime + Math.round((row.multi * changeAmount))} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ${random} (MATCH)!! YOU EARNED ${Math.round((row.multi * changeAmount))} points! Shit!! New total = ${row.points + Math.round((row.multi * changeAmount))}`);
      }

        // win on RED
      else if ((isOdd(random) == 1) && (betCall.toUpperCase() === 'RED' || betCall.toLowerCase() === 'ODD') && (betCall != 36) && (betCall != 0)) {
        winAmount = Math.round(row.multi * betAmount);
        sql.run(`UPDATE scores SET points = ${row.points + winAmount} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + winAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: \`RED\`. You earned ${winAmount} points! New total = ${row.points + winAmount}`);
      }

      // win on BLACK
      else if ((isOdd(random) == 0) && (betCall.toUpperCase() === 'BLACK' || (betCall.toUpperCase() === 'EVEN')) && (betCall != 36) && (betCall != 0)) {
        winAmount = Math.round(row.multi * betAmount);
        sql.run(`UPDATE scores SET points = ${row.points + winAmount} WHERE userId = ${message.author.id}`);
        sql.run(`UPDATE scores SET lifetime = ${row.lifetime + winAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: \`BLACK\`. You earned ${winAmount} points! New total = ${row.points + winAmount}`);
      }

      // win on ZERO
      else if ((random == 0) && (betCall == 0)) {
        winAmount = Math.round(row.multi * (betAmount * 36));
        changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET lifetime = ${row.lifetime + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ${random}. You earned ${changeAmount} points! New total = ${row.points + changeAmount}`);
      }

      // win on DOUBLE ZERO
      else if ((random == 36) && (betCall == 36)) {
        winAmount = Math.round(row.multi * (betAmount * 36));
        changeAmount = winAmount - betAmount;
          sql.run(`UPDATE scores SET points = ${row.points + changeAmount} WHERE userId = ${message.author.id}`);
          sql.run(`UPDATE scores SET lifetime = ${row.lifetime + changeAmount} WHERE userId = ${message.author.id}`);
          message.reply(`Result: ${random}. You earned ${changeAmount} points! New total = ${row.points + changeAmount}`);
      }

      else if ((isNan(betCall)) || betCall > 36 || betCall <1){message.reply(`invalid input.`);return;}

        // L O S E R
      else {
        winAmount = 0;
        sql.run(`UPDATE scores SET points = ${row.points - betAmount} WHERE userId = ${message.author.id}`);
        message.reply(`Result: ${random}. You lost ${betAmount} points! Oof. New total = ${row.points - betAmount}`);
      }

    });
    winAmount = 0;
    return;
  }

  if (command === "plex") {
    message.channel.send(":warning: IT HAS BEEN [0] DAYS SINCE THE LAST PLEX REFERENCE. :warning:");
    return;
  }

 
  if (command === "howdy") {
    //This is Jimmy trying to do something very basic
    var cowboyphrases = ["Howdy partner \:cowboy:", "H'lo :cowboy:", "This town ain't big enough for the two of us :cowboy:", "_a tumbleweed rolls by_", "It's high noon :cowboy:"];

    var num = Math.floor((Math.random() * (cowboyphrases.length - 1)));
    message.channel.send(cowboyphrases[num]);
  }


  if (command === "ballsize" || command ==="bs"){
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {

   var ballsizes = ["large", "small", "medium", "puny", "gigantic", "average", "incongruous", "nice :thumbsup:", ":b:ig", "immense", "voluptuous", "h",
    "bigger than I'd like :/", "smaller than I'd like :/", "*just right*", "normal", "¡Sabado Gigante!", "narrow", "wide", "petite", "insignificant", "short", ":ok:",
    "smallish", "XXL", "king size", "FAT", "mediocre", "unexceptional", "immeasurable", "trivial", "intermediate", "passable", "regular", "common", "12 inches", "1 foot",
    "5 & 1/2 centimeters", "4 yards", "2 meters", ":fire::fire::fire::fire::100::100::100:","thicc","microscopic", "gargantuan","nonexistent","left: 15cm, right: 1cm", "1mm",
    "1 in.", "3cm", "about that of a golf ball", "too big to handle", "just right", "ordinary", "unwieldy", "embarrassing", "cubic", "shriveled", "that of a BEAN",
    "six of one, half dozen of the other", "an acre", "US Men's 11", "UK Women's 7 & 1/2", "a lima bean", "gamer sized :video_game:", "ammassed", "in South Carolina until 10/12",
    "husky", "big and tall", "fine", "sizeable", "beach ball", ":chart_with_upwards_trend:", ":chart_with_downwards_trend:", ":bar_chart:", "meager", "lacking quality"];
	    
    var num = Math.floor((Math.random() * (ballsizes.length - 1)));
     message.channel.send("Your ball size is " + ballsizes[num] + ".", {tts: false});
     sql.run(`UPDATE scores SET lifetime = ${row.lifetime + 5} WHERE userId = ${message.author.id}`);
    })
    return;
  }

  if (command === "8ball" || command === "8") {
    sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {

    var eightball = ["It is certain.","As I see it, yes.",":thumbsup:", "Sure.", "I guess.", "No way.", "Cannot decide...","Possibru.","Mostly.","Kind of.", "Inconclusive.","Certainly.","Certainly not.", "HELL naw.","Most likely.","It is decidedly so.",":huh:","Without a doubt.","Yes - DEFINITELY","You may rely on it.","Outlook is good.","Yes.","Signs point to yes, papi.","Reply hazy... try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook is not good.","Very doubtful.","Thank you Kanye, very cool!"];
    var num = Math.floor((Math.random() * (eightball.length - 1)));
     message.channel.send(eightball[num], {tts: true});
    sql.run(`UPDATE scores SET lifetime = ${row.lifetime + 5} WHERE userId = ${message.author.id}`);
    })
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
    "shaq", "aqaqaq", "urts", "hurts", "yeff", "fap", "hhhuuu", "rrrrrrrrrrrr", "ffff", "uuu", "uhhh", "aaaa", "eeeee", "iiii", "oooo", "v", "uuuuuuuuuuuuuuuuuuu", "y"];
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



client.login(config.token);
