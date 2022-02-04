const { readdirSync } = require("fs"),
ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("slash", "Load status");

module.exports = (client) => {
        readdirSync("./slash").forEach(dir => {
            const commands = readdirSync(`./slash/${dir}/`).filter(file => file.endsWith(".js"));
    
            for (let file of commands) {
                let pull = require(`../slash/${dir}/${file}`);

                client.slash.set(pull.data.name, pull);
                table.addRow(file, '✅');
            
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        });
        // Log the table
        console.log(table.toString());
}