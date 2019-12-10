const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {

    if(!message.channel.guild) return message.reply(`> ❌ - Error This Commands Just Server`);
    message.guild.fetchInvites().then(invs => {
    let member = client.guilds.get(message.guild.id).members.get(message.author.id);
    let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
    let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
    var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
var heg;
if(men) {
   heg = men
} else {
   heg = message.author
}
var mentionned = message.mentions.members.first();
var h;
if(mentionned) {
   h = mentionned
} else {
   h = message.member
}
      moment.locale('usa');
    var id = new  Discord.RichEmbed()
     
    .setColor("#e5b4ff")
    .setAuthor(message.author.username, message.author.avatarURL) 
    .addField('> 🔸 - Create Account:', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
.addField('> 🔸 - Join Discord:', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
.setFooter(`Akon`, 'https://cdn.discordapp.com/avatars/605680873190326275/bb00e7ee09d96bad45c0da7fd5ae3a72.png?size=2048')      
.addField('> 🔸 - invite:', inviteCount,false)
.setTimestamp()   
  message.channel.sendEmbed(id);
})
}
