const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {

   
    let sicon = message.guild.iconURL;
    const embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor(settings.embedColor)
        .addField('Owner', `${message.guild.owner.user.tag} (${message.guild.owner.id})`, true)
        .addField(
          'Member Count',
          `${message.guild.memberCount} (${message.guild.members.filter(m => m.presence.status === 'dnd' || m.presence.status === 'idle' || m.presence.status === 'online').size} online)`,
          true
        )
        .addField('Location', message.guild.region, true)
        .addField('Created', message.guild.createdAt.toLocaleString(), true)
        .addField('Roles', message.guild.roles.size, true)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon)
        return message.channel.send(embed);
    }
