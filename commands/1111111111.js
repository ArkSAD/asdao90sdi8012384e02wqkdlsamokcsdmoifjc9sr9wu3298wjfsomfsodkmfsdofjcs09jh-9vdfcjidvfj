const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {


const embed = new Discord.RichEmbed();
embed.setAuthor(message.author.username, message.author.avatarURL) 
embed.addField("Name Account :", `${message.author.username}#${message.author.discriminator}`, true)
embed.addField("Status :", `${message.author.presence.status.toUpperCase()}`, true)     
embed.addField("Playing :", `${message.author.presence.game === null ? "No Game" : message.author.presence.game.name}`, true)     
embed.addField("inviter :", `${message.author.inviteCount}`, true)
.setColor("#e5b4ff")
        .setFooter(message.author.username , message.author.avatarURL)
        .setThumbnail(`${message.author.avatarURL}`)
        .setTimestamp()
        .setURL(`${message.author.avatarURL}`)
        embed.addField('Join Server :', `${moment(message.author.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(message.author.joinedAt).fromNow()}\``, true)  
        embed.addField('Join Discord :', `${moment(message.author.createdAt).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(message.author.createdAt).fromNow()}\`` ,true) 
        embed.addField("ID :", `${message.author.id}`, true)
        embed.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')                                       
        message.channel.send({embed: embed})
}

