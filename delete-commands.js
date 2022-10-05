// to run: node delete-commands.js
// only need to run the delete-commands.js once to delete a command
// after that, you can comment out the code below and run index.js to run the bot

// const { REST, SlashCommandBuilder, Routes } = require('discord.js');
// const { clientId, guildId, token } = require('./config.json');
// const rest = new REST({ version: '10' }).setToken(token);

// delete single commands
// get command id = Server Settings -> Integrations -> Bots and Apps -> Command Name -> Copy ID
// put in commandId

// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);


// delete all commands
// for guild-based commands

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);
