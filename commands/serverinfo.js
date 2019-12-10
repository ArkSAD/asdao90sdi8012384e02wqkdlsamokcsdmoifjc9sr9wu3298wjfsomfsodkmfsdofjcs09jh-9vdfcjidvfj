const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


    const embed = new Discord.RichEmbed()
            .setColor("#e5b4ff")
            .setAuthor(`${message.guild.name} `, message.guild.iconURL)
            .setTitle('Server Info')
			.setThumbnail(message.guild.iconURL)
			.addField('Name :', message.guild.name, true)
			.addField('ID :', message.guild.id, true)
			.addField('Region :', message.guild.region.toUpperCase(), true)
			.addField('Creation Date :', message.guild.createdAt.toDateString(), true)
			.addField('OwnerShip :', message.guild.owner, true)
			.addField('Members :', message.guild.memberCount, true)
			.addField('Roles :', message.guild.roles.map(role => role.toString()).join(' **,** '), true)
            .addField('Categories :', message.guild.channels.filter(channel => channel.type === 'category').map(category => category.toString()).join(' **,** '), true)
            .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
            .setTimestamp()
            .addField('Channels :', message.guild.channels.filter(channel => channel.type !== 'category').map(channel => channel.toString()).join(' **,** '), true);
        
        return message.channel.send(embed);
    }