const Discord = require('discord.js');

exports.run = (client, message, args) =>{
    function checkBots(guild) {
        let botCount = 0;
        guild.members.forEach(member => {
            if(member.user.bot) botCount++;
        });
        return botCount;
    }
    
    function checkMembers(guild) {
        let memberCount = 0;
        guild.members.forEach(member => {
            if(!member.user.bot) memberCount++;
        });
        return memberCount;
    }

    function checkOnlineUsers(guild) {
        let onlineCount = 0;
        guild.members.forEach(member => {
            if(member.user.presence.status === "online")
                onlineCount++; 
        });
        return onlineCount;
    }

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} `, message.guild.iconURL)
        .setColor("#e5b4ff")
        .addField('> 🔸 Owner:', message.guild.owner, true)
        .addField('> 🔸 Region:', message.guild.region, true)
        .addField('> 🔸 AFK:', `${message.guild.afkChannel || 'None'}`, true)
        .setThumbnail(sicon)
        .addField('> 🔸 Members: ', message.guild.memberCount, true)
        .addField('> 🔸 ID:', message.guild.id, true)
        .addField('> 🔸 Bots:', checkBots(message.guild), true)
        .addField('> 🔸 Channels:', `Text : ( ${message.guild.channels.filter(a => a.type === 'text').size} ) \n   Voice : ( ${message.guild.channels.filter(a => a.type === 'voice').size} ) `, true)
        .addField('> 🔸 Other:', `Roles ( ${message.guild.roles.size}) \n Emojis ( ${message.guild.emojis.size} )  ${message.guild.emojis.map(m => m).join('  ')}   `,true)
        .addField('> 🔸 Created:', message.guild.createdAt.toDateString(), true)
        .setFooter('Guild created at:')
        .setTimestamp()
        .setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
        .setTimestamp(message.guild.createdAt);

    return message.channel.send(serverembed);
}
