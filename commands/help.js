const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, message, args) => {

    const prefix = "!";
    message.react("648172677214765079") 



    let info1 = [`


 **  ${client.user.username} 

im AkonBot 
This is Easy And Simple
Easy To Making Akon
If You Have Problem Join Server Support 

Dev Team : <:AkonStaff:648172677214765079>
> <@358966532308729863>
> <@622710271705743361>
**

   `]


    let arbic = [`
   
    Help u <:inviter:652595304062910474>

 __Commands Members__ <:User:652594595623993375>

${prefix}ping - معرفة اتصالك
${prefix}invites - دعواتك
${prefix}server - معلومات السيرفر
${prefix}id - معلومات الحساب
${prefix}user - معلومات حسابك بشكل كامل
${prefix}avatar - اخذ صورة شخص
${prefix}serverinfo - معلومات كامله للسيرفر
${prefix}server - لمعرفة معلومات السيرفر
${prefix}invitetop - لمعرفة عدد الدعوات
${prefix}time - لمعرفة الوقت
${prefix}channels - الرومات كاملة
${prefix}setvoice - عدد الإعضاء فويس

__Commands Staff__ <:AkonStaff:648172677214765079>
${prefix}mute - ميوت كتابي
${prefix}unmute - فك الميوت
${prefix}ban - باند
${prefix}unban - فك الباند
${prefix}warn - تحذير
${prefix}clear - حذف الشات
${prefix}openroom - فتح الروم
${prefix}colseroom - اغلاق الروم
${prefix}setwelcome - تثبيت غرفة الدخول
${prefix}banslist - عدد الباندات

> سهلة استخدام 
> Click here <:AkonUsa:652618439109771325> to go to English 
  
   `]

let english = `
 Help u  <:inviter:652595304062910474> 

__Commands Members__ <:User:652594595623993375>

${prefix}ping - ShowYourPing
${prefix}invites - yourinviter
${prefix}server - info server
${prefix}serverinfo -  information  server
${prefix}user - your user id
${prefix}avatar - take gif
${prefix}time - show time
${prefix}invitetop - link invite member
${prefix}channels - show all channels
${prefix}id - informations account
${prefix}setvoice - Join Member Voice

__Commands Staff__ <:AkonStaff:648172677214765079>
${prefix}mute - mute chat
${prefix}unmute - unmute
${prefix}ban - ban
${prefix}unban - unban
${prefix}clear - clear chat
${prefix}warn - warn
${prefix}openroom - opeenroom
${prefix}colseroom - clsoedroom
${prefix}setwelcome - install room welcome
${prefix}banslist - show listban

> It's Simple And Easy 
> Click here  to go <:AkonKsa:652618426937901066> to Arabic `

let info = `**● Hi -
In order to show the help menu in your language click on the Battom Red
( <:AkonUsa:652618439109771325> )

● أهلا -
من اجل فتح رومات المساعدة قم بالظغط على الإيموجي الاخضر
( <:AkonKsa:652618426937901066> )** 


**● Community Discord <:AkonPartner:652619788736266250>**
**● About Dev Team - ( <:staff:652618407518142464> )
            ** `    
let page = 1;

 message.author.send(`**Commands AkonBot**`).catch(err => {
  return message.reply("**We can't send you commands because your dm is closed, <a:wt:618171734830350343>**");})


    let embed = new Discord.RichEmbed()
		.setColor("#e5b4ff")
    .setFooter(``)
    .setDescription(`${info}`)
  .addField(`Support Server `, `[Click here!](https://discord.gg/BRUTzpd)`)

    message.author.sendEmbed(embed).then(msg => {

        msg.react('652618407518142464').then( r => {
        msg.react('652618426937901066') 
        msg.react('652618439109771325')

        const info2 = (reaction, user) => reaction.emoji.name === 'staff' && user.id === message.author.id;

        const backwardsFilter = (reaction, user) => reaction.emoji.name === 'AkonUsa' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === 'AkonKsa' && user.id === message.author.id;


        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});
        const info55 = msg.createReactionCollector(info2, { time: 2000000});



        backwards.on('collect', r => {

            //if (page === 1) return;
            //page--;
           embed.setDescription(`${english}`);

   
           // embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
           // if (page === pages.length) return;
          //  page++;
            embed.setDescription(`${arbic}`);
   
           // embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })

      info55.on('collect', r => {
           // if (page === pages.length) return;
          //  page++;

            embed.setDescription(`${info1}`);

  
           // embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
