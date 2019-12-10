const Discord = require('discord.js');

exports.run = (bot, message, args) => {
	let user = {};
	if(message.mentions.users.first()) user = message.mentions.users.first();
	else if(args && system.getUser(message, args)) user = system.getUser(message, args).user;
	else user = message.author;

	message.channel.send({
		embed: {
			description: `Avatar of **${user.username}#${user.discriminator}**\nIf the image is not displayed, [click here](${user.avatarURL})`,
			image: { url: user.avatarURL },
			color: 0xFFFFFF
		}
	});
};