const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "[name | tag | mention | ID] <reason> (optional)",
        aliases: ["ub", "unbanish"],
    },
    run: async (bot, message, args) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("**You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]**")

        if (!args[0]) return message.channel.send("**Please Enter A Name!**")
      
        let bannedMemberInfo = await message.guild.bans.fetch()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**")

        let reason = args.slice(1).join(" ")

        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
              
                    message.channel.send(`**${bannedMember.user.tag} has been unbanned for ${reason}**`)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                message.channel.send(`**${bannedMember.user.tag} has been unbanned**`)
           
            }
        } catch {
            
        }

    }
}