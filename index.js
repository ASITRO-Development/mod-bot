console.log(`
#        ##   #    #  ####  
#       #  #  ##  ## #    # 
#      #    # # ## # #    # 
#      ###### #    # #    # 
#      #    # #    # #    # 
###### #    # #    #  ####  
`)
const { Client, Intents, Collection } = require("discord.js"),
{ token, prefix, color, ownerId } = require("./settings.json"),
client = new Client( { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES ] })

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId }

for(let handler of  ["slash_command", "prefix_command", "event"]) require(`./handlers/${handler}`)(client);
const keepalive = require("./lamo.js")


const asitroStatus = [
    `Made By Asitro Development `,
    `lamo Bot`,
    `${prefix}help`,
    `${client.users.cache.size} users`
]

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`)
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: asitroStatus[Math.floor(Math.random() * asitroStatus.length)] }], status: 'idle', type: "WATCHING" })
    }, 5000)
})

client.on('message', async message => {

    try {
        if (message.mentions.has(client.user.id) && !message.content.includes("@everyone") && !message.content.includes("@here")) {
          message.channel.send(`\nMy prefix for \`${message.guild.name}\` is \`${prefix}\` Type \`${prefix}help\` for help`);
          }
          
    } catch {
        return;
    };

});


console.log(`
#        ##   #    #  ####  
#       #  #  ##  ## #    # 
#      #    # # ## # #    # 
#      ###### #    # #    # 
#      #    # #    # #    # 
###### #    # #    #  ####  
`)

keepalive();
client.login(token)
