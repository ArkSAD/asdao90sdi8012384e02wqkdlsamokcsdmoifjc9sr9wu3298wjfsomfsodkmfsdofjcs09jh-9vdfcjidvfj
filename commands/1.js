const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {


    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL)
        .setDescription(message.guild.channels.map(c => `\`${i++}\` - **${c.name}**`))
        .setFooter(message.guild.channels.size + ' Channels in the server!');
        message.channel.send(embed).then(msg => {
            msg.delete(25000);
            message.delete(25000);
        });
    } 