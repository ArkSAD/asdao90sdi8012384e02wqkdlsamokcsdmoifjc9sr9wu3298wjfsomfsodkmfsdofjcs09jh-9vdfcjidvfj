const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {


        message.delete(5000)
         if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.reply("Error : \` I Dont Have ADMINISTRATOR Permission\`").then(message => message.delete(5000));
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!message.channel.guild) return;
        message.guild.fetchBans()
        .then(bans => message.channel.send(`\`${bans.size}\` ***: The number of people banned from the server ***`)).then(message => message.delete(5000))

  .catch(console.error);
}

