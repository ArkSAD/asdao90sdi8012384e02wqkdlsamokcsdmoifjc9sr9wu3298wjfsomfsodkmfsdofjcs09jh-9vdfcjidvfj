const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        const user = message.author;

        const roles = member.roles.map(role => role.toString());
        const color = member.roles.find(role => role.name.charAt(0) === '#');
        const embed = new Discord.RichEmbed()
         .setAuthor(message.author.username, message.author.avatarURL)
            .setColor("#e5b4ff")
            .addField('Username', user.username, true)
            .addField('Nickname', member.username, true)
            .addField('ID', user.id, true)
            .addField('Account Created', user.createdAt.toDateString(), true)
            .addField('Joined Server', member.joinedAt.toDateString(), true)
            .addField('Roles', roles.join(' **-** '), true)
            .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
            .setTimestamp()
            .setFooter('User Info', user.displayAvatarURL);

        message.channel.send(embed);
    }
