const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {


                             if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
  
                }).then(() => {
                    message.reply("** Done Close :white_check_mark: **");
                })
            };
        