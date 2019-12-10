const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (client, message, args) => {


    if (message.author.bot) return;
    if (!message.channel.guild) return;
    client.channels.get("652518207193743372").send(
        "\n" + "**" + " ● Suggested By : " + "**" +
        "\n" + "**" + "» " + message.author.tag + "**" +
        "\n" + "**" + " ● Suggest : " + "**" +
        "\n" + "**" + args + "**")
    
    let embed = new Discord.RichEmbed()
         .setAuthor(message.author.username, message.author.avatarURL)
         .setDescription(' Suggested Sent')
         .setThumbnail(message.author.avatarURL)
         .setFooter("Adidas")
    message.channel.send(embed);
}
z