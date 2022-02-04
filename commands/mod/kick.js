const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const {ownerID} = require("../../settings.json")

module.exports = {
    config: {
        name: "kick",
        aliases: ["k", "kick"],
        description: "kick the user",
        usage: "[name | nickname | mention | ID] <reason> (optional)",
    },
    run: async (bot, message, args) => {
        try {
            if (!message.member.permissions.has("KICK_MEMBERS") && (message.author.id)) return message.channel.send("**You Dont Have The Permissions To Ban Users! - [KICK_MEMBERS]**");
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("**I Dont Have The Permissions To Ban Users! - [KICK_MEMBERS]**");
            if (!args[0]) return message.channel.send("**Please Provide A User To kick!**")

            let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**User Is Not In The Guild**");
            if (kickMember === message.member) return message.channel.send("**You Cannot kick Yourself**")

            var reason = args.slice(1).join(" ");

            if (!kickMember.kickable) return message.channel.send("__**Cant Kick That User lamo**__")
            try {
            message.guild.members.kick(kickMember)
            kickMember.send(`**Hello, You Have Been kicked From ${message.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
            } catch {
                message.guild.members.kick(kickMember)
            }
            if (reason) {
            message.channel.send(`**${kickMember.user.username}** has been kicked for ${reason} lamo`)
            } else {
                message.channel.send(`**${kickMember.user.username}** has been kicked lamo`)
            }
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};