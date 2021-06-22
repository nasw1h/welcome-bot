const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");
const { registerFont, createCanvas } = require('canvas')
registerFont('./RobotoCondensed-Bold.ttf', { family: 'Roboto' })

module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
    //log that the module is loaded
    console.log(` :: Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    //fires every time when someone joins the server
    client.on("guildMemberAdd", async member => {
      //If not in a guild return
      if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`./welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the text strings 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 620, canvas.height / 2 + 10);
      }      
      else {
        ctx.font = 'bold 130px "Roboto"';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 620, canvas.height / 2 + 15);
      }

      var textString4 = `Welcome to TECHSIAS`;
      ctx.font = 'bold 60px "Roboto"';
      ctx.fillStyle = '#bb86fc';
      ctx.fillText(textString4, 560, canvas.height / 2 - 150);
      
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 60px "Roboto"';
      ctx.fillStyle = '#bb86fc';
      ctx.fillText(textString4, 650, canvas.height / 2 + 145);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("#4dff7a")
        .setTitle(`**Welcome to TECHSIAS**`)
        .setDescription(`Hi <@${member.id}>!\nCheck your inbox!`)
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
      //send the welcome embed to there
      channel.send(welcomeembed);
    })
}
