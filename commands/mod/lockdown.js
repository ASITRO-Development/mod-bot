const Discord = require('discord.js')

module.exports = {
    config: {
        name: "lockdown",
        description: "lock server use it on your risk lamo",
        aliases: ["ls"]
    },
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_SERVER") ) return message.channel.send("**You Dont Have The Permissions To Manage Server! - [MANAGE_SERVER]**");

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })  
              message.channel.send(`**\n\nDone! Server Fully Locked! 🔒**`)

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
             message.channel.send(`**\n\nDone! Server Fully Unlocked! 🔓**`)

        }
    }
}