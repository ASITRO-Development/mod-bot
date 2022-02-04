module.exports = {
    config: {
        name: "clear",
        aliases: ["c", "purge"],
        description: "",

    },

    run: async (bot, message, args) => {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]")

      let amount = args[0];

      if(!amount){
        return message.channel.send('Please Provide me an amount to delete messages 2 - 100')
      }

      if(isNaN(amount)){
        return message.channel.send('Please Provide me valid Amount')
      }
      
      if(amount >= 1000){
        return message.channel.send('I cant delete msg than 100 Msg :D')
      }
      message.channel.messages.channel.bulkDelete(amount)
      message.channel.send(`\'${amount}\ Messages Deleted **lamo**`)
      },
    };