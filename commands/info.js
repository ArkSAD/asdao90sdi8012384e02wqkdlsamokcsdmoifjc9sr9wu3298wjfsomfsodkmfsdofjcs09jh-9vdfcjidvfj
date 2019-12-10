const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setAuthor(`${message.guild.name} `, message.guild.iconURL)
            .setColor("#e5b4ff")
            .setTitle('AkonPlus')
            .addField('> Ram:', `( ${Date.now() - message.createdTimestamp} MS . )`, true)
            .addField('> Ram:', `( ${(process.memoryUsage().rss / 1048576).toFixed()} MB . )`, true)
            .addField('> Server:' , `( ${client.guilds.size} )` , true)
            .addField('> Channels:' , `( ${client.channels.size} )` , true)
            .addField('> User:' ,`( ${client.users.size} )` , true)
            .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
            .setTimestamp()    
        })
}
