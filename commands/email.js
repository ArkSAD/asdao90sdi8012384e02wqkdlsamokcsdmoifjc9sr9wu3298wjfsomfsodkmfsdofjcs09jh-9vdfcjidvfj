const Discord = require('discord.js')
const moment = require('moment')
module.exports.run = async (bot, message, args) => {

        if (message.author.bot) return;
    function randomem() {
    let email = '';
    const ReBeL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._';
    for (let i = 0; i < 5; i++) email += ReBeL.charAt(Math.floor(Math.random() * ReBeL.length));
    return email;
    }
    function randompass() {
    let pass = '';
    const CoDeS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) pass += CoDeS.charAt(Math.floor(Math.random() * CoDeS.length));
    return pass;
    }
    const random1 = randomem();
    const random2 = randompass();
    message.react("📧") 
    message.author.send(`
    Email : ${random1}@gmail.com
    Password : ${random2}
    `).catch(err => {
       if(err == "DiscordAPIError: Cannot send messages to this user") {
          return message.channel.send("Your Dm Closed !");
    }
    })
}