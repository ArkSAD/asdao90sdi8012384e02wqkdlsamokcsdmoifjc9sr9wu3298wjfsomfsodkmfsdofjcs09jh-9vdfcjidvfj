const http = require('http');
const express = require('express');
const app = express();
  
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Calling the Packages and Files
const Discord = require("discord.js");
const moment = require('moment');
const fs = require("fs");
let bot = new Discord.Client();
const prefix = "?";
bot.commands = new Discord.Collection();

let cooldown = new Set();
let cdSeconds = 5;



// Ready event
bot.on('ready', () => {
console.log(`[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: System booting up...\n[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: All commands loaded.\n[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: 4 events ready.`);
setTimeout(() => {
console.log(`[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: Successfully booted.`)
}, 2000);


// Bot Status
function botStatus() {
  let status = [
    `?help`,
  ];
  let rstatus = Math.floor(Math.random() * status.length);
  bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        
};
  setInterval(botStatus, 20000)
});
// Message event
bot.on("message", async message => {
	if(message.author.bot) return undefined;
  if(!message.content.startsWith(prefix)) return;
	if(message.channel.type === 'dm') return;
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
  message.prefix = prefix;
  
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(`**Please wait for ${cdSeconds} seconds! [RATELIMITED]**`);
  }
    
  if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id);
  }
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdSeconds * 1000);
// Command Handler
try{
let commandFile = require(`./commands/${cmd}.js`);
commandFile.run(bot, message, args)
}catch(err){
console.log(`${err.stack}`)
}
console.log(`[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
});

// Member Join Event
	bot.on('guildMemberAdd', member => {   
    
	  const members = member.guild.memberCount;
	  const channel = member.guild.channels.find(c => c.name === "member-log");
	  if (!channel) return;

    let Role = member.guild.roles.find(`name`, "Bots");
    if(member.user.bot){
	    member.addRole(Role.id)
    }else{
      let role = member.guild.roles.find(r => r.name === "Member");
	    member.addRole(role.id)
    };
 
	  let Embed = new Discord.RichEmbed()
	  .setFooter(`User Joined | ${member.guild.memberCount} Members`)
	  .setColor("#cde246")    
	  .setAuthor(`${member.displayName} has joined ${member.guild.name}`, member.user.displayAvatarURL)
	  .setTimestamp()
	  channel.send(Embed);
	});

// Member Leave Event
	bot.on('guildMemberRemove', member => {
	  const channel = member.guild.channels.find(c => c.name === "member-log");
	  if(!channel) return; 
    
	  let Embed = new Discord.RichEmbed()
	  .setColor("#e26346")
	  .setAuthor(`${member.displayName}, has left ${member.guild.name}.`, member.user.displayAvatarURL)
	  .setTimestamp()
	  .setFooter(`User Left | ${member.guild.memberCount} Members`)
	  channel.send(Embed);
	});

	var WelcomeChannel = JSON.parse(fs.readFileSync(`./welcome.json`, `UTF8`));

	bot.on("message", message =>{
	  let command = message.content.split(" ")[0].slice(prefix.length);
	  let args = message.content.split(" ").slice(1);
	  if(!message.content.startsWith(prefix)) return;
	  if(message.author.bot) return;
	  if(command === "setwelcome") {
		  let welcomechann = args.join(" ");
		  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You must have the **`ADMINISTRATOR`** permission!")
		  if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply("I must have the **`ADMINISTRATOR`** permissions!")
		  if(!message.member.guild.channels.find(x => x.name === welcomechann)) return message.reply("Usage: **`(channel name)`**");
		  message.reply("Successfully applied welcome to **`" + welcomechann + "`**")
		  WelcomeChannel[message.guild.id] = {
			  guild: message.guild.name,
			  channel: welcomechann
		  }
		  fs.writeFile("./welcome.json", JSON.stringify(WelcomeChannel, null, 4), err => {
			  if(err) throw err;
	  });
	}
	});

	bot.on('guildMemberAdd', async function (najzx) {
		const Welco =  najzx.guild.channels.find(mk => mk.name === WelcomeChannel[najzx.guild.id].channel);
			  let memberavatar = najzx.user.avatarURL
				if (!Welco) return; 
	  
		najzx.guild.fetchInvites().then(guildInvites => {
			const uses = guildInvites.find(codes => codes.uses);
			const UserInvited = bot.users.get(uses.inviter.id);
			let embed = new Discord.RichEmbed()
			.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
			  .setTimestamp()    
			  .setColor("#e5b4ff")
			  .setThumbnail(memberavatar)
			  .addField('> \`\#\`\ <:User:652594595623993375> - Name:',`<@${najzx.user.id}>`)
				  .addField('> \`\#\`\ <:inviter:652595304062910474> - inviter:' , `<@${UserInvited.id}>`)
				  .addField('> \`\#\`\ <:idss:652595338703798303> - ID: ', "" + `${najzx.id}` + "" )
				  .addField('> \`\#\`\ <:Memberss:652608664149950493> - Member:',`${najzx.guild.memberCount}`)
						 
							  
												 
			  
				Welco.sendEmbed(embed);
		})
			  });


			  bot.on('message',async message =>{ 
				if(message.content.startsWith(prefix + "channels")) {
					let i = 1;
					let embed = new Discord.RichEmbed()
					.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
			        .setTimestamp()    
					.setColor("#e5b4ff") 
					.setAuthor(message.author.username, message.author.avatarURL)
					.setTitle(message.guild.name)
					.setThumbnail(message.guild.iconURL)
					.setDescription(message.guild.channels.map(c => `\`${i++}\` - **${c.name}**`))
					message.channel.send(embed).then(msg => {
						msg.delete(25000);
						message.delete(25000);
					});
				}
			});   
			
			

			bot.on('message', message => {
				var currentTime = new Date(),
				hours = currentTime.getHours() + 0 ,
				minutes = currentTime.getMinutes(),
				seconds = currentTime.getSeconds(),
				years = currentTime.getFullYear(),
				month = currentTime.getMonth() + 1,
				day = currentTime.getDate(),
				week = currentTime.getDay();
		   
				 
	 
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				var suffix = "AM";
				if (hours >= 12) {
					suffix = "PM";
					hours = hours - 12;
				}
				if (hours == 0) {
					hours = 12;
				}
					if(message.content.startsWith(prefix + 'time')) {
						const embed = new Discord.RichEmbed()
						.setColor("#e5b4ff") 
						.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
						.setTimestamp()    
						.addField(` > Time: `,`  ( ${hours}:${minutes} , ${suffix} )`)
	 .addField(` > Date: `,`( ${years}:${month} , ${day} )`)
	 
			   
	 message.channel.send(embed)
	 }
	 });  

	 
	 bot.on('message',message =>{
		if(message.content.startsWith(prefix + 'invitetop')) {
	  message.guild.fetchInvites().then(i =>{
	  var invites = [];
	   
	  i.forEach(inv =>{
		var [invs,i]=[{},null];
		 
		if(inv.maxUses){
			invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
		}else{
			invs[inv.code] =+ inv.uses;
		}
			invites.push(`\`\#\`\ inviteLink : ${inv.url} inviter: ${inv.inviter} , \`( ${invs[inv.code]} )\`;`);
	   
	  });
	  var embed = new Discord.RichEmbed()
	  .setColor("#e5b4ff") 
	  .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
	  .setTimestamp()     
	  .setDescription(`${invites.join(`\n`)+'\n\n> By: '+message.author}`)
	  .setThumbnail("https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048")
			   message.channel.send({ embed: embed });
	   
	  });
	   
		}
	  });
	

	  bot.on('message', message => {
		let args = message.content.split(" ").slice(1);
		if (message.author.bot) return;
		if (!message.channel.guild) return;
		if (message.content.startsWith(prefix + 'clear')) {
	
			if (isNaN(args[0])) return message.channel.send('> Please supply a valid amount of messages to purge');
			if (args[0] > 100) return message.channel.send('>  Please supply a number less than 100');
	
			message.channel.bulkDelete(args[0])
				.then(messages => message.channel.send(`> ✅ - Done deleted \`${messages.size}/${args[0]}\` messages`).then(msg => msg.delete({
					timeout: 10000
				})))
		}
	});
	
	

	   const developers = ['358966532308729863'];
const admin = "!";
bot.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;
 
  if (message.content.startsWith(admin + 'wt')) {
	bot.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`> ✅ - Done This: , Watching ${argresult}  `)
  } else 
  if (message.content.startsWith(admin + 'ls')) {
	bot.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`> ✅ - Done This: , Listening ${argresult}  `)
  } else 
  if (message.content.startsWith(admin + 'setstream')) {
    bot.user.setGame(argresult, "https://www.twitch.tv/idk");
     message.channel.send(`> ✅ - Done This: , Streaming ${argresult}  `)
  }
  if (message.content.startsWith(admin + 'setname')) {
	bot.user.setUsername(argresult).then
      message.channel.send(`> ✅ - Done This , ${argresult} `)
} else
if (message.content.startsWith(admin + 'setavatar')) {
	bot.user.setAvatar(argresult);
      message.channel.send(`> ✅ - Done This , ${argresult} `)
}
});


bot.on('guildMemberAdd', member => {
	var Canvas = require('canvas') 
	var jimp = require('jimp') 
	var channel = member.guild.channels.find('name', 'log-join');
		if(!channel) return;
	channel.send('> 🔸 - Welcome: ' + `${member}` + ' To ' + `${member.guild.name}` + ' Server , ')          
	
	})


	bot.on('guildMemberAdd', member => {
		var Canvas = require('canvas') 
		var jimp = require('jimp') 
		var channel = member.guild.channels.find('name', 'welcome');
			if(!channel) return;
		channel.send('> 🔸 - Welcome: ' + `${member}` + ' To ' + `${member.guild.name}` + ' Server , ')          
		
		})


	 
	bot.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
		if (command === "banslist") {
			message.delete(5000)
			 if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.reply("> ❌ - i Dont Have Permission").then(message => message.delete(5000));
			if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("> ❌ - You Dont Have Permission").then(message => message.delete(5000));
			if(!message.channel.guild) return;
			message.guild.fetchBans()
			.then(bans => message.channel.send(`> ❌ - BanList Server: ( ${bans.size} )`)).then(message => message.delete(5000))
	
	  .catch(console.error);
	}
	}); 


	bot.on("message", message => {
		if(!message.channel.guild) return;
 if(message.author.bot) return;
	if(message.content === prefix + "avatar server"){ 
		const embed = new Discord.RichEmbed()

	.setTitle(`> 🔸 - Avatar Server ${message.guild.name} ,`)
	.setAuthor(`${message.guild.name} `, message.guild.iconURL)
	.setColor("#e5b4ff")
.setTimestamp()
  .setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')       
  .setImage(message.guild.iconURL)
  .setURL(message.guild.iconrURL)
				  .setTimestamp()

 message.channel.send({embed});
	}
});


bot.on('guildCreate', guild => {
	const embed = new Discord.RichEmbed()
	.setColor("#e5b4ff")
.setTimestamp()
.setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')     
.setURL('https://discordapp.com/api/oauth2/authorize?client_id=605680873190326275&permissions=8&scope=bot')
.setDescription(`
> 🔸 - Join Plus Join Server:
> 🔸 - ServerName: ${guild.name}
> 🔸 - OwnerShip: ${guild.owner} 
> 🔸 - Plus Server: ${bot.guilds.size}
> 🔸 - Member: ${guild.memberCount} `);

bot.channels.get("651995982065565697").sendEmbed(embed)
});

bot.on('guildDelete', guild => {
	const embed = new Discord.RichEmbed()
	.setColor("#e5b4ff")
	.setTimestamp()
	.setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')     
.setURL('https://discordapp.com/api/oauth2/authorize?client_id=605680873190326275&permissions=8&scope=bot')
.setDescription(`
> 🔸 - Akon Plus Leave Server
> 🔸 - ServerName: ${guild.name}
> 🔸 - OwnerShip: ${guild.owner} 
🔸 - Plus Server: ${bot.guilds.size}
> 🔸 - Member: ${guild.memberCount} `);

bot.channels.get("651995962096615424").sendEmbed(embed)
});


		   bot.on("message", async function (message) {
			if (!prefix) {
				var prefix = "!";
			}
			if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
			var args = message.content.slice(prefix.length).split(" ");
			var command = args[0];
			if (command == "infoserver") {
				var { name, owner, id, memberCount, roles, channels, iconURL} = message.guild;
				var invite = await message.channel.createInvite();
				var embed = new Discord.RichEmbed()
				.setColor("#e5b4ff")
	           .setTimestamp()
			   .setAuthor(`${message.guild.name} `, message.guild.iconURL)  
			   .setTitle(`🔸 - info Server:`)  
			   .setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')    
			   .setDescription(`> 🔸 - Name: ${name}\n > 🔸 - OwnerShip: <@${owner.user.id}>\n > 🔸 - ID: , ${id}\n > 🔸 - Member's: ${memberCount}\n > 🔸 - Roles: ${roles.size}\n > 🔸 - Channels: ${channels.size}\n> 🔸 - Link , [Discord](${invite})`)
				.setTimestamp();
				if (iconURL) { //
					embed.setThumbnail(iconURL);
				}
				message.channel.send({
					embed: embed
				});
			}
		});


		bot.on('message',function(message) {
			if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
			   let muteRole =  message.guild.roles.find('name', 'Muted');
			   let muteMember = message.mentions.members.first();
			   let muteReason = messageArray[2];
			   let muteDuration = messageArray[3];
			  if(message.content.startsWith(prefix + "mute")) {
					   
			 if (message.author.bot) return;
				  if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
				  if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send('> ❌ - You Don’t have Permission  ``MANAGE_ROLES`` ');
				  if(!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.channel.send('> ❌ - i Don’t Have Permission ``MANAGE_ROLES`` ');
				  if(!muteMember) return message.channel.send('> ❌ - Please Mention').then(message => message.delete(9000))
				  if(!muteReason) return message.channel.send('> ❌ - Please Agine And Tapy Reason').then(message => message.delete(9000))
				  if(!muteDuration) return message.channel.send('> ❌ - Please Agine And Tapy Time !  \n``Ex: #mute @user reason 1m`` ').then(message => message.delete(9000))
				  if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send('> ❌ - i can’t Muted').then(message => message.delete(9000))
				  message.channel.send(`> ✅ - Done Muted`).then(message => message.delete(9000))
				  muteMember.addRole(muteRole);
				  muteMember.setMute(true)
				  .then(() => { setTimeout(() => {
					  muteMember.removeRole(muteRole)
					  muteMember.setMute(false)
				  }, mmss(muteDuration));
				  });
			  } 
		   });

		   
		   bot.on('message', message => {
			let args = message.content.split(' ').slice(1);
	 if(message.content.split(' ')[0] == prefix + 'color'){
			 const embedd = new Discord.RichEmbed()
	 .setFooter('🔸 - By: '+message.author.username, message.author.avatarURL)
	 .setDescription(`> ❌ - There's No Color With This Number `)
	 .setColor("#e5b4ff")
	 .setTimestamp()
	 .setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')    

	  if(!isNaN(args) && args.length > 0)
	  
  
  if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
  
  
		 var a = message.guild.roles.find("name",`${args}`)
				  if(!a)return;
  const embed = new Discord.RichEmbed()
					  
	   .setFooter('🔸 - By: '+message.author.username, message.author.avatarURL)
	 .setDescription(`> ✅ - Color Changed To Successfully `)
	 .setColor("#e5b4ff")
	 .setTimestamp()
	 .setFooter(`Akon.`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048') 
	message.channel.sendEmbed(embed);
			if (!args)return;
  setInterval(function(){})
					let count = 0;
					let ecount = 0;
		  for(let x = 1; x < 201; x++){
			 
			  message.member.removeRole(message.guild.roles.find("name",`${x}`))
			
			  }
				  message.member.addRole(message.guild.roles.find("name",`${args}`));
		  
			  
	  }
  });   

 
  bot.on('message', async message => {
	let messageArray = message.content.split(' ');
	let args = messageArray.slice(1);
	if(message.content.startsWith(prefix + "shyizer")) {
	  if(!args) return message.reply('**Select an invitation name**');
	  message.guild.fetchInvites().then(i => {
		let inv = i.get(args[0]);
		if(!inv) return message.reply(`**I could not find ${args}**`);
		var iNv = new Discord.RichEmbed()
		.setAuthor(message.author.username,message.author.avatarURL)
		.setThumbnail(message.author.avatarURL)
		.addField('# - The owner of the invitation',inv.inviter,true)
		.addField('# - The invitation Room',inv.channel,true)
		.addField('# - The end date of the invitation',moment(inv.expiresAt).format('YYYY/M/DD:h'),true)
		.addField('# - Invitation created',moment(inv.createdAt).format('YYYY/M/DD:h'),true)
		.addField('# - Duration of the invitation',moment(inv.maxAge).format('DD **hour** h **day**'),true)
		.addField('# - Uses',inv.uses || inv.maxUses,true)
		message.channel.send(iNv);
	  });
	}
  });

	bot.login("NjA1NjgwODczMTkwMzI2Mjc1.XeZi3Q.USpQXYPJbKXYhkN84A0RNo5NB0w");

	//✅ - ❌ - 🔸