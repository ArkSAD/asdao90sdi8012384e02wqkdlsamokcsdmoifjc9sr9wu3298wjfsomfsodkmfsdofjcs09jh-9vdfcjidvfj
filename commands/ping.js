const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


    if(!message.channel.guild) return;
    var msg = `${Date.now() - message.createdTimestamp}`
    var api = `${Math.round(client.ping)}`
    if (message.author.bot) return;
    let embed = new Discord.RichEmbed()
.setAuthor(message.author.username,message.author.avatarURL)
.setColor("#e5b4ff")
.addField('> - Time Taken:',msg + " ms ")
.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
.setTimestamp()
.addField('> - WebSocket:',api + " ms   ")
message.channel.send({embed:embed});
}


      
          
                