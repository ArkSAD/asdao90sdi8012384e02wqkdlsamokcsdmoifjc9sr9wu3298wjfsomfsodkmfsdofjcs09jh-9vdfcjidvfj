const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {
    message.delete(5000)

const embed1 = new Discord.RichEmbed() .setColor("#36393e").setDescription(`
** This command only for servers**`);
    if(!message.channel.guild) return message.reply(embed1);

const embed2 = new Discord.RichEmbed() .setColor("#36393e").setDescription(`
** You Don.t Have Permission**`);

const embed3 = new Discord.RichEmbed() .setColor("#36393e").setDescription(`
**Done Open :white_check_mark:**`);
    if(!message.channel.guild) return message.reply(embed2);
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(embed2);
message.channel.overwritePermissions(message.guild.id, {
SEND_MESSAGES: true

}).then(() => {
    message.reply(embed3);
})
}