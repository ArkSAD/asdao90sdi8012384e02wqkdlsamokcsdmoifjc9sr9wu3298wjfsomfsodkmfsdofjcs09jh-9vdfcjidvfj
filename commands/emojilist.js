const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {


        const List = message.guild.emojis.map(e => e.toString()).join(" ");

        const EmojiList = new Discord.RichEmbed()
            .setTitle('> List :') 
            .setAuthor(message.guild.name, message.guild.iconURL) 
            .setColor("#e5b4ff")
            .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
            .setTimestamp()
            .setDescription(List) 
        message.channel.send(EmojiList) 
    }
