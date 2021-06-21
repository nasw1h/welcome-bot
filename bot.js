const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const timers = require('timers')

const welcome = require("./welcome")
welcome(client)

let activities = [
  {
    name:`${"for new users!"}`,
    options:{
      type:`${"WATCHING"}`
    }
  },
  {
    name:`${"version 1.0"}`,
    options:{
      type:`${"PLAYING"}`
    }
  }
]
let i = 0;


client.on('ready', () => {
  console.log(`${client.user.tag} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  
  timers.setInterval(() => {
    i = i == activities.length ? 0 : i
    client.user.setActivity(activities[i].name, activities[i].options)
    i++
  }, 5000)
})

client.login(config.TOKEN)
