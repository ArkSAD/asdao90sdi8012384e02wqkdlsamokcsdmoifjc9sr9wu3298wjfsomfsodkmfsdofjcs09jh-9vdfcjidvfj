const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


    if(message.content.includes('discord.gg/')) {
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        message.delete();
        message.guild.member(message.author).addRole(message.guild.roles.find(r => r.name === 'Muted'));
        message.delete(5000);
        let embedP = new Discord.RichEmbed()
        .setTitle('❌ - You have been punished        ')
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`I've been punished Because of Link Server Discord `)
        .setColor("#e5b4ff")
        .setTimestamp()
        .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')     
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${message.guild.name} Server`, message.guild.iconURL)
        
        message.channel.send(embedP);
    }
};