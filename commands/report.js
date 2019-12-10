const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


			let messageArgs = message.content.split(" ").slice(1).join(" ");
			let messageReason = message.content.split(" ").slice(2).join(" ");
			if(!messageReason) return message.reply("**# Specify a reason!**");
		let mUser = message.mentions.users.first();
		if(!mUser) return message.channel.send("Couldn't find user.");
		let Rembed = new Discord.RichEmbed()
		.setTitle("PanelReport <:updates:642712699574157352> ")
		.setThumbnail(message.author.avatarURL)
		.addField("\`\#\`\ <:ShyizerPartner13:644331503878144030> - Reported User:",mUser,true)
		.addField("\`\#\`\ <:ShyizerPartner4:644331280141385745> - Reported User ID:",mUser.id,true)
		.addField("\`\#\`\ <:615995795061211272:644334940657418251> - Reason:",messageReason,true)
		.addField("\`\#\`\ <:ShyizerPartner12:644331472584704030> - Channel:",message.channel,true)
		.addField("\`\#\`\ <:offline:642887424187432963> - Time:",message.createdAt,true)
		.setFooter("Will Show Report OwnerServer just wait !")
	message.channel.send(Rembed)
	message.channel.send("Are you sure you ").then(msg => {
		msg.react("✅")
		msg.react("❌")
	.then(() => msg.react('❌'))
	.then(() =>msg.react('✅'))
	let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
	let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
	
	let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
	let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
	reaction1.on("collect", r => {
		message.guild.owner.send(Rembed)
		message.reply(" ✅ | Done!");
	})
	reaction2.on("collect", r => {
		message.reply("**❌ | Error**");
	})
	})
	}
