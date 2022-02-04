const Discord = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'clearmeber',
    aliases : '[mclear]',
    description: 'clear the members msg lamo :V',
    run: async (client, message, args) => {
        setTimeout(() => message.delete(), 3500);

        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {

            let purgeMember = message.mentions.users.first()
            let amount = args[1]
            if (!purgeMember) return message.channel.send("Please Mention a Member to purge").then(msg => { setTimeout(() => msg.delete(), 4000) })
            if (!amount) return message.channel.send("Please provide a valid number to purge").then(msg => { setTimeout(() => msg.delete(), 4000) })
            if (isNaN(amount)) return message.channel.send("Please provide a valid number to purge").then(msg => { setTimeout(() => msg.delete(), 4000) })
            if (amount > 99) return message.channel.send("I can delete upto 100 messages only").then(msg => { setTimeout(() => msg.delete(), 4000) })

            let AllMessages = await message.channel.messages.fetch()
            let FilteredMessages = await AllMessages.filter(x => x.author.id === purgeMember.id)
            let deletedMessages = 0
            FilteredMessages.forEach(msg => {
                if (deletedMessages >= amount) return
                msg.delete()
                deletedMessages++
            })

        } else {
            message.channel.send('🛡️ | You DONT have permission to use this command!').then(msg => { setTimeout(() => msg.delete(), 5000) })
        }

    },
}